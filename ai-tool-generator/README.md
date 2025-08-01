# AI Tool Generator

Aplicação full stack que usa a API da OpenAI para gerar código a partir de uma descrição simples.

## Estrutura
- **backend**: API em Node.js/Express com banco SQLite
- **frontend**: Aplicação React (Vite) com Tailwind CSS

## Uso
1. Copie `.env.example` dentro de `backend` para `.env` e adicione sua chave `OPENAI_API_KEY`.
2. No diretório `backend`, execute:
   ```bash
   npm install
   npm run dev
   ```
3. Em outro terminal, acesse `frontend` e execute:
   ```bash
   npm install
   npm run dev
   ```
4. Abra `http://localhost:5173` no navegador.

## Funcionalidades
- Envie uma descrição para gerar um código.
- Histórico das ferramentas geradas armazenado em SQLite.
- Interface simples com Tailwind CSS.
