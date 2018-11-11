"use strict";

import "./app.module";
import "./login/auth";
import "./cadastro/cadastro";
import "./home/home";
import "./componentes/navbar";
import "./componentes/loader";
import "./perfil-usuario/perfil-usuario";
import "./resultados/resultados";
import "./refeicoes-diarias/refeicoes-diarias";

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
