angular
  .module("app")
  .config($routeProvider => {
    $routeProvider.when("/admin/usuarios", {
      template: "<usuarios>"
    });
    $routeProvider.when("/admin/usuarios/:id", {
      template: "<usuario>"
    });
  })
  .component("navbarAdmin", {
    templateUrl: "navbar-admin.html",
    controller($location, Auth) {
      this.navegar = componentName => {
        $location.path(componentName);
      };
    }
  });
