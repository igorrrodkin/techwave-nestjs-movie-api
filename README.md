# TechWave Movie API

TechWave Movie API is a simple movie management service built using NestJS. This API provides CRUD operations for movies, including listing, creating, updating, and deleting movies. The application follows best practices in architecture, separating concerns into modules and utilizing dependency injection for scalable development.

## Table of Contents

1. [How to Run the Application](#how-to-run-the-application)
2. [Functionality](#functionality)
3. [Architecture](#architecture)
4. [API Endpoints](#api-endpoints)

## How to Run the Application

### Prerequisites

Ensure you have the following installed:

- Node.js
- NPM
- Docker

### Installation

After you cloned the repository, make sure to install dependencies. I used NPM package manager however you can use YARN, PNPM etc. as well

```bash
$ npm install
```

### Database

Since there is not a production project I've run my PostgreSQL database locally in Docker container.

```bash
$ docker pull postgres

$ docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5433:5432 -d postgres
```

### .env

After our database instance is ready to use make sure you've configured your .env file

All required variables and its values can be found in .env.example file

Note: Since you are running PostgreSQL database in docker container locally, there is no threat of leakage of sensitive secrets

## Run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```
