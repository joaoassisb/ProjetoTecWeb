"use strict";

const express = require("express");
const glob = require("glob");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const sessionMiddleware = require("./middlewares/session");
const authMiddleware = require("./middlewares/authentication");
const autho = require("./middlewares/authorization");

const routes = express.Router();
const session = {
  secret: "oidfsnfiuhe8r32r3244y23ryvdwqg3dewjifp322",
  resave: false,
  saveUninitialized: false
};

routes.use(bodyParser.json());
routes.use(cookieParser());

routes.use(sessionMiddleware(session));

authMiddleware(routes, {
  userModelName: "Usuario"
});

routes.use(require(`${__dirname}/usuario/usuario.routes.js`));

routes.use(autho.requiresLocalLogin);

glob.sync(`${__dirname}/**/*.routes.js`).forEach(filename => {
  routes.use(require(filename));
});

module.exports = routes;
