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
      })
      .when("/alimentos", {
        template: "<alimentos>"
      })
      .when("/meus-alimentos", {
        template: "<meus-alimentos>"
      });
  })
  .component("navbar", {
    templateUrl: "navbar.html",
    controller($location, Auth) {
      this.$onInit = () => {
        Auth.getSession().then(({ _id }) => {
          this.userId = _id;
        });
      };

      this.navegar = componentName => {
        $location.path(componentName);
      };
    }
  });
