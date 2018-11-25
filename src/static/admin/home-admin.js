import "./usuarios";
import "./usuario";

angular
  .module("app")
  .config($routeProvider => {
    $routeProvider.when("/home-admin", {
      template: "<home-admin>"
    });
  })
  .component("homeAdmin", {
    templateUrl: "home-admin.html",
    controller($http, $location) {}
  });
