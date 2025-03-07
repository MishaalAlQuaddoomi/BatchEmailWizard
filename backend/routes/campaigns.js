const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const router = express.Router();

// Connect to SQLite database
const dbPath = path.join(__dirname, "../../database/database.sqlite");
const db = new sqlite3.Database(dbPath);

// 📌 GET all campaigns
router.get("/", (req, res) => {
    db.all("SELECT * FROM campaigns", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// 📌 POST - Create a new campaign
router.post("/", (req, res) => {
    const { name, template_id, sender_email, batch_size } = req.body;
    if (!name || !template_id || !sender_email) {
        return res.status(400).json({ error: "Name, template_id, and sender_email are required." });
    }

    const query = `INSERT INTO campaigns (name, template_id, sender_email, batch_size, status) VALUES (?, ?, ?, ?, 'Pending')`;
    const values = [name, template_id, sender_email, batch_size || 10];

    db.run(query, values, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, name, template_id, sender_email, batch_size: batch_size || 10, status: "Pending" });
    });
});

// 📌 PUT - Update a campaign
router.put("/:id", (req, res) => {
    const { name, template_id, sender_email, batch_size, status } = req.body;
    const { id } = req.params;

    const query = `UPDATE campaigns SET name = ?, template_id = ?, sender_email = ?, batch_size = ?, status = ? WHERE id = ?`;
    const values = [name, template_id, sender_email, batch_size, status, id];

    db.run(query, values, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Campaign updated successfully." });
    });
});

// 📌 DELETE - Remove a campaign
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM campaigns WHERE id = ?", id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Campaign deleted successfully." });
    });
});

module.exports = router;
