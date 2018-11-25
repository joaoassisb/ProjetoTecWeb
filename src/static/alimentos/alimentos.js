import "./alimento";
import "./editar-alimento";
import "./alimentos-usuario";

angular
  .module("app")
  .config($routeProvider => {
    $routeProvider
      .when("/alimentos/:alimentoId", {
        template: "<alimento>"
      })
      .when("/novo-alimento", {
        template: "<editar-alimento>"
      });
  })
  .component("alimentos", {
    templateUrl: "alimentos.html",
    controller($http, $filter, $location) {
      this.query = () => {
        return $http.get("/api/alimentos");
      };
    }
  });
