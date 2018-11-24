"use strict";

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

module.exports = function(options) {
  return session({
    name: options.name,
    secret: options.secret,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: options.collection,
      touchAfter: 24 * 3600
    }),
    cookie: {}
  });
};
