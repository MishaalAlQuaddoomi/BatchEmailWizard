const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

// Set the correct path for your database file
const dbPath = path.join(__dirname, "database.sqlite");

// Open the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("❌ Error connecting to database: ", err.message);
        return;
    }
    console.log("✅ Connected to SQLite database.");
});

// Set the correct path for your schema file
const schemaPath = path.join(__dirname, "schema.sql");

// Read the schema file
const schema = fs.readFileSync(schemaPath, "utf8");

// Execute the schema SQL commands
db.exec(schema, (err) => {
    if (err) {
        console.error("❌ Error applying schema: ", err.message);
        return;
    }
    console.log("✅ Schema applied successfully.");
    db.close(); // Close the connection after the migration
});
