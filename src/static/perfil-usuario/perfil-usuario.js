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

        this.objetivos = [
          {
            valor: "Perder peso",
            label: "Perder peso (Diminuir os requisitos calóricos em 20%)"
          },
          {
            valor: "Perder peso lentamente",
            label:
              "Perder peso lentamente (Diminuir os requisitos calóricos em 10%)"
          },
          {
            valor: "Manter o peso",
            label: "Manter o peso (Não alterar os requisitos calóricos)"
          },
          {
            valor: "Aumentar o peso lentamente",
            label:
              "Aumentar o peso lentamente (Aumentar os requisitos calóricos em 10%)"
          },
          {
            valor: "Aumentar o peso",
            label: "Aumentar o peso (Aumentar os requisitos calóricos em 20%)"
          }
        ];

        this.carregarPerfil();
      };

      this.carregarPerfil = () => {
        this.isLoading = true;
        $http.get("/api/perfil-usuario").then(({ data }) => {
          this.perfil = data;
          this.isLoading = false;
          console.log(this.perfil);
        });
      };

      this.salvar = () => {
        this.isLoading = true;
        console.log(this.perfil);
        $http.post("/api/perfil-usuario", this.perfil).then(() => {
          this.fecharEdicao();
          this.isLoading = false;
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
