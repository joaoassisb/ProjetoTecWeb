angular.module("app").config($routeProvider => {
  $routeProvider.when("/home", {
    template: "<perfil-usuario>"
  });
});
