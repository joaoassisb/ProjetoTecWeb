angular
  .module("app")
  .config($routeProvider => {
    $routeProvider
      .when("/admin/alimentos/", {
        template: "<alimentos-admin>"
      })
      .when("/admin/alimentos/:id", {
        template: "<editar-alimento-admin>"
      })
      .when("/admin/novo-alimento", {
        template: "<editar-alimento-admin>"
      });
  })
  .component("alimentosAdmin", {
    templateUrl: "alimentos-admin.html",
    controller($http, $filter, $location) {
      this.$onInit = () => {
        this.isAdmin = true;
      };
      this.query = () => {
        return $http.get("/api/alimentos");
      };

      this.excluir = alimentoId => {
        return $http.delete(`/api/alimentos/${alimentoId}`);
      };
    }
  });
