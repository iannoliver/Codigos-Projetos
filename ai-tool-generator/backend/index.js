const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database(path.join(__dirname, 'tools.db'));

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS tools (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT,
    timestamp TEXT,
    code TEXT
  )`);
});

async function generateCode(description) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OpenAI API key not configured');
  }
  const prompt = `Generate a simple tool with the following description:\n${description}\nProvide the code files as text.`;
  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-3.5-turbo',
    messages: [{role: 'user', content: prompt}],
  }, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  });
  const content = response.data.choices[0].message.content;
  return content;
}

app.post('/generate-tool', async (req, res) => {
  const { description } = req.body;
  if (!description) return res.status(400).json({ error: 'Description required' });
  try {
    const code = await generateCode(description);
    const timestamp = new Date().toISOString();
    db.run('INSERT INTO tools (description, timestamp, code) VALUES (?, ?, ?)', [description, timestamp, code]);
    res.json({ code });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error generating tool' });
  }
});

app.get('/tools', (req, res) => {
  db.all('SELECT id, description, timestamp FROM tools ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'DB error' });
    }
    res.json(rows);
  });
});

app.get('/tool/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM tools WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
