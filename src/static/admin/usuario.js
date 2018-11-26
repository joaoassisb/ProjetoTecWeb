angular.module("app").component("usuario", {
  templateUrl: "usuario.html",
  controller($http, $location, $routeParams) {
    this.$onInit = () => {
      this.query();
    };

    this.query = () => {
      this.isLoading = true;
      $http.get(`/api/usuarios/${$routeParams.id}`).then(({ data }) => {
        this.usuario = data;
        this.isLoading = false;
      });
    };

    this.voltar = () => {
      $location.path("/admin/usuarios");
    };

    this.tornarAdmin = () => {
      this.isLoading = true;
      $http
        .post(`/api/usuarios/${this.usuario._id}`, {
          isAdmin: true
        })
        .then(() => {
          this.query();
        });
    };
  }
});
