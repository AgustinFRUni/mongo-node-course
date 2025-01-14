# Mongo-node-course 
# Biblioteca API 📖

## Table of Contents

1. [Introduction](#introduction)
2. [Technologies Used](#techs)
3. [Project Structure](#project-structure)
4. [Installation](#installation)
5. [API Endpoints](#api-endpoints)
   - [Authentication](#authentication)
   - [Using JSON Web Tokens](#using-json-web-tokens)
   - [Books](#books)

## Introduction

This API provides functionalities to manage a library system. It includes endpoints for user authentication and book management, built using Node.js, Express, and MongoDB with Mongoose.


## Technologies used
- NodeJs
- Express
- MongoDb
- Mongoose
- JsonWebToken
- Bcrypt


## Project Structure
```
root/
└─src/
  ├── config/
  ├── controllers/
  ├── models/
  ├── routes/
  └── validators/
```

The system follows a client-server architecture and utilizes a MongoDB database managed with Mongoose to handle data storage.

The server is built using Express, and you can find its code in /controllers, /models, /routes and /validators. The client-side implementation is not explicitly mentioned but would generally be included in a separate directory if present.

Additionally, a `./env` file is recommended with the following variables:
- `PORT`: The port on which the server will listen.
- `JWT_SECRET_WORD` : The secret word used for JSON Web Token (JWT) authentication.
- `CONNECTION_STRING` = The connection string for MongoDB.

## Installation

To install the project, run:

```
git clone https://github.com/AgustinFRUni/node-js-course.git
cd mongo-node-course
npm install
```

## Api Endpoints

### Authentication

#### POST /users/register

Register a new user.

**Request Body:**

```json
{
  "username": "user",
  "password": "pass"
}
```
#### POST /users/login

Authenticate a user and return a token.

**Request Body:**

```json
{
  "username": "user",
  "password": "pass"
}
```
### Using JSON Web Tokens

This API uses JSON Web Tokens (JWT) for authentication. To access protected routes, include a valid JWT in the Authorization header of your requests.


### Example Header:

```
Authorization: Bearer your.jwt.token.here
```

### Books

#### GET /books/

Retrieve all books.

#### GET /books/stats

Retrieve aggregated statistics for books, including average price, average pages, and book count by category (requires user authentication).

#### GET /books/:id

Retrieve a book by its ID.

#### POST /books/

Create a new book (requires user authentication).

**Request Body:**

```json
{
  "title": String,
  "isbn": String,
  "category": String,
  "price": Number,
  "pages": Number,
  "authorName": String,
  "yearOfRelease": Number,
  "sinopsis": String
}
```
#### PATCH /books/:id

Update an existing book (requires user authentication).

#### DELETE /books/:id

Delete a book by its ID (requires user authentication).

##### Example json for books
```json
  {
  "title": "Cien años de soledad",
  "isbn": "9788437604947",
  "category": "Novela",
  "price": 1200,
  "pages": 471,
  "authorName": "Gabriel García Márquez",
  "yearOfRelease": 1967,
  "sinopsis": "Una obra maestra de la literatura hispanoamericana."
}
```
```json
  {
  "title": "El amor en los tiempos del cólera",
  "isbn": "9788437604817",
  "category": "Novela",
  "price": 1100,
  "pages": 348,
  "authorName": "Gabriel García Márquez",
  "yearOfRelease": 1985,
  "sinopsis": "Una historia de amor que desafía el paso del tiempo."
}
```
```json
  {
  "title": "Don Quijote de la Mancha",
  "isbn": "9788467031944",
  "category": "Clásico",
  "price": 1500,
  "pages": 980,
  "authorName": "Miguel de Cervantes",
  "yearOfRelease": 1605,
  "sinopsis": "La historia de un caballero idealista y su fiel escudero."
}
```
```json
{
  "title": "Rayuela",
  "isbn": "9788437602776",
  "category": "Clásico",
  "price": 1000,
  "pages": 736,
  "authorName": "Julio Cortázar",
  "yearOfRelease": 1963,
  "sinopsis": "Una novela revolucionaria de la literatura latinoamericana."
}
```
```json
{
  "title": "Ficciones",
  "isbn": "9788420633127",
  "category": "Cuentos",
  "price": 800,
  "pages": 224,
  "authorName": "Jorge Luis Borges",
  "yearOfRelease": 1944,
  "sinopsis": "Una colección de cuentos llenos de ingenio y profundidad."
}
```
