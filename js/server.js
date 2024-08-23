// server.js
const express = require('express');
const cors = require("cors")
const { detect } = require('langdetect');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());



// POST endpoint for language detection
app.post('/detect-language', async (req, res) => {
    try {
        // Extract the text from the request body
        const { text } = req.body;
        console.log(text);

        // Use langdetect library to detect language
        const detectedLanguage = detect(text);

        // Send detected language back to the client
        res.json({ detectedLanguage });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
