"use strict";

const express = require("express");
const router = express.Router();

const autho = require("../middlewares/authorization");
const api = require("./perfil-usuario.api");

router
  .route("/perfil-usuario")
  .all(autho.requiresLocalLogin, api.loadOrCreate)
  .get(api.get)
  .post(api.update);

module.exports = router;
