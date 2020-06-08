const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config"), (User = require("./api/models/User")); //created model loading here

// mongoose instance connection url connection

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log("connected")
);

var routes = require("./api/routes/Routes"); //importing route
routes(app); //register the route

app.listen(port);

console.log("RESTful API server started on: " + port);
