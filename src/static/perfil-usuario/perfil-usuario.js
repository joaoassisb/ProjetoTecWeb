angular
  .module("app")
  .config($routeProvider => {
    $routeProvider.when("/perfil-usuario", {
      template: "<perfil-usuario>"
    });
  })
  .component("perfilUsuario", {
    templateUrl: "perfil-usuario.html",
    controller($http, $httpParamSerializer, Auth) {
      this.$onInit = () => {
        this.modoEdicao = false;
        this.generos = ["Feminino", "Masculino"];

        this.niveis = [
          {
            label: "Sedentário (Nenhum exercício por semana)",
            valor: "Sedentário"
          },
          {
            label:
              "Ligeiramente ativo (Exercícios físicos de 1 a 3 vezes por semana)",
            valor: "Ligeiramente ativo"
          },
          {
            label:
              "Moderadamento ativo (Exercícios físicos de 3 a 5 vezes por semana)",
            valor: "Moderadamento ativo"
          },
          {
            label: "Ativo (Exercícios físicos de 6 a 7 vezes por semana)",
            valor: "Ativo"
          },
          {
            label:
              "Hiperativo (Exercícios físicos muito intensos, 2 horas ou mais )",
            valor: "Hiperativo"
          }
        ];

        this.carregarPerfil();
      };

      this.carregarPerfil = () => {
        this.isLoading = true;
        $http.get("/api/perfil-usuario").then(({ data }) => {
          this.perfil = data;
          this.isLoading = false;
        });
      };

      this.salvar = () => {
        console.log(this.perfil);
        $http.post("/api/perfil-usuario", this.perfil).then(() => {
          this.fecharEdicao();
        });
      };

      this.fecharEdicao = () => {
        this.modoEdicao = false;
      };

      this.editar = () => {
        this.modoEdicao = true;
      };
    }
  });
