angular
  .module("app")
  .config($routeProvider => {
    $routeProvider.when("/login", {
      template: "<login>"
    });
  })
  .component("login", {
    templateUrl: "login.html",
    controller(Auth, $location) {
      this.reset = () => {
        this.loginInvalido = false;
      };

      this.login = () => {
        Auth.login(this.credenciais).then(
          () => {
            $location.path("/");
          },
          () => {
            this.loginInvalido = true;
          }
        );
      };

      this.loginFacebook = () => {
        console.log("FACEBOOK");
      };

      this.cadastrar = () => {
        $location.path("/cadastro");
      };
    }
  });
