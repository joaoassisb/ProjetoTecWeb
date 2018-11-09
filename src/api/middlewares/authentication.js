"use strict";

const _ = require("lodash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const createError = require("http-errors");

const autho = require("./authorization");

function setupPassport(userModelName, strategyName) {
  passport.use(
    strategyName,
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      (email, password, next) => {
        let UserModel;

        try {
          UserModel = mongoose.model(userModelName);
        } catch (e) {
          return next(e);
        }

        UserModel.findByEmailToAuth(email)
          .then(user => {
            if (!user || !user.authenticate(password)) {
              throw createError(401, "Credenciais inválidas");
            }

            if (user.blocked) {
              throw createError(403, "Usuário bloqueado");
            }

            user.userModelName = userModelName;
            next(null, user);
          })
          .catch(err => {
            next(err, false);
          });
      }
    )
  );
}

passport.serializeUser((user, next) => {
  const serialized = {
    userId: user._id,
    userModelName: user.userModelName
  };

  next(null, serialized);
});

passport.deserializeUser((key, next) => {
  let UserModel;

  try {
    UserModel = mongoose.model(key.userModelName);
  } catch (e) {
    return next(e);
  }

  UserModel.findById(key.userId)
    .then(user => {
      next(null, user);
    })
    .catch(next);
});

module.exports = function(app, options) {
  const strategyName = `local-${_.kebabCase(options.userModelName)}`;

  setupPassport(options.userModelName, strategyName);

  app.use(passport.initialize());
  app.use(passport.session());

  app.post(
    "/session",
    (req, res, next) => {
      if (!req.body.email || !req.body.password) {
        return next(createError(401, "Credenciais inválidas"));
      }

      next();
    },
    passport.authenticate(strategyName),
    (req, res, next) => {
      req.user
        .updateLoginInfo()
        .then(() => next())
        .catch(next);
    },
    (req, res) => {
      res.sendStatus(200);
    }
  );

  app.get("/session", autho.requiresLocalLogin, (req, res) => {
    res.send({
      name: req.user.name,
      email: req.user.email
    });
  });

  app.delete("/session", (req, res) => {
    req.logout();
    res.sendStatus(200);
  });
};
