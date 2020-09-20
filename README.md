# Fastify Rest API

Simple rest api using fastify, knex and objection

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development

### Installing

A step by step series of examples that tell you how to get a development env running

Copy the repository

```
git clone git@github.com:aangsupriatna/fastify-server-api.git
```

Install all dependency

```
yarn install
```

### Setup

Setup the dotenv file to match your server settings

```
rename .env.example to .env file and change the values
```

### Database Migrations and Seeds

Run the migrations

```
yarn knex migrate:up
```

Run the seeds

```
yarn knex seed:run
```

### Create and Undo Migrations and Seeds
Undo the migrations

```
yarn knex migrate:rollback
```

Create database migrations

```
yarn knex migrate:make create_table_users
```

Create database seeds

```
yarn knex seed:make 01_users
```

