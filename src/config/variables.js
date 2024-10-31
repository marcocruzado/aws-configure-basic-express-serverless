require('dotenv').config();

//initialize express
const SERVER = {
    PORT: process.env.PORT || 3000,
}

//DynamoDB
const DATABASE = {
    DYNAMODB_TABLE : process.env.DYNAMODB_TABLE || 'StarWarsModelsTable',
}


//starwars api
const SWAPI = {
    URL: process.env.START_WARS_API || 'https://swapi.py4e.com/api',
}

module.exports = {
    SERVER,
    DATABASE,
    SWAPI
}