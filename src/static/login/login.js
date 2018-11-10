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
        Auth.login(this.usuario).then(
          () => {
            $location.path("/home");
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
