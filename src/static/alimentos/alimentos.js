import "./alimento";
import "./novo-alimento";

angular
  .module("app")
  .config($routeProvider => {
    $routeProvider
      .when("/alimentos", {
        template: "<alimentos>"
      })
      .when("/alimentos/:alimentoId", {
        template: "<alimento>"
      })
      .when("/novo-alimento", {
        template: "<novo-alimento>"
      });
  })
  .component("alimentos", {
    templateUrl: "alimentos.html",
    controller($http, $filter, $location) {
      this.$onInit = () => {
        this.query();
      };

      this.query = () => {
        this.isLoading = true;
        $http.get("/api/alimentos").then(({ data }) => {
          this.alimentos = data;
          this.isLoading = false;
          this.atualizarFiltros();
        });
      };

      this.atualizarFiltros = () => {
        this.alimentosFiltrados = $filter("filter")(this.alimentos, {
          description: this.searchText || undefined,
          category: this.searchText || undefined
        });
      };

      this.novoAlimento = () => {
        $location.path("/novo-alimento");
      };
    }
  });
