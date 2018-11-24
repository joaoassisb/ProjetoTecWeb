angular.module("app").component("novoAlimento", {
  templateUrl: "novo-alimento.html",
  controller($http, $location) {
    this.$onInit = () => {
      this.categorias = [
        "Cereais e derivados",
        "Verduras, hortaliças e derivados",
        "Frutas e derivados",
        "Gorduras e óleos",
        "Pescados e frutos do mar",
        "Carnes e derivados",
        "Leite e derivados",
        "Bebidas(alcoólicas e não alcoólicas)",
        "Ovos e derivados",
        "Produtos açucarados",
        "Outros alimentos industrializados",
        "Alimentos preparados",
        "Leguminosas e derivados",
        "Nozes e sementes"
      ];
    };

    this.salvar = () => {
      $http.post("/api/alimentos", this.alimento).then(({ _id }) => {
        $location.path(`/alimentos/${_id}`);
      });
    };
  }
});
