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
  create(req, res, next) {
    const { body, user } = req;

    const alimento = new Alimento(body);

    alimento.usuario = user;

    alimento
      .save()
      .then(() => {
        res.send(alimento);
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
  get(req, res) {
    const { alimento } = req;

    res.send(alimento);
  },
  update(req, res, next) {
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
    const { alimento } = req;

    alimento
      .remove()
      .then(() => {
        res.sendStatus(alimento);
      })
      .catch(next);
  }
};
