angular.module("app").component("editarAlimentoAdmin", {
  templateUrl: "editar-alimento-admin.html",
  controller($http, $location, $routeParams) {
    this.$onInit = () => {
      if ($routeParams.id) {
        this.ehNovo = false;
        this.query();
      } else {
        this.ehNovo = true;
      }
    };
    this.categorias = [
      "Alimentos preparados",
      "Bebidas(alcoólicas e não alcoólicas)",
      "Carnes e derivados",
      "Cereais e derivados",
      "Frutas e derivados",
      "Gorduras e óleos",
      "Leguminosas e derivados",
      "Leite e derivados",
      "Nozes e sementes",
      "Outros alimentos industrializados",
      "Ovos e derivados",
      "Pescados e frutos do mar",
      "Produtos açucarados",
      "Verduras, hortaliças e derivados"
    ];

    this.query = () => {
      this.isLoading = true;
      $http.get(`/api/alimentos/${$routeParams.id}`).then(({ data }) => {
        this.alimento = data;
        this.isLoading = false;
      });
    };

    this.salvar = () => {
      this.isLoading = true;
      $http
        .post(
          `/api/alimentos/${this.ehNovo ? "" : this.alimento._id}`,
          this.alimento
        )
        .then(() => {
          this.voltar();
        });
    };

    this.voltar = () => {
      $location.path("/admin/alimentos");
    };
  }
});
