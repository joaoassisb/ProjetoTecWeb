"use strict";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");

const mongoose = require("mongoose");
mongoose.Promise = Promise;

const url = "mongodb://localhost/projeto-tecweb";
mongoose.connect(url);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Conexão falhou"));

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(helmet());
app.use(morgan("tiny"));
app.use(compression());
app.use(express.static("public"));
app.use(express.static("css"));
app.use(express.static("html"));
app.use(express.static("src/static"));
app.use(express.static("node_modules/angular"));
app.use(express.static("node_modules/angular-route"));
app.use(express.static("node_modules/angular-input-masks/releases"));

app.use(
  session({
    secret: "oidfsnfiuhe8r32r3244y23ryvdwqg3dewjifp322",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./passport.js")(passport);
require("./api/auth.api.js")(app, passport);
app.use("/api/", require("./api/usuario/usuario.routes.js"));

module.exports = {
  app: app,
  port: 9000
};
