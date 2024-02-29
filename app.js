
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Translate } = require('@google-cloud/translate').v2;
 const cred = JSON.parse(process.env.CREDENTIALS);
const app = express();
const PORT = process.env.PORT || 3000;
 const translate = new Translate({
     credentials: cred,
     projectId: cred.projectId
 });
app.use(bodyParser.json());

// POST endpoint for translation
app.post('/translate', async (req, res) => {
    const { text } = req.body;
    if (!text ) {
        return res.status(400).json({ error: 'Missing required parameters: text' });
    }

    try {
        const [translation] = await translate.translate(text, 'fr');
        res.json({ translation });
    } catch (error) {
        console.error('Translation Error:', error);
        res.status(500).json({ error: 'Translation failed' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
