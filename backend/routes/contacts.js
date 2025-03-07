const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const router = express.Router();

// Connect to SQLite database
const dbPath = path.join(__dirname, "../../database/database.sqlite");
const db = new sqlite3.Database(dbPath);

// 📌 POST - Add a new contact in a batch
router.post("/batch", (req, res) => {
    const { contacts } = req.body;

    if (!contacts || contacts.length === 0) {
        console.log("Error: No contacts provided");
        return res.status(400).json({ error: "No contacts provided." });
    }

    // Prepare the query to insert each contact one by one
    const query = `
        INSERT INTO contacts 
        (associated_property_address_full, first_name, last_name, middle_initial, generational_suffix, contact_flags, gender, email_address_1, email_address_2, email_address_3) 
        VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Log the contacts for debugging
    console.log("Contacts to insert:", contacts);

    // Start the transaction to batch insert contacts
    db.serialize(() => {
        // Start transaction
        db.run("BEGIN TRANSACTION");

        const stmt = db.prepare(query);
        let insertedCount = 0; // Counter to track successfully inserted contacts
        let promises = [];

        // Loop through each contact
        contacts.forEach(contact => {
            const values = [
                contact.associated_property_address_full,
                contact.first_name,
                contact.last_name,
                contact.middle_initial,
                contact.generational_suffix,
                contact.contact_flags,
                contact.gender,
                contact.email_address_1,
                contact.email_address_2,
                contact.email_address_3
            ];

            // Create a new promise for each contact insert
            let promise = new Promise((resolve, reject) => {
                // Check if the email_address_1 already exists in the database
                db.get("SELECT * FROM contacts WHERE email_address_1 = ?", [contact.email_address_1], (err, row) => {
                    if (err) {
                        reject(`Error checking for duplicate email: ${err.message}`);
                    } else if (row) {
                        // If a duplicate email is found, skip the contact
                        console.log(`Duplicate email found: ${contact.email_address_1}. Skipping this contact.`);
                        resolve(); // Resolve the promise without inserting the contact
                    } else {
                        // If no duplicate, insert the contact into the database
                        stmt.run(values, (err) => {
                            if (err) {
                                reject(`Error inserting contact with email ${contact.email_address_1}: ${err.message}`);
                            } else {
                                insertedCount++;
                                resolve(); // Resolve the promise after inserting the contact
                            }
                        });
                        console.log(`Contact with email ${contact.email_address_1} inserted.`);
                    }
                });
            });

            // Push each promise into the array
            promises.push(promise);
        });

        // After all insertions are processed, finalize the statement and commit the transaction
        Promise.all(promises)
            .then(() => {
                // Finalize the prepared statement
                stmt.finalize((err) => {
                    if (err) {
                        console.error("Error finalizing the statement:", err.message);
                        return res.status(500).json({ error: err.message });
                    }

                    // Commit the transaction after all contacts are processed
                    db.run("COMMIT", (err) => {
                        if (err) {
                            console.error("Error committing transaction:", err.message);
                            return res.status(500).json({ error: err.message });
                        }

                        console.log(`Successfully processed ${insertedCount} contacts.`);
                        res.json({ message: `${insertedCount} contacts added successfully.` });
                    });
                });
            })
            .catch((error) => {
                // If there is any error in the promise chain, roll back the transaction
                console.error("Error in inserting contacts:", error);
                db.run("ROLLBACK");
                res.status(500).json({ error: "Error in inserting contacts: " + error });
            });
    });
});

module.exports = router;
