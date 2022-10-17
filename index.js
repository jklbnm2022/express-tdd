const express = require("express");
const logger = require("morgan");
const bodyParser = require('body-parser');
const userRoute = require("./api/user");
const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(logger("dev"));
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get(`/`, function (req, res) {
  res.send("Hello world!\n");
});

// Routing
app.use('/users', userRoute)

module.exports = app;
