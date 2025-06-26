# Desafio Conec - Backend

Este projeto é o backend desenvolvido com NestJS, TypeScript e PostgreSQL.

---

## Tecnologias Utilizadas

- NestJS  
- TypeScript  
- PostgreSQL  
- TypeORM (ou Prisma, se usar outro ORM)  
- JWT para autenticação  
- Bcrypt para hash de senhas  

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- Node.js (versão 16 ou superior)  
- npm ou yarn  
- PostgreSQL  

---

## Como rodar o projeto localmente

1. Clone o repositório:

git clone https://github.com/tamisouzza/desafio-conec-backend.git

2. Acesse o diretório:

cd desafio-conec-backend

3. Instale as dependências:

npm install

4. Configure as variáveis de ambiente:

Crie um arquivo .env na raiz do projeto com as variáveis necessárias. Exemplo:

DATABASE_URL=postgres://usuario:senha@localhost:5432/nome_do_banco
JWT_SECRET=sua_chave_secreta_jwt
PORT=3001

5. Rode as migrations (se aplicável):

npm run typeorm:migration:run

6. Inicie o servidor:

npm run start:dev

O servidor estará rodando em http://localhost:3001 (ou na porta configurada).

Testes

Para rodar os testes automatizados, use:

npm test

Endpoints principais

/auth/register - Cadastro de usuário

/auth/login - Login e geração de token JWT

/users - CRUD de usuários (com controle de acesso por roles)

(Para detalhes dos endpoints, consulte a documentação Swagger ou Postman)

Deploy
Para fazer o deploy, configure variáveis de ambiente no servidor de hospedagem e execute o build:

npm run build
npm run start:prod



Backend – Fullstack Project

Objective
Create a backend API using NestJS, with authentication, user roles (admin/user), and full CRUD operations, integrated with PostgreSQL and documented using Swagger.

Technologies
NestJS

TypeScript

PostgreSQL

Prisma ORM

JWT (authentication)

Bcrypt (password hashing)

Swagger (API documentation)

Jest (unit testing)

Render (deployment)

Features
User registration

Login with JWT authentication

Password encryption with bcrypt

Role-based access control: admin and user

Full CRUD for users

Filter users by name and status (active/inactive)

Unit tests

Swagger documentation

Google login (extra)

Deployed version available

How to run locally
Clone the project

git clone https://github.com/tamisouzza/desafio-conec-backend.git

Enter the project folder

cd desafio-conec-backend
Install dependencies

npm install

Configure the environment variables

Create a .env file based on .env.example and fill in your database and credentials:

DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
Run the database migrations

npx prisma migrate dev

Start the development server

npm run start:dev

The server will be available at:
http://localhost:3000

Swagger documentation:
http://localhost:3000/api

Running tests

npm run test

Deployment

The backend is deployed and available at:
https://desafio-conec-backend.onrender.com

Author
Developed by Tami Soares
https://github.com/tamisouzza
