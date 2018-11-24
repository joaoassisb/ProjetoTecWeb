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
import "./alimentos/alimentos";

const m = angular.module("app");

m.config($routeProvider => {
  $routeProvider.when("/", {
    template: "<login>"
  });
});
