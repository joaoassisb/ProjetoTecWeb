angular.module("app").component("alimento", {
  templateUrl: "alimento.html",
  controller($http, $routeParams, $location, Auth) {
    this.$onInit = () => {
      this.query();
      Auth.getSession().then(({ _id }) => {
        this.userId = _id;
      });
    };

    this.query = () => {
      this.isLoading = true;
      $http
        .get(`/api/alimentos/${$routeParams.alimentoId}`)
        .then(({ data }) => {
          this.alimento = data;
          this.isLoading = false;
          console.log(this.alimento);
        });
    };

    this.editar = () => {
      console.log("editar");
    };

    this.excluir = () => {
      $http.delete("/api/aliment/${this.alimento._id}").then(() => {
        $location.path("/alimentos");
      });
    };
  }
});
