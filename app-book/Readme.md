
# app-book API

## Description

app-book API is an API built with Node.js and Express.js for managing a book store. This API allows users to perform CRUD (Create, Read, Update, Delete) operations on books and stores in a book store database.

## Project Structure

The project is organized into different folders for better code organization and modularity:

-    app-book/: The root folder of the project.
 -   controllers/: Contains the controllers for handling API requests.
  -  models/: Contains the model schemas and functions for interacting with the PostgreSQL database using Sequelize.
   - routes/: Contains the API endpoint routes.
   - Database/: allow your Node.js application to interact with a PostgreSQL database. The `connection.js` file creates a connection to the database, the `pool.js` file creates a pool of connections, and the      `queries.js` file defines SQL queries to interact with the books table.
   
   
   ## API Routes

 project defines the following API routes:

    GET /books: Gets all books.
    GET /books/details :id: Gets a single book by ID.
    POST /books: Creates a new book.
    PUT /books/:id: Updates an existing book by ID.
    DELETE /books/:id: Deletes a book by ID.
    Get /stores Get all books of store 
    Post /stores/save : create a new store
    
The API endpoints are defined in the routes/bookRoutes.js and routes/storeRoute.js files. The cors package is used to enable Cross-Origin Resource Sharing (CORS) for the API, which allows the client to make API requests from a different origin.

## PostgreSQL Database

 project uses PostgreSQL as the database to store book data. The database connection configuration is stored in the .env file and loaded using the dotenv package. The pg package is used to interact with the PostgreSQL database.

The `models/book.js` file defines the book model schema and the functions for interacting with the PostgreSQL database using Sequelize. Sequelize is a promise-based Node.js ORM for PostgreSQL that provides easy access to the database. Sequelize allows you to define your models and perform CRUD (Create, Read, Update, Delete) operations on your database in a very simple and intuitive way.

Also  `models/store.js` file  define the store model fro interacting with PostgreSQL .

## Dependencies

 -   `body-parser`: Parses incoming request bodies in middleware before your handlers, available under the req.body property.
 -  `cors:` Enables Cross-Origin Resource Sharing (CORS) for the API.
 - `dotenv:` Loads environment variables from a .env file.
 - `express:` A web framework for Node.js that makes it easy to handle HTTP requests and responses.
 - `pg: `A PostgreSQL client for Node.js.
 - `sequelize:` A promise-based Node.js ORM for PostgreSQL that provides easy access to the database.

