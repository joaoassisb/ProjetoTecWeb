angular
  .module("app")
  .config($routeProvider => {
    $routeProvider.when("/resultados", {
      template: "<resultados>"
    });
  })
  .component("resultados", {
    templateUrl: "resultados.html",
    controller($http) {
      this.$onInit = () => {
        this.query();

        this.descricoes = {
          imc: false,
          taxaMetabolicaBasal: false,
          exigenciaAgua: false,
          gorduraCorporal: false
        };
      };

      this.query = () => {
        this.isLoading = true;
        $http.get("/api/resultados-usuario").then(({ data }) => {
          this.resultados = data;
          this.isLoading = false;
        });
      };

      this.exibirDescricao = atributo => {
        this.descricoes[atributo] = !this.descricoes[atributo];
      };

      this.linhasIMC = [
        {
          resultado: "Abaixo de 17",
          situacao: "Muito abaixo do peso"
        },
        {
          resultado: "Entre 17 e 18,49",
          situacao: "Abaixo do peso"
        },
        {
          resultado: "Entre 18,5 e 24,99",
          situacao: "Peso normal"
        },
        {
          resultado: "Entre 25 e 29,99",
          situacao: "Acima do peso"
        },
        {
          resultado: "Entre 30 e 34,99",
          situacao: "Obesidade I"
        },
        {
          resultado: "Entre 35 e 39,99",
          situacao: "Obesidade II (severa)"
        },
        {
          resultado: "Acima de 40",
          situacao: "Obesidade III (mórbida)"
        }
      ];

      this.linhasGorduraCorporal = [
        {
          resultadoHomem: "Abaixo de 6%",
          resultadoMulher: "Abaixo de 14%",
          situacao: "Gordura essencial"
        },
        {
          resultadoHomem: "Entre 6-13%",
          resultadoMulher: "Entre 14-21%",
          situacao: "Atleta"
        },
        {
          resultadoHomem: "Entre 13-17%",
          resultadoMulher: "Entre 21-25%",
          situacao: "Saudável"
        },
        {
          resultadoHomem: "Entre 17-22%",
          resultadoMulher: "Entre 25-31%",
          situacao: "Aceitável"
        },
        {
          resultadoHomem: "Entre 22-30%",
          resultadoMulher: "Entre 31-40%",
          situacao: "Acima do peso"
        },
        {
          resultadoHomem: "Acima de 30%",
          resultadoMulher: "Acima de 40%",
          situacao: "Obeso"
        }
      ];

      this.calcularGorduraCorporal = event => {
        event.preventDefault();
        event.stopPropagation();
        $http
          .post("/api/resultados-usuario/gordura-corporal", this.resultados)
          .then(resultado => {
            this.query();
          });
      };
    }
  });
