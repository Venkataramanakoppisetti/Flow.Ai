# Personal Expense Tracker

A personal expense tracker application built using Node.js, Express.js, and SQLite. This application allows users to register, log in, and manage their income and expenses through transactions. The application features JWT authentication, and it is designed to help users track their financial activities effectively.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Packages Used](#packages-used)
- [Environment Variables](#environment-variables)
- [Build Commands](#build-commands)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and authentication using JWT.
- CRUD operations for transactions.
- Pagination for transaction retrieval.
- Category management for expenses and income.

## Tech Stack

- **Frontend:** (if applicable, otherwise you can remove this section)
- **Backend:** Node.js, Express.js
- **Database:** SQLite
- **Authentication:** JSON Web Tokens (JWT)

## Installation

1. Clone the repository:

   git clone <repository-url>
   cd expense-tracker

2. Install the required packages:
    npm install


Usage
1. Create a .env file in the root directory and add the following variables:
    DB_PATH=./database/expense-tracker.db
    JWT_SECRET=VENKY_SECRET_KEY
    PORT=10000
    HOST='0.0.0.0'

2. To start the server, use:
    npm start
    Or, if you're using Nodemon for automatic reloading during development:
    nodemon server.js


API Endpoints: 
    Authentication
        POST /api/register

        Request body: { "username": "user", "password": "pass" }
        Response: { "message": "User registered successfully" }
        POST /api/login

        Request body: { "username": "user", "password": "pass" }
        Response: { "auth": true, "token": "jwt-token" }

    Transactions
        POST /api/transactions
            Request body: { "type": "income/expense", "category": "category_id", "amount": 100, "date": "2024-01-01", "description": "Description" }
            Response: { "message": "Transaction created successfully", "transactionId": 1 }
        
        GET /api/transactions
            Query parameters: ?page=1&limit=10
            Response: [ { ...transaction_data } ]
        
        PUT /api/transactions/
            Request body: { "type": "income/expense", "category": "category_id", "amount": 150, "date": "2024-01-02", "description": "Updated Description" }
            Response: { "message": "Transaction updated successfully" }
        
        DELETE /api/transactions/
            Response: { "message": "Transaction deleted successfully" }

    Database Schema
        Users Table
        Column 	Type	Constraints
        id	INTEGER	PRIMARY KEY AUTOINCREMENT
        username	TEXT	NOT NULL UNIQUE
        password	TEXT	NOT NULL

    Categories Table
        Column	Type	Constraints
        id	INTEGER	PRIMARY KEY AUTOINCREMENT
        name	TEXT	NOT NULL
        type	TEXT	CHECK(type IN ('income', 'expense')) NOT NULL

    Transactions Table
        Column	Type	Constraints
        id	INTEGER	PRIMARY KEY AUTOINCREMENT
        user_id	INTEGER	NOT NULL, FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE
        type	TEXT	CHECK(type IN ('income', 'expense')) NOT NULL
        category	TEXT	NOT NULL, FOREIGN KEY REFERENCES categories(id)
        amount	REAL	NOT NULL
        date	TEXT	NOT NULL
        description	TEXT	

    Packages Used
        express: Web framework for Node.js.
        sqlite3: SQLite database driver for Node.js.
        bcryptjs: Library to hash passwords.
        jsonwebtoken: Library to create and verify JWTs.
        body-parser: Middleware to parse incoming request bodies.

    Environment Variables
        Ensure you have the following variables in your .env file:

DB_PATH: Path to your SQLite database.
JWT_SECRET: Secret key for signing JWTs.
PORT: Port for the server to listen on (default is 3000).

Build Commands
    There are no specific build commands for this project as it is a backend service. Just ensure you have Node.js and the necessary packages installed.

