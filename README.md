WIKI MAPS
=========

## Project Setup

Wiki Maps is a Lighthouse Labs midterm project created by Jiaqi, Cecil, and Khea. 

Wiki Maps is a map sharing web app for users to share points of interest. Users are able to create maps, allow other users to insert pins with an image, title, and description, edit pins, and favourite maps. 

This project is built with NodeJS Express (with RESTful routes), HTML/CSS (SASS preprocessor)/Javascript (jQuery library) on the front end, PostgreSQL for DBMS, Leaflet API for map rendering.



## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`



## Dependencies

 - Express 4.17 or above
 - Body-parser 1.19 or above
 - Cookie-parser 1.4.5 or above
 - Chalk 2.4.2 or above
 - Dotenv 2.0 or above
 - EJS 2.6.2 or above
 - Morgan 1.9.1 or above
 - Node-sass-middleware 0.11.0 or above
 - PG 8.5 or above
 - PG-native 3.0.0 or above 
