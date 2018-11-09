angular
  .module("app")
  .config($routeProvider => {
    $routeProvider.when("/cadastro", {
      template: "<cadastro>"
    });
  })
  .component("cadastro", {
    templateUrl: "cadastro.html",
    controller() {
      this.$onInit = () => {
        console.log("Teste");
      };
    }
  });
