# API Cadastro e Login Node.js

Uma API RESTful de autenticação e cadastro de usuários, desenvolvida com Node.js, Express e MongoDB.

## Tecnologias Utilizadas

- **Node.js** — Runtime JavaScript no servidor
- **Express** — Framework para construção da API
- **MongoDB Atlas** — Banco de dados NoSQL na nuvem
- **Mongoose** — ODM para modelar dados do MongoDB
- **bcrypt** — Hash seguro de senhas
- **jsonwebtoken (JWT)** — Autenticação por tokens
- **dotenv** — Gerenciamento de variáveis de ambiente

## Estrutura do Projeto

```
├── config/
│   └── db.js                # Conexão com o MongoDB
├── controllers/
│   ├── authController.js    # Lógica de cadastro e login
│   └── userController.js    # Lógica de busca de usuário
├── middleware/
│   └── checkToken.js        # Validação do token JWT
├── models/
│   └── User.js              # Schema do usuário no Mongoose
├── routes/
│   ├── authRoutes.js        # Rotas de autenticação (/auth)
│   └── userRoutes.js        # Rotas do usuário (/users)
├── .env.example             # Exemplo de variáveis de ambiente
├── app.js                   # Entry point da aplicação
└── package.json
```

## Como Executar Localmente

**1. Clone o repositório:**

```bash
git clone <url-do-repositorio>
cd api-cadastro-login-node
```

**2. Instale as dependências:**

```bash
npm install
```

**3. Configure as variáveis de ambiente:**

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```env
PORT=3022
SECRET=sua_secret_aqui
DB_USER=seu_usuario_mongodb
DB_PASS=sua_senha_mongodb
```

**4. Inicie o servidor:**

```bash
npm start
```

O servidor estará rodando em `http://localhost:3022`.

## Endpoints da API

### Público

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/` | Mensagem de boas-vindas |
| POST | `/auth/register` | Cadastro de novo usuário |
| POST | `/auth/login` | Login e geração de token |

### Protegido (requer token JWT)

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/users/:id` | Busca dados do usuário pelo ID |

### Exemplo de uso

**Cadastro:**

```json
POST /auth/register

{
  "name": "Matheus",
  "email": "matheus@email.com",
  "password": "123456",
  "confirmPassword": "123456"
}
```

**Login:**

```json
POST /auth/login

{
  "email": "matheus@email.com",
  "password": "123456"
}
```

**Busca de usuário (com token):**

```
GET /users/:id

Header:
  Authorization: Bearer <token>
```

---

## Melhorias Futuras

Esta seção lista pontos que ainda precisam ser implementados para deixar o projeto mais robusto e seguro.

### Segurança

- **Adicionar expiração ao token JWT** — Atualmente os tokens não expiram, o que representa um risco de segurança. Adicionar o parâmetro `expiresIn` na geração do token, por exemplo `{ expiresIn: "7d" }`.
- **Garantir que o `.env` não seja comitado** — Adicionar um `.gitignore` na raiz do projeto com `node_modules/` e `.env` para evitar expor credenciais no repositório.
- **Validar ObjectId antes das queries** — Quando um ID inválido é passado na URL, o servidor pode crashar com um `CastError`. Adicionar validação usando `mongoose.Types.ObjectId.isValid()` antes de executar queries no banco.

### Tratamento de Erros

- **Criar um middleware global de erros** — Centralizar o tratamento de erros em um único middleware, evitando repetição de blocos `try/catch` nos controllers e garantindo respostas padronizadas para o cliente.

### Testes

- **Adicionar testes unitários e de integração** — Usar bibliotecas como **Jest** e **Supertest** para testar as rotas e a lógica dos controllers, garantindo que a aplicação funcione corretamente antes de qualquer deploy.

### Documentação

- **Documentar a API com Swagger** — Usar a biblioteca **swagger-ui-express** para gerar uma documentação interativa das rotas, facilitando o uso da API por outros desenvolvimentos ou por um frontend.