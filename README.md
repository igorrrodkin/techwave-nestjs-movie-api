# TechWave Movie API

TechWave Movie API is a simple movie management service built using NestJS. This API provides CRUD operations for movies, including listing, creating, updating, and deleting movies. The application follows best practices in architecture, separating concerns into modules and utilizing dependency injection for scalable development.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database](#database)
3. [Run the Application](#run-the-application)
4. [Functionality](#functionality)
5. [API Endpoints](#api-endpoints)

## Prerequisites

Ensure you have the following installed:

-   Node.js
-   NPM
-   Docker

### Dependencies installation

After you cloned the repository, make sure to install dependencies. I used **npm** package manager however you can use **yarn**, **pnpm** etc. as well.

```bash
$ npm install
```

### Database creation

Since there is not a production project I've run my PostgreSQL database locally in Docker container.

```bash
$ docker pull postgres
```

```bash
$ docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5433:5432 -d postgres
```

### .env

After our database instance is ready to use make sure you've configured your .env file

All required variables and its values can be found in **.env.example** file

> Note: Since you are running PostgreSQL database in docker container locally, there is no threat of leakage of sensitive secrets.

## Database

Application isolates data-access-level in order to follow DRY principles and reuse existing queries. All queries are distributed across repositories depending on the parts of the application and tables that are used in the query.
Prisma ORM is used for running schema migrations and querying your database.

### Migrations

#### Apply migrations on your database

```bash
$ npx prisma migrate dev
```

#### Custom migrations

Since Prisma ORM doesn't support trigram-based indexes yet, this migration is written manually.

> Potential bottleneck: Prisma doesn't provide any functionality to apply custom migrations with defining database resources created by them in order to make database state and prisma schema in sync. As a result, in case when we make some schema changes, in addition with migrations that follows the schema, Prisma will generate "reverse" migrations for our custom migrations

```bash
$ npm run migrate-custom
```

#### Seed your database

If you don't want to start using the app from scratch, you can seed your database with some famous genres and movies:

```bash
$ npm run seed
```

## Run the Application

After previous steps are done, the application can be run

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Functionality

-   The TechWave Movie API is a simple RESTful API designed to manage a movie database.
-   The API provides essential CRUD operations for movies and genres, allowing users to interact with the movie data seamlessly. Users can list all movies, add new movies with attributes such as title, description, release date, and genre, update existing movie details, and delete specific movies from the database. Similarly, users can manage genres by listing, adding, and deleting genres. Deleting a genre also removes it from all associated movies.
-   The API supports searching for movies by title or genre and offers pagination to navigate through large lists of movies.
-   In addition, it includes request logging middleware, robust data validation, and error handling to ensure secure and efficient interactions.

## API Endpoints

After you application is running you can find its OpenAPI documentation via [http://localhost:3000/api](http://localhost:3000/api) endpoint (Assuming your application is running on this port).
