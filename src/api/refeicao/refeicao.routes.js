"use strict";

const express = require("express");
const router = express.Router();

const autho = require("../middlewares/authorization");
const api = require("./refeicao.api");

router
  .route("/refeicoes")
  .all(autho.requiresLocalLogin)
  .get(api.queryOrCreate);

router.param("id", api.load);
router
  .route("/refeicoes/:id")
  .all(autho.requiresLocalLogin)
  .get(api.get);
router
  .route("/refeicoes/:id/alimentos")
  .all(autho.requiresLocalLogin)
  .post(api.adicionarAlimento);

router.param("alimentoRefeicaoId", api.loadAlimentoRefeicao);
router
  .route("/refeicoes/:id/alimentos/:alimentoRefeicaoId")
  .all(autho.requiresLocalLogin)
  .post(api.atualizarAlimento)
  .delete(api.removerAlimento);

module.exports = router;
