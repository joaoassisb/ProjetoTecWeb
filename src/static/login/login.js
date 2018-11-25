angular
  .module("app")
  .config($routeProvider => {
    $routeProvider.when("/login", {
      template: "<login>"
    });
  })
  .component("login", {
    templateUrl: "login.html",
    controller(Auth, $location, $http) {
      this.reset = () => {
        this.loginInvalido = false;
      };

      this.login = () => {
        this.isLoading = true;
        Auth.login(this.usuario).then(
          usuario => {
            if (usuario.isAdmin) {
              $location.path("/home-admin");
            } else {
              $location.path("/perfil-usuario");
            }
          },
          () => {
            this.loginInvalido = true;
          }
        );
      };

      this.cadastrar = () => {
        $location.path("/cadastro");
      };
    }
  });
