(function () {
  'use strict';

  angular.module("app", ["ngRoute"]);

  const m = angular.module("app");

  m.component("login", {
    templateUrl: "login.html",
    controller() {}
  });

  const m$1 = angular.module("app");

  m$1.config($routeProvider => {
    $routeProvider
      .when("/login", {
        template: "<login>"
      })
      .otherwise({
        redirectTo: "login"
      });
  });

}());
