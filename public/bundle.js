(function () {
  'use strict';

  angular.module("app", ["ngRoute"]);

  angular.module("app").directive("logout", (Auth, $location) => ({
    restrict: "A",
    controller($element) {
      $element.bind("click", () => {
        Auth.logout().then(() => {
          $location.path("login");
        });
      });
    }
  }));

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
          Auth.login(this.usuario).then(
            () => {
              $location.path("/home");
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

  const m = angular.module("app");

  m.config($httpProvider => {
    $httpProvider.interceptors.push(($q, $location) => ({
      responseError(response) {
        if (response.status === 401) {
          $location.path("login");
        }

        return $q.reject(response);
      }
    }));
  });

  m.service("Auth", AuthService);

  function AuthService($http) {
    const observers = [];

    const notify = value => {
      observers.forEach(observer => {
        observer(value);
      });
    };

    this.login = credenciais =>
      $http.post("/api/session", credenciais).then(
        ({ data }) => {
          notify(true);

          return data;
        },
        err => {
          notify(false);
          throw err;
        }
      );

    this.logout = () =>
      $http.delete("/api/session").then(({ data }) => {
        notify(false);

        return data;
      });

    this.getSession = () =>
      $http.get("/api/session").then(
        ({ data }) => {
          notify(true);

          return data;
        },
        err => {
          notify(false);
          throw err;
        }
      );

    this.subscribe = observer => {
      observers.push(observer);

      return () => {
        const index = observers.find(observer);

        observers.splice(index, 1);
      };
    };
  }

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

  angular
    .module("app")
    .config($routeProvider => {
      $routeProvider.when("/home", {
        template: "<home>"
      });
    })
    .component("home", {
      templateUrl: "home.html",
      controller() {}
    });

  angular
    .module("app")
    .config($routeProvider => {
      $routeProvider
        .when("/perfil", {
          template: "<perfil>"
        })
        .when("/resultados", {
          template: "<resultados>"
        })
        .when("/refeicoes", {
          template: "<refeicoes>"
        });
    })
    .component("navbar", {
      templateUrl: "navbar.html",
      controller($location) {
        this.navegar = componentName => {
          $location.path(componentName);
        };
      }
    });

  const m$1 = angular.module("app");

  m$1.config($routeProvider => {
    $routeProvider
      .when("/login", {
        template: "<login>"
      })
      .otherwise({
        redirectTo: "login"
      });
  });

}());
