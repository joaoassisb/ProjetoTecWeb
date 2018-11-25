angular
  .module("app")
  .config($routeProvider => {
    $routeProvider.when("/refeicoes", {
      template: "<refeicoes>"
    });
  })
  .component("refeicoes", {
    templateUrl: "refeicoes.html",
    controller($http) {
      this.$onInit = () => {
        this.query();
      };

      this.query = () => {
        this.isLoading = true;
        $http.get("/api/refeicoes").then(({ data }) => {
          this.isLoading = false;
          this.refeicoes = data;
          console.log(this.refeicoes);
        });
      };
    }
  });
