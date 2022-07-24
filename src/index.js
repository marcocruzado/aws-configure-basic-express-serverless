require("dotenv").config();

const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");

const {router:SwarsRouter} = require('./routes/index.routes');

//initialize the app
const app = express();

//middlewares
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use('/',SwarsRouter);

//export the app
module.exports = app;
