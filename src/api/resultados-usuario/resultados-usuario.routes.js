"use strict";

const express = require("express");
const router = express.Router();

const autho = require("../middlewares/authorization");
const api = require("./resultados-usuario.api");

router
  .route("/resultados-usuario")
  .all(autho.requiresLocalLogin, api.loadOrCreate)
  .get(api.get);

router
  .route("/resultados-usuario/gordura-corporal")
  .all(autho.requiresLocalLogin, api.loadOrCreate)
  .post(api.update);

module.exports = router;
