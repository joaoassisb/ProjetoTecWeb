"use strict";

const _ = require("lodash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook");
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
  passport.use(
    "facebook",
    new FacebookStrategy(
      {
        clientID: "984255598439076",
        clientSecret: "d80a8ad8c44abc202f8b3ba659b3e21b",
        callbackURL:
          "https://projetowebsaude.azurewebsites.net/api/login/facebook/callback",
        profileFields: ["id", "email", "displayName"]
      },
      (accessToken, refreshToken, profile, done) => {
        const userModelName = "Usuario";
        const UserModel = mongoose.model("Usuario");

        UserModel.findOne(
          { "social.facebook": profile.id, email: profile.emails[0].value },
          (err, user) => {
            if (err) {
              return done(err);
            }

            if (user) {
              //usuario com email cadastrado, atulizar atributo de facebook
              if (!user.social.facebook) {
                console.log("usuario com email cadastrado");
                user.social.facebook = profile.id;
                return user.save().then(() => {
                  return done(null, user);
                });
              }
              //usuario com facebook ja cadastrado, retornar validação
              return done(null, user);
            }

            const novoUsuario = new UserModel({
              name: profile.displayName,
              social: {
                facebook: profile.id
              },
              email: profile.emails[0].value
            });

            return novoUsuario.save((err, novoUsuario) => {
              if (err) {
                done(err);
              }

              return done(null, novoUsuario);
            });
          }
        );
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
  let UserModel = mongoose.model("Usuario");

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

  app.get(
    "/login/facebook",
    passport.authenticate("facebook", {
      scope: ["email"]
    })
  );

  app.get(
    "/login/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/#!/login" }),
    (req, res) => {
      res.redirect("/#!/home");
    }
  );

  app.get("/session", autho.requiresLocalLogin, (req, res) => {
    res.send({
      name: req.user.name,
      email: req.user.email,
      id: req.user._id
    });
  });

  app.delete("/session", (req, res) => {
    req.logout();
    res.sendStatus(200);
  });
};
