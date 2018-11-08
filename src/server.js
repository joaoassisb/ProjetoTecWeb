"use strcit";

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");

const api = require("./backend/api/api");

mongoose.connect("mongodb://localhost/projeto-tecweb");

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use("/api", api);

app.get("/*", (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  if (err.expose) {
    res.status(err.status).send(err.message);
  } else {
    let message = "Erro do servidor";

    if (err.name === "ValidationError") {
      message = {
        message: "Erro de validação",
        validations: Object.entries(err.errors).map(([field, { message }]) => ({
          field,
          message
        }))
      };
    }

    console.error(err);

    res.status(err.status || 500).send(message);
  }
});

module.exports = app;
