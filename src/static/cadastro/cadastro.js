angular
  .module("app")
  .config($routeProvider => {
    $routeProvider.when("/cadastro", {
      template: "<cadastro>"
    });
  })
  .component("cadastro", {
    templateUrl: "cadastro.html",
    controller($http, $location) {
      this.cadastrar = () => {
        $http
          .post("/api/usuarios", this.usuario)
          .then(usuario => {
            $location.path("/login");
          })
          .catch(err => {
            this.erroCadastro = true;
          });
      };
    }
  });
