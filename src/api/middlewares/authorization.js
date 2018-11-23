"use strict";

const createError = require("http-errors");

const Autho = {
  requiresLocalLogin(req, res, next) {
    if (!req.isAuthenticated()) {
      return next(
        createError(
          401,
          "Somente usuários registrados podem acessar este conteúdo."
        )
      );
    }

    next();
  }
};

module.exports = Autho;
