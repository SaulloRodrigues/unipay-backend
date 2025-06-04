# UniPay - Backend - Carteira Digital

Projeto da disciplina de Desenvolvimento de Aplicações com Frameworks Web (DAF-WEB).

## Sobre

O trabalho consiste no desenvolvimento de uma aplicação fullstack web de temática livre usando
o framework ReactJS (https://react.dev/), o ambiente Node com o Framework Express.js
(https://expressjs.com/pt-br/) e acesso ao banco de dados MySQL. A aplicação deve utilizar os conteúdos
vistos em sala de aula. Além disso, deve-se criar uma apresentação sobre o projeto e uma
documentação no padrão de Relatório Técnico da aplicação.

## Tecnologias

- Node.js
- Express
- MySQL
- Prisma - ORM

## Funcionalidades

- Cadastro e login de usuários
- Criação e gerenciamento de carteiras
- Depósitos, saques e transferências
- Registro de transações

## Estrutura do projeto

- **Controllers**: lógica das rotas
- **Services**: regras de negócio
- **Routes**: configuração das rotas
- **Prisma**: migrations e schema

## Como rodar

1. Clone o repositório  
2. Rode `npm install`  
3. Configure o banco no `.env`  
4. Execute as migrations: `npx prisma migrate dev`  
5. Inicie o servidor: `npm run dev`

## Licenses
Some of the licenses for this project in question.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)