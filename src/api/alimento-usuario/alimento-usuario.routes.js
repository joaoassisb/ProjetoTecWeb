"use strict";

const express = require("express");
const router = express.Router();

const autho = require("../middlewares/authorization");
const api = require("./alimento-usuario.api");

router
  .route("/alimentos-usuario")
  .all(autho.requiresLocalLogin)
  .get(api.query)
  .post(api.create);

router.param("id", api.load);

router
  .route("/alimentos-usuario/:id")
  .all(autho.requiresLocalLogin)
  .get(api.get)
  .post(api.update)
  .delete(api.remove);

module.exports = router;
