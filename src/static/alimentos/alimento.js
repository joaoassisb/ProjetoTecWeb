angular.module("app").component("alimento", {
  templateUrl: "alimento.html",
  controller($http, $routeParams, $location, Auth) {
    this.$onInit = () => {
      this.query();
    };

    this.query = () => {
      this.isLoading = true;
      $http
        .get(`/api/alimentos/${$routeParams.alimentoId}`)
        .then(({ data }) => {
          this.alimento = data;
          this.isLoading = false;
        });
    };
  }
});
