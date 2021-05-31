-- Drop and recreate Users table (Example)
-- CREATE DATABASE midtermProject;
-- \c midtermProject

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS maps CASCADE;
DROP TABLE IF EXISTS favourite_maps CASCADE;
DROP TABLE IF EXISTS pins CASCADE;
CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(225),
    password VARCHAR(225),
    email VARCHAR(225)
);
CREATE TABLE maps(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(225),
    description VARCHAR(225)
);
CREATE TABLE favourite_maps(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    map_id INT REFERENCES maps(id) ON DELETE CASCADE
);
CREATE TABLE pins(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(225),
    description VARCHAR(225),
    image VARCHAR(225),
    map_id INT REFERENCES maps(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    latitude FLOAT,
    longitude FLOAT
);
