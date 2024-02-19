## Introduction
This simple web application allows users to create notes, tag them, and filter them. The development is divided into two main phases:

Phase 1: Creating notes.
Phase 2: Applying labels and filtering.

## Requirements
npm: v9.6.7
## Backend
Node.js: v18.17.1
Nodemon: v3.0.3
Express: v4.18.2
Express-validator: v7.0.1
Cors: v2.8.5
MySQL: v2.18.1
MySQL2: v3.9.1
Promise-mysql: v5.2.0
body-parser: v1.20.2
nodemon: v3.0.3
## Frontend
Node.js: v18.17.1
React: v17.0.2
React Router: v5.2.0
Axios: v1.6.7
postcss: v8.4.33
tailwindcss: v3.4.1
####
## Class run_app.sh
The script is written in Bash and begins with #!/bin/bash, which specifies the interpreter to use.
Each function within the script performs a specific task:
install_dependencies(): Installs Node.js dependencies using npm install.
configure_database(): Configures the MySQL database by executing a SQL script (database.sql) with mysql command-line tool.
start_server(): Starts the Node.js server located at EnsolversBackend/backend/index.js.
start_react_app(): Starts the React application located at EnsolversBackend/frontend using npm start.
The main() function orchestrates the execution of all the tasks in the correct order.
Finally, the script calls the main function to start the setup and execution process.

## Note
In the run__app.sh file, you need to change it to the name of your database
configure_database() {
  echo "Configuring the MySQL database..."
  mysql -u abstract-programmer (change it to your database name) -p < database.sql
}
## database.sql
## CREATE DATABASE IF NOT EXISTS ensolvers_data;
This command creates a database named ensolvers_data if it doesn't already exist. The IF NOT EXISTS clause ensures that the database is created only if it doesn't already exist.

## USE ensolvers_data;
This command selects the ensolvers_data database for use. Subsequent SQL commands will be executed in the context of this database.

## CREATE TABLE IF NOT EXISTS categories (
##    id INT AUTO_INCREMENT PRIMARY KEY,
##    nameCategory VARCHAR(100) NOT NULL
## );

This SQL statement creates a table named "categories" if it does not already exist. The table has two columns:

"id": An auto-incrementing integer field that serves as the primary key.
   
"nameCategory": A VARCHAR field of up to 100 characters, used to store category names.

In short, you set up a table to store category names along with unique identifiers.

## CREATE TABLE IF NOT EXISTS state (
##    id INT AUTO_INCREMENT PRIMARY KEY,
##   status VARCHAR(100) NOT NULL
## );
This command creates a table named state if it doesn't already exist. It defines two columns:
id: An auto-incrementing integer column that serves as the primary key.
status: A variable-length string column with a maximum length of 100 characters. This column stores the status of notes.

## CREATE TABLE IF NOT EXISTS notes (
##    id INT AUTO_INCREMENT PRIMARY KEY,
##    description VARCHAR(1000) NOT NULL,
##    number INT, 
##    id_state INT NOT NULL,
##    id_category INT,
##    FOREIGN KEY (id_state) REFERENCES state(id),
##	  FOREIGN KEY (id_category) REFERENCES categories(id)
## );
This command creates a table named notes if it doesn't already exist. It defines four columns:
id: An auto-incrementing integer column that serves as the primary key.
description: A variable-length string column with a maximum length of 1000 characters. This column stores the description of notes.
number: An integer column.
id_state: An integer column that references the id column of the state table. This column represents the state of the note.
The FOREIGN KEY constraint establishes a foreign key relationship between the id_state column in the notes table and the id column in the state table.

## INSERT INTO ensolvers_data.state (id, status) VALUES ('1', 'active');
## INSERT INTO ensolvers_data.state (id, status) VALUES ('2', 'archive');
These commands insert data into the state table of the ensolvers_data database. Two rows are inserted:
Row 1: with id = 1 and status = 'active'.
Row 2: with id = 2 and status = 'archive'.
These SQL commands are used to create a database structure for managing notes and their states, along with inserting initial state values into the database.
## Run code
To run this code on Linux, you need to use the following command in your terminal:

Copy code
./run__app.sh

This script is responsible for setting up and executing the application. It performs the following tasks:

Installs Node.js dependencies.
Configures the MySQL database.
Starts the Node.js server.
Starts the React application.
Ensure that you have the necessary permissions to execute the script by using the chmod +x run__app.sh command if needed.

After running the script, you can access the application in your web browser at http://localhost:3000.