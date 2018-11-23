angular
  .module("app")
  .config($routeProvider => {
    $routeProvider.when("/alimentos", {
      template: "<alimentos>"
    });
  })
  .component("alimentos", {
    templateUrl: "alimentos.html",
    controller($http) {
      this.$onInit = () => {
        this.query();
      };

      this.query = () => {
        this.isLoading = true;
        $http.get("/api/alimentos").then(({ data }) => {
          this.alimentos = data;
          this.isLoading = false;
          console.log(this.alimentos[0]);
        });
      };
    }
  });
