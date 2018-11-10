"use strict";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
mongoose.Promise = Promise;

const url =
  "mongodb://db-websaude:xwIOPHqJWJZaA9vTleO4dyq2tDCVh37g0r5PmSNhzW8OcGlHRGrNLWtwTmO9OhuxL8aCfYH1XgdvZO0Mba3f7g==@db-websaude.documents.azure.com:10255/mean-dev?ssl=true&sslverifycertificate=false";
mongoose.connect(
  url,
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Conexão falhou"));

const api = require("./api/api");

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

app.use("/api", api);

module.exports = {
  app: app,
  port: 9000
};
