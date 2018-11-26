import "./usuarios";
import "./usuario";
import "./alimentos";
import "./editar-alimento";

angular.module("app").config($routeProvider => {
  $routeProvider.when("/home-admin", {
    template: "<usuarios>"
  });
});
