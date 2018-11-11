angular
  .module("app")
  .config($routeProvider => {
    $routeProvider.when("/resultados", {
      template: "<resultados>"
    });
  })
  .component("resultados", {
    templateUrl: "resultados.html"
  });
