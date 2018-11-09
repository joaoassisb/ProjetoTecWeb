"use strict";

import "./app.module";
import "./login/auth";
import "./cadastro/cadastro";

const m = angular.module("app");

m.config($routeProvider => {
  $routeProvider
    .when("/login", {
      template: "<login>"
    })
    .otherwise({
      redirectTo: "login"
    });
});
