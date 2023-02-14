-- Active: 1674084192186@@35.226.146.116@3306@jbl-4416152-caroline-martins
CREATE TABLE IF NOT EXISTS Cookenu_users(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(64) NOT NULL UNIQUE,
    password VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS Cookenu_recipe(
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_author VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_author) REFERENCES Cookenu_users (id)
);