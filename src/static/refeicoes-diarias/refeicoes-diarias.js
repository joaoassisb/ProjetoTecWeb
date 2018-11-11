angular
  .module("app")
  .config($routeProvider => {
    $routeProvider.when("/refeicoes", {
      template: "<refeicoes>"
    });
  })
  .component("refeicoes", {
    templateUrl: "refeicoes.html",
    controller() {}
  });
