"use strict";

import "./app.module";
import "./login/auth";
import "./cadastro/cadastro";
import "./home/home";
import "./componentes/navbar";
import "./componentes/loader";
import "./componentes/infos-alimento";
import "./componentes/tabela-alimentos";
import "./componentes/navbar-admin";
import "./perfil-usuario/perfil-usuario";
import "./resultados/resultados";
import "./refeicoes-diarias/refeicoes-diarias";
import "./alimentos/alimentos";
import "./admin/home-admin";

const m = angular.module("app");

m.config($routeProvider => {
  $routeProvider.when("/", {
    template: "<login>"
  });
});

m.run([
  "$locale",
  function($locale) {
    $locale.NUMBER_FORMATS.GROUP_SEP = ".";
    $locale.NUMBER_FORMATS.DECIMAL_SEP = ",";
  }
]);
