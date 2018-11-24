angular.module("app").component("novoAlimento", {
  templateUrl: "novo-alimento.html",
  controller() {
    this.$onInit = () => {
      console.log("teste");
    };
  }
});
