const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const db = new sqlite3.Database('./intraflow.db');

const initSql = `
CREATE TABLE IF NOT EXISTS users (
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
);
`;

db.exec(initSql, err => {
  if (err) throw err;
  seed();
});

function seed() {
  const users = [
    { username: 'alice', password: bcrypt.hashSync('pass', 8), role: 'colaborador' },
    { username: 'bob', password: bcrypt.hashSync('pass', 8), role: 'gestor' },
    { username: 'admin', password: bcrypt.hashSync('admin', 8), role: 'admin' }
  ];
  const types = [ { name: 'Reembolso' }, { name: 'Férias' } ];

  db.serialize(() => {
    db.run('DELETE FROM requests');
    db.run('DELETE FROM users');
    db.run('DELETE FROM types');

    const userStmt = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)');
    const userIds = [];
    users.forEach((u, i) => {
      userStmt.run([u.username, u.password, u.role], function () {
        userIds[i] = this.lastID;
      });
    });
    userStmt.finalize();

    const typeStmt = db.prepare('INSERT INTO types (name) VALUES (?)');
    const typeIds = [];
    types.forEach((t, i) => {
      typeStmt.run([t.name], function () {
        typeIds[i] = this.lastID;
      });
    });
    typeStmt.finalize();

    db.serialize(() => {
      setTimeout(() => {
        const reqStmt = db.prepare('INSERT INTO requests (user_id, type_id, status, created_at) VALUES (?, ?, ?, ?)');
        
        for (let i = 0; i < 10; i++) {
          let user_id, type_id, status;

          // alice cria as solicitações
          if (i < 6) {
            user_id = userIds[0]; // alice
            type_id = typeIds[i % typeIds.length]; // alterna entre Reembolso/Férias
            status = i < 2 ? 'CREATED' : (i < 4 ? 'APPROVED' : 'REJECTED');
          } else {
            // bob também pode criar
            user_id = userIds[1];
            type_id = typeIds[Math.floor(Math.random() * typeIds.length)];
            status = i < 8 ? 'APPROVED' : 'REJECTED';
          }

          const createdAt = new Date(2025, 6, 10 + i).toISOString().split('T')[0];
          reqStmt.run([user_id, type_id, status, createdAt]);
        }

        reqStmt.finalize();
        console.log('Database seeded with logic ✔');
        db.close();
      }, 500);
    });
  });
}
