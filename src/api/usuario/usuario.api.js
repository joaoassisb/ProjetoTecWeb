"use strict";

const _ = require("lodash");

function filterUnsafeFields(data) {
  return _.omit(data, ["_id"]);
}

const Usuario = require("./usuario.model");

module.exports = {
  load(req, res, next, usuarioId) {
    const query = Usuario.findById(usuarioId);

    query
      .exec()
      .then(usuario => {
        if (!usuario) {
          return;
        }

        req.usuario = usuario;
        next();
      })
      .catch(next);
  },
  query(req, res, next) {
    console.log(req.query);
    Usuario.find(req.query)
      .then(usuarios => {
        res.send(usuarios);
      })
      .catch(next);
  },
  create(req, res, next) {
    const data = filterUnsafeFields(req.body);
    const usuario = new Usuario(data);
    console.log(usuario);
    usuario
      .save()
      .then(() => {
        res.send(usuario);
      })
      .catch(next);
  },
  remove(req, res, next) {
    const { usuario } = req;

    usuario
      .remove()
      .then(() => {
        res.sendStatus(200);
      })
      .catch(next);
  },
  get(req, res) {
    res.send(req.usuario);
  },
  update(req, res, next) {
    const { usuario } = req;
    const data = filterUnsafeFields(req.body);

    _.assign(usuario, data);

    usuario
      .save()
      .then(() => {
        res.send(usuario);
      })
      .catch(next);
  }
};
