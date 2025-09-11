# IntraFlow

**IntraFlow** é um portal interno para solicitações e aprovações de colaboradores, desenvolvido com React, Node.js, Express e SQLite. O projeto oferece autenticação via JWT, interface moderna e um dashboard com solicitações de usuários.

---

## ✨ Tecnologias Utilizadas

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Banco de Dados**: SQLite
- **Autenticação**: JWT (JSON Web Token)

---

## 🚀 Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/IntraFlow.git
cd IntraFlow
```

---

### 2. Backend

```bash
cd backend
npm install
npm run seed     # Popula o banco de dados SQLite com usuários, tipos e solicitações
npm start        # Inicia o servidor backend na porta 3001
```

Esse servidor oferece as rotas de login (`/login`) e visualização de requisições (`/requests`).

---

### 3. Frontend

Abra outro terminal:

```bash
cd frontend
npm install
npm run dev      # Inicia o servidor frontend na porta 5173 (Vite)
```

---

## 👤 Contas de Acesso Padrão

Essas contas são criadas automaticamente pelo script `seed.js`.

| Usuário | Senha | Perfil       |
|--------|--------|--------------|
| alice  | pass   | colaborador  |
| bob    | pass   | gestor       |
| admin  | admin  | administrador |

---

## ✅ Funcionalidades

- **Login com autenticação JWT**
- **Visualização de solicitações com:**
  - Nome do solicitante
  - Tipo de solicitação
  - Status (`CREATED`, `APPROVED`, `REJECTED`)
  - Data
- **Logout**
- **Interface centralizada e responsiva**
- **Seed automático com dados realistas**
- **Navbar com nome do usuário logado**

---

## ⚠️ Erros comuns

### ❗ Erro ao importar `App.css` no Windows

Garanta que a importação no `App.jsx` seja relativa:

```js
import './Apps.css'  // ✅ Correto
```

❌ **Errado**:
```js
import '/src/Apps.css' // Isso causará erro no Windows
```

---

## 🧪 Teste rápido

1. Execute `npm run seed` para gerar dados.
2. Inicie backend com `npm start`
3. Inicie frontend com `npm run dev`
4. Acesse `http://localhost:5173`
5. Faça login com qualquer uma das contas padrão acima

---

## 📁 Estrutura de Pastas

```
IntraFlow/
├── backend/
│   ├── index.js
│   ├── seed.js
│   └── intraflow.db
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── Apps.css
    │   └── main.jsx
```

---

## 📌 Próximas melhorias (sugestões)

- Filtros por status e tipo
- Gráficos analíticos com Recharts
- Criação de novas solicitações pelo usuário
- Tela de gestão de solicitações para o gestor/admin

---

## 📃 Licença

Este projeto é livre para uso educacional e testes internos. Direitos autorais de acordo com o autor original.
