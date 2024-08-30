// src/app.js
const express = require('express');
const { initDb } = require('./models');
const imageRoutes = require('./routes/imageRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/images', imageRoutes);

initDb();
app.set('trust proxy', true);
app.get("/", (req, res) => {
    res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nikhil's Project</title>
            <style>
                body {
                    margin: 0;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: Arial, sans-serif;
                    background: linear-gradient(135deg, #00c6ff, #0072ff); /* Example gradient */
                    color: white;
                    text-align: center;
                }
    
                .message-box {
                    padding: 20px;
                    background: rgba(0, 0, 0, 0.5); /* Slightly transparent background */
                    border-radius: 15px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                }
    
                .message {
                    font-size: 1.5em;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="message-box">
                <p class="message">Hi, Welcome to Nikhil's project,<br>Please use the backend API to test the project</p>
            </div>
        </body>
        </html>
        `);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});