"use strict";

import "./app.module";
import "./login/auth";
import "./cadastro/cadastro";
import "./home/home";
import "./home/navbar";
import "./perfil-usuario/perfil-usuario";

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
