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
          this.getFaixaIMC();
        });
      };

      this.exibirDescricao = atributo => {
        this.descricoes[atributo] = !this.descricoes[atributo];
      };

      this.getFaixaIMC = () => {
        if (this.resultados.imc <= 17) {
          this.faixaIMC = 0;
        } else if (this.resultados.imc <= 18.49) {
          this.faixaIMC = 1;
        } else if (this.resultados.imc <= 24.99) {
          this.faixaIMC = 2;
        } else if (this.resultados.imc <= 29.99) {
          this.faixaIMC = 3;
        } else if (this.resultados.imc <= 34.99) {
          this.faixaIMC = 4;
        } else if (this.resultados.imc >= 40) {
          this.faixaIMC = 5;
        }
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
