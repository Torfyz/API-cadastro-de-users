# User API

## Descrição

Este repositório contém o código para uma API de usuários desenvolvida com Node.js, Express e Prisma ORM. A API permite criar, listar, editar e remover usuários, utilizando o banco de dados MongoDB.

## Tecnologias Utilizadas

- **Node.js:** Plataforma de desenvolvimento para executar JavaScript no servidor.
- **Express:** Framework para Node.js que facilita a criação de servidores web e APIs.
- **Prisma:** ORM (Object-Relational Mapping) que simplifica o acesso ao banco de dados.
- **MongoDB:** Banco de dados NoSQL utilizado para armazenar os dados dos usuários.
- **CORS:** Middleware para permitir requisições de diferentes origens.

## Funcionalidades

- **Criar Usuário:** Endpoint para criar um novo usuário.
- **Listar Usuários:** Endpoint para listar todos os usuários ou buscar por critérios específicos.
- **Editar Usuário:** Endpoint para atualizar informações de um usuário existente.
- **Remover Usuário:** Endpoint para deletar um usuário.

## Estrutura do Projeto

### Arquivo `server.js`

Este arquivo configura o servidor Express e define os endpoints da API.

```javascript
import cors from 'cors';
import express from 'express';
const app = express();

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.post('/usuarios', async (req, res) => {
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    });
    res.status(201).json(req.body);
});

app.get('/usuarios', async (req, res) => {
    let users = [];
    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        });
    } else {
        users = await prisma.user.findMany();
    }
    res.status(200).json(users);
});

app.put('/usuarios/:id', async (req, res) => {
    await prisma.user.update({
        where: { id: req.params.id },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    });
    res.status(201).json(req.body);
});

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: { id: req.params.id }
    });
    res.status(202).json({ message: "Usuário deletado com sucesso!" });
});

app.listen(3000);
```

### Arquivo `schema.prisma`

Este arquivo define o esquema do banco de dados utilizado pelo Prisma.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model User {
  id      String @id @default(auto()) @map("_id") @db.ObjectId
  email   String @unique
  name    String?
  age     String
}
```

## Como Executar

1. Clone o repositório.
2. Instale as dependências com `npm install`.
3. Configure a variável de ambiente `DATABASE_URL` com a URL do seu MongoDB.
4. Execute as migrações do Prisma com `npx prisma migrate dev`.
5. Inicie o servidor com `npm start`.
