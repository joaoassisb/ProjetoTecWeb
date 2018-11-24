angular.module("app").component("alimentoUsuario", {
  templateUrl: "alimento-usuario.html",
  controller($http, $routeParams, $location) {
    this.$onInit = () => {
      this.query();
    };

    this.query = () => {
      this.isLoading = true;
      $http
        .get(`/api/alimentos-usuario/${$routeParams.id}`)
        .then(({ data }) => {
          this.alimento = data;
          this.isLoading = false;
        });
    };

    this.editar = () => {
      $location.path(`/meus-alimentos/${this.alimento._id}/editar`);
    };

    this.excluir = () => {
      $http.delete(`/api/alimentos-usuario/${this.alimento._id}`).then(() => {
        $location.path("/meus-alimentos");
      });
    };
  }
});
