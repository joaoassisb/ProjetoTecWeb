"use strict";

const createError = require("http-errors");

const AlimentoUsuario = require("./alimento-usuario.model");

module.exports = {
  query(req, res, next) {
    AlimentoUsuario.find({
      usuario: req.user
    })
      .exec()
      .then(alimentos => {
        res.send(alimentos);
      })
      .catch(next);
  },
  create(req, res, next) {
    const { body, user } = req;

    const alimentoUsuario = new AlimentoUsuario(body);

    alimentoUsuario.usuario = user;

    alimentoUsuario
      .save()
      .then(() => {
        res.send(alimentoUsuario);
      })
      .catch(next);
  },
  load(req, res, next, id) {
    AlimentoUsuario.findById(id).then(alimentoUsuario => {
      if (!alimentoUsuario) {
        return next(createError(404, "Alimento de Usuário não encontrado"));
      }
      req.alimentoUsuario = alimentoUsuario;
      next();
    });
  },
  get(req, res) {
    const { alimentoUsuario } = req;

    res.send(alimentoUsuario);
  },
  update(req, res, next) {
    const { alimentoUsuario } = req;
    const { body } = req;

    Object.assign(alimentoUsuario, body);

    alimentoUsuario
      .save()
      .then(() => {
        res.send(alimentoUsuario);
      })
      .catch(next);
  },
  remove(req, res, next) {
    const { alimentoUsuario } = req;

    alimentoUsuario
      .remove()
      .then(() => {
        res.sendStatus(200);
      })
      .catch(next);
  }
};
