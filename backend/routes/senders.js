const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const path = require("path");

const router = express.Router();
const dbPath = path.join(__dirname, "../../database/database.sqlite");
const db = new sqlite3.Database(dbPath);

// 📌 GET all senders
router.get("/", (req, res) => {
    db.all("SELECT id, email, service, created_at FROM senders", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows); // Do NOT return passwords!
    });
});

// 📌 POST - Add a new sender (Encrypts Password)
router.post("/", async (req, res) => {
    const { email, password, service } = req.body;
    if (!email || !password || !service) {
        return res.status(400).json({ error: "Email, password, and service are required." });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO senders (email, password, service) VALUES (?, ?, ?)`;
    const values = [email, hashedPassword, service];

    db.run(query, values, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, email, service, message: "Sender added successfully!" });
    });
});

// 📌 DELETE - Remove a sender
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM senders WHERE id = ?", id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Sender deleted successfully." });
    });
});

module.exports = router;
