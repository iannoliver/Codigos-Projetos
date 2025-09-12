# AI Tool Generator

Aplicação full stack que usa a API da OpenAI para gerar código a partir de uma descrição simples.  
O projeto é composto por um backend em Node.js/Express com SQLite e um frontend em React (Vite) com Tailwind CSS.

---

## ✨ O que ele faz?

Você digita uma descrição (“Quero um endpoint REST em Express que liste tarefas”) e o app retorna um boilerplate de código.  
O histórico das “ferramentas” geradas fica salvo no SQLite.

---

## Sumário

- [Arquitetura](#arquitetura)
- [Pré-requisitos](#pré-requisitos)
- [Como instalar rapidamente](#como-instalar-rapidamente)
- [Instalação & Configuração](#instalação--configuração)
- [Execução (modo dev)](#execução-modo-dev)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Rotas da API](#rotas-da-api)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Fluxo de uso](#fluxo-de-uso)
- [Dicas de prompts](#dicas-de-prompts)
- [Banco de dados (SQLite)](#banco-de-dados-sqlite)
- [Scripts disponíveis](#scripts-disponíveis)
- [Boas práticas & segurança](#boas-práticas--segurança)
- [Troubleshooting](#troubleshooting-erros-comuns-e-como-resolver)

---

## Arquitetura

### Backend
- API em **Node.js/Express**
- Endpoints para gerar código via OpenAI
- Persiste histórico em SQLite
- Implementa CORS para o frontend

### Frontend
- **React + Vite + Tailwind CSS**
- Formulário para enviar descrições
- Listagem do histórico
- Viewer de resultados

### Portas padrão
- **Backend**: [http://localhost:3000](http://localhost:3000)  
- **Frontend (Vite)**: [http://localhost:5173](http://localhost:5173)

Se necessário, altere via variáveis de ambiente.

---

## Pré-requisitos

- Node.js 18+ (LTS)
- npm 9+
- SQLite (embutido via dependência)
- Ferramentas nativas para pacotes com node-gyp (opcional):
  - **Windows**: Python 3.10+, Visual Studio Build Tools (C++)
  - **macOS**: Xcode Command Line Tools
  - **Linux**: build-essential, python3, make, g++

---

## Como instalar rapidamente

### Windows (via winget)
```bash
winget install OpenJS.NodeJS.LTS
winget install Microsoft.VisualStudio.2022.BuildTools
```

### macOS (via Homebrew)
```bash
brew install node
xcode-select --install
```

### Ubuntu/Debian
```bash
sudo apt update
sudo apt install -y nodejs npm build-essential python3 make g++
```

### Opcional: Instale Node LTS via nvm
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install --lts
```

Verifique as versões:
```bash
node -v
npm -v
python --version
```

---

## Instalação & Configuração

1. **Clone o repositório**
```bash
git clone <url>
cd <pasta>
```

2. **Crie arquivos .env**  
   - Copie `backend/.env.example` para `backend/.env`
   - Adicione sua chave `OPENAI_API_KEY`

3. **Instale as dependências**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

## Execução (modo dev)

Em dois terminais separados:

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

Abra: [http://localhost:5173](http://localhost:5173)

---

## Variáveis de ambiente

### backend/.env
```env
OPENAI_API_KEY=sk-...
OPENAI_BASE_URL=https://api.openai.com/v1
PORT=3000
DATABASE_URL=./data/app.db
FRONTEND_URL=http://localhost:5173
```

### frontend/.env (opcional)
```env
VITE_API_URL=http://localhost:3000
```

---

## Rotas da API

### POST /api/generate
**body:**
```json
{ "description": "Crie um CRUD em Express para tarefas..." }
```
**resposta:**
```json
{ "id": "uuid", "description": "…", "code": "/* código gerado */", "createdAt": "2025-09-12T12:34:56.000Z" }
```

### GET /api/history?limit=20&offset=0
Retorna lista paginada de gerações anteriores.

### GET /api/history/:id
Retorna um item específico.

### DELETE /api/history/:id
Remove um item do histórico.

---

## Estrutura de pastas

```plaintext
.
├─ backend/
│  ├─ src/
│  │  ├─ index.ts|js      # bootstrap do Express
│  │  ├─ routes/          # rotas da API
│  │  ├─ services/        # integração OpenAI
│  │  ├─ db/              # acesso ao SQLite
│  │  └─ lib/             # utilitários (CORS, logger, etc.)
│  ├─ data/app.db
│  ├─ .env
│  └─ package.json
│
└─ frontend/
   ├─ src/
   │  ├─ App.tsx|jsx
   │  ├─ components/
   │  ├─ pages/
   │  └─ services/api.ts
   ├─ index.html
   ├─ tailwind.config.js
   └─ package.json
```

---

## Fluxo de uso

1. Abra [http://localhost:5173](http://localhost:5173)  
2. Digite a descrição  
3. Clique em **Gerar**  
4. Veja o código retornado  
5. Consulte o histórico a qualquer momento  

---

## Dicas de prompts

- Seja específico:
  > "Gerar endpoint POST /tasks com validação JOI e testes unitários"
- Inclua restrições: versão do Node, estilo (CommonJS/ESM), estrutura de pastas
- Peça comentários no código para explicações inline

**Exemplos:**
- "Crie um serviço em Node para consumir a API X com retries exponenciais"
- "Gere um componente React com formulário controlado e validação zod"

---

## Banco de dados (SQLite)

- Arquivo padrão: `backend/data/app.db`
- **Reset rápido**: apague o arquivo e reinicie o servidor
- **Backup**: copie o arquivo `.db`
- **Migrações**: `npm run migrate` (se aplicável)

---

## Scripts disponíveis

### Backend
```bash
npm run dev      # modo desenvolvimento
npm start        # modo produção
npm run lint     # lint opcional
npm run migrate  # aplica migrações
```

### Frontend
```bash
npm run dev      # inicia Vite
npm run build    # build de produção
npm run preview  # pré-visualização do build
```

---

## Boas práticas & segurança

- Nunca exponha `OPENAI_API_KEY` no frontend
- Trate erros da OpenAI (timeouts, rate limits, etc.)
- Sanitizar entradas para evitar injeções de prompt
- Defina limites de tamanho de prompt e saída
- Use CORS restrito e rate limiting para produção
- Logue apenas metadados, não chaves sensíveis

---

## Troubleshooting (erros comuns e soluções)

### `npm: command not found` ou `node: command not found`
- Instale Node.js LTS
- Reinicie o terminal

### Falha ao instalar dependências (`gyp ERR!`)
- Instale ferramentas nativas:
  - Windows: Python 3.10+, VS Build Tools
  - macOS: Xcode Command Line Tools
  - Linux: build-essential, python3, make, g++

### `SQLITE_CANTOPEN`
- Crie a pasta `backend/data/`
- Confirme `DATABASE_URL` no `.env`

### `401 Unauthorized` ao chamar a OpenAI
- Verifique `OPENAI_API_KEY`
- Reinicie o servidor após ajustar `.env`

### Erro CORS
- Ajuste `FRONTEND_URL` no backend
- Reinicie o backend

### Porta em uso (`EADDRINUSE`)
- Altere `PORT` no backend ou use outra porta no Vite

### Tailwind sem aplicar estilos
- Verifique `tailwind.config.js`
- Reinicie o Vite após ajustes

---
