const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

const router = express.Router();

// Connect to SQLite database
const dbPath = path.join(__dirname, "../../database/database.sqlite");
const db = new sqlite3.Database(dbPath);

// 📌 Send Emails in Batches Using Multiple Senders
router.post("/", (req, res) => {
    const { campaign_id } = req.body;
    if (!campaign_id) {
        return res.status(400).json({ error: "Campaign ID is required." });
    }

    // Get campaign details
    db.get("SELECT * FROM campaigns WHERE id = ?", [campaign_id], (err, campaign) => {
        if (err || !campaign) {
            return res.status(500).json({ error: "Campaign not found or database error." });
        }

        // Get contacts for the campaign
        db.all("SELECT * FROM contacts LIMIT ?", [campaign.batch_size], (err, contacts) => {
            if (err || contacts.length === 0) {
                return res.status(500).json({ error: "No contacts found or database error." });
            }

            // Get available sender accounts
            db.all("SELECT * FROM senders", [], async (err, senders) => {
                if (err || senders.length === 0) {
                    return res.status(500).json({ error: "No sender accounts found. Please add at least one sender." });
                }

                let sentCount = 0;
                let senderIndex = 0;

                // Get email template
                db.get("SELECT * FROM templates WHERE id = ?", [campaign.template_id], async (err, template) => {
                    if (err || !template) {
                        return res.status(500).json({ error: "Template not found or database error." });
                    }

                    // Loop through contacts and assign different senders
                    for (const contact of contacts) {
                        const sender = senders[senderIndex];

                        // Decrypt the stored sender password
                        const isPasswordMatch = await bcrypt.compare("placeholder", sender.password);
                        const senderPassword = isPasswordMatch ? "your_decrypted_password" : sender.password;

                        // Configure the email transporter
                        const transporter = nodemailer.createTransport({
                            service: sender.service,
                            auth: {
                                user: sender.email,
                                pass: senderPassword
                            }
                        });

                        // Replace template variables
                        const emailBody = template.body.replace("{{name}}", contact.name)
                            .replace("{{property_address}}", contact.property_address);

                        const mailOptions = {
                            from: sender.email,
                            to: contact.email,
                            subject: template.subject,
                            text: emailBody
                        };

                        // Send email
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.error(`❌ Failed to send email to ${contact.email}:`, error.message);
                            } else {
                                console.log(`✅ Email sent to ${contact.email}:`, info.response);
                                sentCount++;
                            }

                            // Mark campaign as "Completed" when all emails are sent
                            if (sentCount === contacts.length) {
                                db.run("UPDATE campaigns SET status = 'Completed' WHERE id = ?", [campaign_id]);
                            }
                        });

                        // Cycle through senders
                        senderIndex = (senderIndex + 1) % senders.length;
                    }

                    res.json({ message: `Sending ${contacts.length} emails in batches...` });
                });
            });
        });
    });
});

module.exports = router;
