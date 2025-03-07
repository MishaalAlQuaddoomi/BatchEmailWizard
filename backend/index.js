const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer"); // Import multer for handling file uploads

const app = express();

// Set up multer for file uploads
const upload = multer({
    limits: { fileSize: 50 * 1024 * 1024 }, // Set file size limit to 50MB
    dest: 'uploads/', // Store files in the 'uploads' folder
}).single('file'); // Expect a file upload field named 'file'

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));  // JSON body size limit for other data
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Handle file upload route
app.post("/upload", upload, (req, res) => {
    // Check if a file was uploaded
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
    }
    console.log("File uploaded:", req.file);
    // Process the uploaded file (e.g., parse CSV and add to the database)
    res.status(200).json({ message: "File uploaded successfully", file: req.file });
});

// Your contacts route can stay as it is
const contactsRouter = require("./routes/contacts");
app.use("/contacts", contactsRouter);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
