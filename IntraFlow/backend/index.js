require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();



const app = express();
const PORT = process.env.PORT || 3001;
const SECRET = process.env.JWT_SECRET;


// Initialize DB
const db = new sqlite3.Database('./intraflow.db');

// Create tables if not exist
const initSql = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT
);
CREATE TABLE IF NOT EXISTS types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
);
CREATE TABLE IF NOT EXISTS requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    type_id INTEGER,
    status TEXT,
    created_at TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(type_id) REFERENCES types(id)
);`;

app.use(cors());
app.use(express.json());

db.exec(initSql);

function authenticate(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.sendStatus(401);
    jwt.verify(token.replace('Bearer ', ''), SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username=?', [username], (err, row) => {
        if (err || !row) return res.sendStatus(401);
        if (!bcrypt.compareSync(password, row.password)) return res.sendStatus(401);
        const token = jwt.sign({ id: row.id, role: row.role }, SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});

app.post('/requests', authenticate, (req, res) => {
    const { type_id } = req.body;
    const stmt = db.prepare('INSERT INTO requests (user_id, type_id, status, created_at) VALUES (?,?,"PENDING",datetime("now"))');
    stmt.run([req.user.id, type_id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
    });
});

app.get('/requests', authenticate, (req, res) => {
    let query = 'SELECT r.id, t.name as type, r.status, r.created_at FROM requests r JOIN types t ON r.type_id = t.id';
    if (req.user.role === 'colaborador') {
        query += ' WHERE r.user_id = ' + req.user.id;
    }
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));