angular
  .module("app")
  .config($routeProvider => {
    $routeProvider.when("/refeicoes/:refeicaoId/alimentos/:alimentoId", {
      template: "<editar-alimento-refeicao>"
    });
  })
  .component("editarAlimentoRefeicao", {
    templateUrl: "editar-alimento-refeicao.html",
    controller($http, $routeParams, $location) {
      this.$onInit = () => {
        this.isLoading = true;
        this.query();
      };

      this.query = () => {
        return $http
          .get(
            `/api/refeicoes/${$routeParams.refeicaoId}/alimentos/${
              $routeParams.alimentoId
            }`
          )
          .then(({ data }) => {
            this.alimento = data;
            this.isLoading = false;
          });
      };

      this.salvar = () => {
        this.isLoading = true;
        $http
          .post(
            `/api/refeicoes/${$routeParams.refeicaoId}/alimentos/${
              $routeParams.alimentoId
            }`,
            this.alimento
          )
          .then(() => {
            this.voltar();
          });
      };

      this.voltar = () => {
        $location.path("/refeicoes");
      };
    }
  });
