"use strict";

const createError = require("http-errors");

const Alimento = require("./alimento.model");

module.exports = {
  query(req, res, next) {
    const { query } = req;

    Alimento.find(query)
      .exec()
      .then(alimentos => {
        res.send(alimentos);
      })
      .catch(next);
  },
  load(req, res, next, id) {
    Alimento.findById(id).then(alimento => {
      if (!alimento) {
        return next(createError(404, "Alimento não encontrado"));
      }
      req.alimento = alimento;
      next();
    });
  },
  create(req, res, next) {
    if (!req.user.isAdmin) {
      return next(createError(401, "Somente admins podem criar alimentos"));
    }

    const alimento = new Alimento(req.body);

    alimento.save().then(() => {
      res.send(alimento);
    });
  },
  get(req, res) {
    const { alimento } = req;

    res.send(alimento);
  },
  update(req, res, next) {
    if (!req.user.isAdmin) {
      return next(createError(401, "Somente admins podem atualizar alimentos"));
    }

    const { alimento } = req;
    const { body } = req;

    Object.assign(alimento, body);

    alimento
      .save()
      .then(() => {
        res.send(alimento);
      })
      .catch(next);
  },
  remove(req, res, next) {
    if (!req.user.isAdmin) {
      return next(createError(401, "Somente admins podem excluir alimentos"));
    }

    const { alimento } = req;

    alimento
      .remove()
      .then(() => {
        res.sendStatus(200);
      })
      .catch(next);
  }
};
