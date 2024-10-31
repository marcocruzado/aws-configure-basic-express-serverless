require("dotenv").config();

const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");

//import the routes
const {router:SwarsRouter} = require('./routes/swars.routes');
const {router:PersonajesRouter} = require('./routes/personajes.routes');

//initialize the app
const app = express();

//middlewares
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use('/',SwarsRouter);
app.use('/personajes',PersonajesRouter);

//export the app
module.exports = app;
