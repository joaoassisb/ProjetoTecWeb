"use strict";

import "./app.module";
import "./login/login";

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
