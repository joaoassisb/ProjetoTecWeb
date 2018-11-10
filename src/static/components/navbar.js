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
