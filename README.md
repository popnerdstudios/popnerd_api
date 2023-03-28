# Planetary API

This is a simple RESTful API that currently allows users to interact with a database of planets. The database is hosted on FaunaDB and can be accessed through various endpoints. The API also integrates with a weather API to allow users to search for a planet based on their current location.

## Installation
1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a .env file with the following variables: 
    `FAUNADB_SECRET=YOUR_FAUNADB_SECRET_HERE`
    `OPEN_WEATHER_API_KEY=YOUR_API_KEY_HERE`
4. Run npm start to start the server on http://localhost:5000

## Endpoints
### GET /planet/:id
Returns a planet with the given ID.

### GET /planet/name/:name
Returns a planet with the given name.

### GET /planet/:name/img
Redirects to the image URL of the planet with the given name.

### GET /planet/:name/desc
Returns the description of the planet with the given name.

### GET /planet/location/:location
Returns a planet based on the current weather.

### GET /planet/location/:location/name
Returns the name of a planet based on the current weather.

### GET /planet/location/:location/img
Redirects to the image URL of a planet based on the current weather.

### GET /planet/location/:location/desc
Returns the description of a planet based on the current weather.

### POST /planet
Creates a new planet with the given name, description, and image URL.

## Dependencies
* Express.js
* body-parser
* dotenv
* FaunaDB
* node-fetch

## Contributing
This project is open for contributions. Feel free to submit a pull request or open an issue if you encounter any problems or have suggestions for improvements.