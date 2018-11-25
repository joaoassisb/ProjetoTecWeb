import "./alimento-usuario";

angular
  .module("app")
  .config($routeProvider => {
    $routeProvider.when("/meus-alimentos/:id", {
      template: "<alimento-usuario>"
    });
    $routeProvider.when("/meus-alimentos/:id/editar", {
      template: "<editar-alimento>"
    });
  })
  .component("meusAlimentos", {
    templateUrl: "meus-alimentos.html",
    controller($http, $location, $filter) {
      this.$onInit = () => {
        this.isLoading = true;
        this.query();
      };

      this.query = () => {
        return $http.get(`/api/alimentos-usuario`);
      };
    }
  });
