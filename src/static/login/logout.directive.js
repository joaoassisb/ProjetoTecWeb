angular.module("app").directive("logout", (Auth, $location) => ({
  restrict: "A",
  controller($element) {
    $element.bind("click", () => {
      Auth.logout().then(() => {
        $location.path("login");
      });
    });
  }
}));
