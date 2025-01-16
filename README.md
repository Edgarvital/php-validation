# Uhuu-PHP
Api e Front-End para gerenciamento de Clientes

# Funcionalidades Implementadas
- CRUD de clientes:
  - Criar, editar, excluir, excluir em massa e listar cadastros.
- Validação dos dados dos clientes
- Desativar e reativar usuário com bloqueio de login
- Filtro, paginação variavel e ordenação na lista de clientes
- Autenticação
- API Rest
- Testes unitários e de feature

## Banco de dados

- PostgreSQL escolhido para a aplicação
- Possui sistema de seeder

## Tecnologias utilizadas

- HTML
- CSS
- Javascript
- Framework Laravel (PHP)
- Docker (construção do ambiente de desenvolvimento)
- Postgres
- React

## O que faltou
- Implementação do recaptcha (Faltou tempo)

## Guia de Instalação da API

##Requisitos:
- Criar o .env com as informações do .env.example

### Comandos necessários:
- Na pasta da API, execute os seguintes comandos:
- docker compose up
- docker-compose exec app bash
- cd application
- composer install
- php artisan key:generate
- php artisan migrate
- php artisan db:seed

## Guia de Instalação do FrontEnd
- Na pasta do FrontEnd, execute os seguintes comandos:
- npm install
- npm run dev

## Informações Uteis:
- Credenciais do Usuário Administrador: {email: "admin@admin.com", password: "password"}
- Há alguns artefatos uteis na pasta da API, como o MER e o Json do Postman
- Video do uso do sistema completo: https://youtu.be/ET6er5QKhIQ
