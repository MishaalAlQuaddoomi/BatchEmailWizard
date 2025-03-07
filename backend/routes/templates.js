const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const router = express.Router();

// Connect to SQLite database
const dbPath = path.join(__dirname, "../../database/database.sqlite");
const db = new sqlite3.Database(dbPath);

// 📌 GET all email templates
router.get("/", (req, res) => {
    db.all("SELECT * FROM templates", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// 📌 POST - Add a new email template
router.post("/", (req, res) => {
    const { name, subject, body } = req.body;
    if (!name || !subject || !body) {
        return res.status(400).json({ error: "Name, subject, and body are required." });
    }

    const query = `INSERT INTO templates (name, subject, body) VALUES (?, ?, ?)`;
    const values = [name, subject, body];

    db.run(query, values, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, name, subject, body });
    });
});

// 📌 PUT - Update an email template
router.put("/:id", (req, res) => {
    const { name, subject, body } = req.body;
    const { id } = req.params;

    const query = `UPDATE templates SET name = ?, subject = ?, body = ? WHERE id = ?`;
    const values = [name, subject, body, id];

    db.run(query, values, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Template updated successfully." });
    });
});

// 📌 DELETE - Remove an email template
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM templates WHERE id = ?", id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Template deleted successfully." });
    });
});

module.exports = router;
