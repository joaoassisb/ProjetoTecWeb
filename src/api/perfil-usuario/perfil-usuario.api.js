"use strict";

const PerfilUsuario = require("./perfil-usuario.model");

module.exports = {
  loadOrCreate(req, res, next) {
    const userId = req.user._id;

    PerfilUsuario.findOne({ usuario: userId })
      .then(usuario => {
        if (usuario) {
          return usuario;
        }

        const perfilUsuario = new PerfilUsuario({
          usuario: userId
        });

        return perfilUsuario.save();
      })
      .then(perfilUsuario => {
        req.perfilUsuario = perfilUsuario;
        next();
      })
      .catch(next);
  },
  get(req, res) {
    req.perfilUsuario
      .populate("usuario")
      .execPopulate()
      .then(perfilUsuario => {
        res.send(perfilUsuario);
      });
  },
  update(req, res, next) {
    Object.assign(req.perfilUsuario, req.body);

    return req.perfilUsuario
      .save()
      .then(perfilUsuario => {
        res.send(perfilUsuario);
      })
      .catch(next);
  }
};
