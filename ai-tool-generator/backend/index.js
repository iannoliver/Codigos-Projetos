require('dotenv').config();

const express  = require('express');
const cors     = require('cors');
const sqlite3  = require('sqlite3').verbose();
const axios    = require('axios');
const archiver = require('archiver');
const fs       = require('fs');
const path     = require('path');

const app  = express();
const PORT = process.env.PORT || 3001;

console.log('[BOOT] file:', __filename);
console.log('[BOOT] cwd :', process.cwd());

// Middlewares
app.use(cors());
app.use(express.json({ limit: '5mb' }));

// ===== Handlers globais de erro =====
process.on('uncaughtException', (err) => console.error('[uncaughtException]', err));
process.on('unhandledRejection', (reason) => console.error('[unhandledRejection]', reason));

// ===== DB =====
const dbPath = path.join(__dirname, 'tools.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('[DB] erro ao abrir:', err);
  else console.log('[DB] aberto em', dbPath);
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tools (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT,
      timestamp   TEXT,
      code        TEXT
    )
  `, (err) => { if (err) console.error('[DB] erro create table:', err); });
});

// ===== OpenAI =====
async function generateCode(description) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OpenAI API key not configured');

  const systemPrompt = `
Você é um gerador de projetos. Regras:
1) Sempre comece com [README.md] contendo título, resumo PT-BR, stack, como rodar.
2) Depois entregue TODOS os arquivos como blocos:
   [caminho/arquivo.ext]
   <conteúdo SEM cercas de código>
3) Não escreva nada fora dos blocos. Sem \`\`\`.
4) Se pedido mencionar linguagens incomuns, escolha uma stack pertinente (Rust+WASM, Go, Elm, etc) e documente no README.
`;

  const userPrompt = `Descrição:\n${description}\n`;

  const resp = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-3.5-turbo', // troque se quiser
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user',   content: userPrompt },
    ],
    temperature: 0.3,
    top_p: 0.9,
  }, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  const content = resp.data?.choices?.[0]?.message?.content || '';
  return content.trim();
}

// ===== Helper ÚNICO: listar rotas (compatível Express 4/5) =====
function listRoutes() {
  const routes = [];
  const stack = app?._router?.stack || [];

  function pushRoute(layer, prefix = "") {
    if (layer?.route) {
      const path = prefix + (layer.route.path || "");
      const methods = Object.keys(layer.route.methods || {});
      methods.forEach((m) => routes.push({ method: m.toUpperCase(), path }));
    } else if (layer?.name === "router" && layer.handle?.stack) {
      const newPrefix = prefix + (layer.regexp?.fast_slash ? "" : (layer.regexp?.regexp?.source || layer.regexp?.toString() || ""));
      layer.handle.stack.forEach((l) => pushRoute(l, prefix)); // manter prefix simples (evita regex feio)
    }
  }

  stack.forEach((layer) => pushRoute(layer, ""));
  return routes;
}

// ===== Rotas de negócio =====
app.post('/generate-tool', async (req, res) => {
  try {
    const { description } = req.body || {};
    if (!description) return res.status(400).json({ error: 'Description required' });

    const code = await generateCode(description);
    const timestamp = new Date().toISOString();

    db.run(
      'INSERT INTO tools (description, timestamp, code) VALUES (?, ?, ?)',
      [description, timestamp, code],
      function (err) {
        if (err) {
          console.error('[DB] insert error:', err);
          return res.status(500).json({ error: 'Erro ao salvar' });
        }
        res.json({ id: this.lastID, code, timestamp });
      }
    );
  } catch (err) {
    console.error('[ERR] /generate-tool:', err);
    res.status(500).json({ error: String(err.message || err) });
  }
});

app.get('/tools', (req, res) => {
  db.all('SELECT id, description, timestamp, code FROM tools ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      console.error('[DB] select error:', err);
      return res.status(500).json({ error: 'DB error' });
    }
    res.json(rows);
  });
});

app.get('/tool/:id', (req, res) => {
  db.get('SELECT * FROM tools WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  });
});

// ===== ZIP: recebe "code" com blocos [arquivo] e devolve .zip =====
app.post('/download-zip', async (req, res) => {
  try {
    const { code, name } = req.body || {};
    if (!code) return res.status(400).json({ error: 'Código não enviado.' });

    const files = [];
    const re = /\[([^\]\n]+)\]\s*\n([\s\S]*?)(?=\n\[[^\]\n]+\]\s*\n|$)/g;
    let m;
    while ((m = re.exec(code)) !== null) {
      files.push({ name: m[1].trim(), content: m[2].trim() });
    }
    if (files.length === 0) files.push({ name: 'index.html', content: String(code) });

    const tmpDir = path.join(__dirname, 'tmp');
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

    const zipName = `${(name || 'projeto').replace(/[^\w\-]+/g, '_')}_${Date.now()}.zip`;
    const zipPath = path.join(tmpDir, zipName);

    const output  = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.pipe(output);
    files.forEach(f => archive.append(f.content, { name: f.name }));
    await archive.finalize();

    output.on('close', () => res.download(zipPath, zipName, () => fs.unlink(zipPath, () => {})));
  } catch (err) {
    console.error('[ERR] /download-zip:', err);
    res.status(500).json({ error: 'Erro ao gerar ZIP' });
  }
});

// ===== Raiz e Debug =====
app.get('/', (_req, res) => {
  res
    .type('text')
    .send('AI Tool Generator API OK\nUse /health, /tools, /tool/:id, /generate-tool, /download-zip, /__routes');
});

app.get('/health', (_req, res) => res.json({ ok: true, ts: new Date().toISOString() }));
app.get('/__routes', (_req, res) => res.json(listRoutes()));

// ===== Start server (deixe por último) =====
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  setImmediate(() => console.log('[routes]', listRoutes()));
});

server.on('error', (err) => console.error('[SERVER ERROR]', err));