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
