require('dotenv').config();

//initialize express
const SERVER = {
    PORT: process.env.PORT || 3000,
}

//other configs
const DATABASE = {
    HOST: process.env.HOST || 'cluster0.bepdjv2.mongodb.net',
    USER: process.env.USER || 'prueba',
    PASSWORD: process.env.PASSWORD || 'rimac',
    DATABASE: process.env.DATABASE || 'swapi-rimac',
}

module.exports = {
    SERVER,
    DATABASE
}