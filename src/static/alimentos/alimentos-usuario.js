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
        $http.get(`/api/alimentos-usuario`).then(({ data }) => {
          this.meusAlimentos = data;
          this.isLoading = false;
          this.atualizarFiltros();
        });
      };

      this.atualizarFiltros = () => {
        this.alimentosFiltrados = $filter("filter")(this.meusAlimentos, {
          description: this.searchText || undefined
        });
      };

      this.novoAlimento = () => {
        $location.path("/novo-alimento");
      };
    }
  });
