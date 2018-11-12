"use strict";

const ResultadolUsuario = require("./resultados-usuario.model");
const PerfilUsuario = require("../perfil-usuario/perfil-usuario.model");

module.exports = {
  loadOrCreate(req, res, next) {
    const userId = req.user._id;

    Promise.all([
      ResultadolUsuario.findOne({ usuario: userId }).exec(),
      PerfilUsuario.findOne({ usuario: userId }).exec()
    ])
      .then(([resultados, perfilUsuario]) => {
        if (resultados) {
          return resultados;
        }

        const resultadoUsuario = new ResultadolUsuario({
          usuario: userId,
          perfilUsuario: perfilUsuario
        });

        return resultadoUsuario.save();
      })
      .then(resultadoUsuario => {
        req.resultadoUsuario = resultadoUsuario;
        next();
      })
      .catch(next);
  },
  get(req, res) {
    const { resultadoUsuario } = req;

    resultadoUsuario
      .populate("usuario perfilUsuario")
      .execPopulate()
      .then(resultadoUsuario => {
        resultadoUsuario.calcular();
      })
      .then(() => {
        res.send(resultadoUsuario);
      });
  },
  update(req, res, next) {
    console.log(req.body);
    Object.assign(req.resultadoUsuario, req.body);

    return req.resultadoUsuario
      .save()
      .then(resultadoUsuario => {
        res.send(resultadoUsuario);
      })
      .catch(next);
  }
};
