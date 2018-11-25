angular.module("app").component("usuarios", {
  templateUrl: "usuarios.html",
  controller($http, $location) {
    this.$onInit = () => {
      this.query();
    };

    this.query = () => {
      this.isLoading = true;
      $http.get("/api/usuarios").then(({ data }) => {
        this.usuarios = data;
        this.isLoading = false;
      });
    };

    this.exibirUsuario = usuarioId => {
      $location.path(`/admin/usuarios/${usuarioId}`);
    };

    this.removerUsuario = usuarioId => {
      this.isLoading = true;
      $http.delete(`/api/usuarios/${usuarioId}`).then(() => {
        this.query();
      });
    };
  }
});
