import "./editar-alimento-refeicao";

angular
  .module("app")
  .config($routeProvider => {
    $routeProvider.when("/refeicoes", {
      template: "<refeicoes>"
    });
  })
  .component("refeicoes", {
    templateUrl: "refeicoes.html",
    controller($http, $location) {
      this.$onInit = () => {
        this.query();
      };

      this.query = () => {
        this.isLoading = true;
        $http.get("/api/refeicoes").then(({ data }) => {
          this.isLoading = false;
          this.refeicoes = data;
        });
      };

      this.excluir = (refeicaoId, alimentoId) => {
        this.isLoading = true;
        $http
          .delete(`/api/refeicoes/${refeicaoId}/alimentos/${alimentoId}`)
          .then(() => {
            this.query();
          });
      };

      this.editar = (refeicaoId, alimentoId) => {
        $location.path(`/refeicoes/${refeicaoId}/alimentos/${alimentoId}`);
      };
    }
  });
