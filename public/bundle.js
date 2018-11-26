(function () {
  'use strict';

  angular.module("app", ["ngRoute"]);

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

  angular
    .module("app")
    .config($routeProvider => {
      $routeProvider.when("/login", {
        template: "<login>"
      });
    })
    .component("login", {
      templateUrl: "login.html",
      controller(Auth, $location, $http) {
        this.reset = () => {
          this.loginInvalido = false;
        };

        this.login = () => {
          this.isLoading = true;
          Auth.login(this.usuario).then(
            usuario => {
              if (usuario.isAdmin) {
                $location.path("/home-admin");
              } else {
                $location.path("/perfil-usuario");
              }
            },
            () => {
              this.loginInvalido = true;
            }
          );
        };

        this.cadastrar = () => {
          $location.path("/cadastro");
        };
      }
    });

  const m = angular.module("app");

  m.config($httpProvider => {
    $httpProvider.interceptors.push(($q, $location) => ({
      responseError(response) {
        if (response.status === 401) {
          $location.path("login");
        }

        return $q.reject(response);
      }
    }));
  });

  m.service("Auth", AuthService);

  function AuthService($http, $httpParamSerializer) {
    const observers = [];

    const notify = value => {
      observers.forEach(observer => {
        observer(value);
      });
    };

    this.login = credenciais =>
      $http.post("/api/session", credenciais).then(
        ({ data }) => {
          notify(true);

          return data;
        },
        err => {
          notify(false);
          throw err;
        }
      );

    this.logout = () =>
      $http.delete("/api/session").then(({ data }) => {
        notify(false);

        return data;
      });

    this.getSession = () =>
      $http.get("/api/session").then(
        ({ data }) => {
          notify(true);

          return data;
        },
        err => {
          notify(false);
          throw err;
        }
      );

    this.subscribe = observer => {
      observers.push(observer);

      return () => {
        const index = observers.find(observer);

        observers.splice(index, 1);
      };
    };
  }

  angular
    .module("app")
    .config($routeProvider => {
      $routeProvider.when("/cadastro", {
        template: "<cadastro>"
      });
    })
    .component("cadastro", {
      templateUrl: "cadastro.html",
      controller($http, $location) {
        this.cadastrar = () => {
          $http
            .post("/api/usuarios", this.usuario)
            .then(usuario => {
              $location.path("/login");
            })
            .catch(err => {
              this.erroCadastro = true;
            });
        };
      }
    });

  angular
    .module("app")
    .config($routeProvider => {
      $routeProvider.when("/home", {
        template: "<home>"
      });
    })
    .component("home", {
      templateUrl: "home.html",
      controller() {}
    });

  angular
    .module("app")
    .config($routeProvider => {
      $routeProvider
        .when("/perfil", {
          template: "<perfil>"
        })
        .when("/resultados", {
          template: "<resultados>"
        })
        .when("/refeicoes", {
          template: "<refeicoes>"
        })
        .when("/alimentos", {
          template: "<alimentos>"
        })
        .when("/meus-alimentos", {
          template: "<meus-alimentos>"
        });
    })
    .component("navbar", {
      templateUrl: "navbar.html",
      controller($location, Auth) {
        this.$onInit = () => {
          Auth.getSession().then(({ _id }) => {
            this.userId = _id;
          });
        };

        this.navegar = componentName => {
          $location.path(componentName);
        };
      }
    });

  angular.module("app").component("loader", {
    templateUrl: "loader.html"
  });

  angular.module("app").component("infosAlimento", {
    templateUrl: "infos-alimento.html",
    bindings: {
      alimento: "<"
    }
  });

  angular.module("app").component("tabelaAlimentos", {
    templateUrl: "tabela-alimentos.html",
    bindings: {
      query: "&",
      titulo: "<",
      isAdmin: "<",
      excluirAlimento: "&",
      shouldUpdate: "<"
    },
    controller($filter, $location, $http) {
      this.$onInit = () => {
        this.isLoading = true;
        this.queryRefeicoes();
        this.getData();
      };

      this.getData = () => {
        this.query().then(({ data }) => {
          this.isLoading = false;
          this.alimentos = data;
          this.atualizarFiltros();
        });
      };

      this.queryRefeicoes = () => {
        this.isLoadingRefeicoes = true;
        $http.get("/api/refeicoes").then(({ data }) => {
          this.refeicoes = data;
          this.isLoadingRefeicoes = false;
        });
      };

      this.atualizarFiltros = () => {
        this.alimentosFiltrados = $filter("filter")(this.alimentos, {
          description: this.searchText || undefined
        });
      };

      this.novoAlimento = () => {
        console.log(this.isAdmin);
        if (this.isAdmin) {
          $location.path("/admin/novo-alimento");
        } else {
          $location.path("/novo-alimento");
        }
      };

      this.exibirAlimento = id => {
        if (this.isAdmin) {
          $location.path(`/admin/alimentos/${id}`);
        } else if (this.titulo === "Alimentos") {
          $location.path(`/alimentos/${id}`);
        } else {
          $location.path(`/meus-alimentos/${id}`);
        }
      };

      this.adicionarAlimento = alimento => {
        const alimentoRefeicao = {
          alimento,
          nomeModelo:
            this.titulo === "Alimentos" ? "Alimento" : "AlimentoUsuario",
          quantidade: this.quantidadeAlimento,
          totalCalorias: this.quantidadeAlimento * (alimento.energy_kcal / 100),
          totalProteinas: this.quantidadeAlimento * (alimento.protein_g / 100),
          totalCarboidratos:
            this.quantidadeAlimento * (alimento.carbohydrate_g / 100),
          totalLipidios: this.quantidadeAlimento * (alimento.lipidius_g / 100)
        };

        $http.post(
          `/api/refeicoes/${this.refeicao._id}/alimentos`,
          alimentoRefeicao
        );
      };

      this.excluir = id => {
        this.isLoading = true;
        this.excluirAlimento({ alimentoId: id }).then(() => {
          this.getData();
        });
      };
    }
  });

  angular
    .module("app")
    .config($routeProvider => {
      $routeProvider.when("/admin/usuarios", {
        template: "<usuarios>"
      });
      $routeProvider.when("/admin/usuarios/:id", {
        template: "<usuario>"
      });
    })
    .component("navbarAdmin", {
      templateUrl: "navbar-admin.html",
      controller($location, Auth) {
        this.navegar = componentName => {
          $location.path(componentName);
        };
      }
    });

  angular
    .module("app")
    .config($routeProvider => {
      $routeProvider.when("/perfil-usuario", {
        template: "<perfil-usuario>"
      });
    })
    .component("perfilUsuario", {
      templateUrl: "perfil-usuario.html",
      controller($http) {
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
          });
        };

        this.salvar = () => {
          this.isLoading = true;
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

  angular
    .module("app")
    .config($routeProvider => {
      $routeProvider.when("/refeicoes/:refeicaoId/alimentos/:alimentoId", {
        template: "<editar-alimento-refeicao>"
      });
    })
    .component("editarAlimentoRefeicao", {
      templateUrl: "editar-alimento-refeicao.html",
      controller($http, $routeParams, $location) {
        this.$onInit = () => {
          this.isLoading = true;
          this.query();
        };

        this.query = () => {
          return $http
            .get(
              `/api/refeicoes/${$routeParams.refeicaoId}/alimentos/${
              $routeParams.alimentoId
            }`
            )
            .then(({ data }) => {
              this.alimento = data;
              this.isLoading = false;
            });
        };

        this.salvar = () => {
          this.isLoading = true;
          $http
            .post(
              `/api/refeicoes/${$routeParams.refeicaoId}/alimentos/${
              $routeParams.alimentoId
            }`,
              this.alimento
            )
            .then(() => {
              this.voltar();
            });
        };

        this.voltar = () => {
          $location.path("/refeicoes");
        };
      }
    });

  angular
    .module("app")
    .config($routeProvider => {
      $routeProvider.when("/refeicoes", {
        template: "<refeicoes>"
      });
    })
    .component("refeicoes", {
      templateUrl: "refeicoes.html",
      controller($http, $location) {
        this.$onInit = () => {
          this.query();
        };

        this.query = () => {
          this.isLoading = true;
          $http.get("/api/refeicoes").then(({ data }) => {
            this.isLoading = false;
            this.refeicoes = data;
          });
        };

        this.excluir = (refeicaoId, alimentoId) => {
          this.isLoading = true;
          $http
            .delete(`/api/refeicoes/${refeicaoId}/alimentos/${alimentoId}`)
            .then(() => {
              this.query();
            });
        };

        this.editar = (refeicaoId, alimentoId) => {
          $location.path(`/refeicoes/${refeicaoId}/alimentos/${alimentoId}`);
        };
      }
    });

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

  angular.module("app").component("editarAlimento", {
    templateUrl: "editar-alimento.html",
    controller($http, $location, $routeParams) {
      this.$onInit = () => {
        if ($routeParams.id) {
          this.ehNovo = false;
          this.query();
        } else {
          this.ehNovo = true;
        }
      };
      this.categorias = [
        "Alimentos preparados",
        "Bebidas(alcoólicas e não alcoólicas)",
        "Carnes e derivados",
        "Cereais e derivados",
        "Frutas e derivados",
        "Gorduras e óleos",
        "Leguminosas e derivados",
        "Leite e derivados",
        "Nozes e sementes",
        "Outros alimentos industrializados",
        "Ovos e derivados",
        "Pescados e frutos do mar",
        "Produtos açucarados",
        "Verduras, hortaliças e derivados"
      ];

      this.query = () => {
        this.isLoading = true;
        $http
          .get(`/api/alimentos-usuario/${$routeParams.id}`)
          .then(({ data }) => {
            this.alimento = data;
            this.isLoading = false;
          });
      };

      this.salvar = () => {
        $http
          .post(
            `/api/alimentos-usuario/${this.ehNovo ? "" : this.alimento._id}`,
            this.alimento
          )
          .then(() => {
            this.voltar();
          });
      };

      this.voltar = () => {
        if (this.ehNovo) {
          $location.path("/meus-alimentos");
        } else {
          $location.path(`/meus-alimentos/${this.alimento._id}`);
        }
      };
    }
  });

  angular.module("app").component("alimentoUsuario", {
    templateUrl: "alimento-usuario.html",
    controller($http, $routeParams, $location) {
      this.$onInit = () => {
        this.query();
      };

      this.query = () => {
        this.isLoading = true;
        $http
          .get(`/api/alimentos-usuario/${$routeParams.id}`)
          .then(({ data }) => {
            this.alimento = data;
            this.isLoading = false;
          });
      };

      this.editar = () => {
        $location.path(`/meus-alimentos/${this.alimento._id}/editar`);
      };

      this.excluir = () => {
        $http.delete(`/api/alimentos-usuario/${this.alimento._id}`).then(() => {
          $location.path("/meus-alimentos");
        });
      };
    }
  });

  angular
    .module("app")
    .config($routeProvider => {
      $routeProvider.when("/meus-alimentos/:id", {
        template: "<alimento-usuario>"
      });
      $routeProvider.when("/meus-alimentos/:id/editar", {
        template: "<editar-alimento>"
      });
    })
    .component("meusAlimentos", {
      templateUrl: "meus-alimentos.html",
      controller($http, $location, $filter) {
        this.$onInit = () => {
          this.isLoading = true;
          this.query();
        };

        this.query = () => {
          return $http.get(`/api/alimentos-usuario`);
        };
      }
    });

  angular
    .module("app")
    .config($routeProvider => {
      $routeProvider
        .when("/alimentos/:alimentoId", {
          template: "<alimento>"
        })
        .when("/novo-alimento", {
          template: "<editar-alimento>"
        });
    })
    .component("alimentos", {
      templateUrl: "alimentos.html",
      controller($http, $filter, $location) {
        this.query = () => {
          return $http.get("/api/alimentos");
        };
      }
    });

  angular.module("app").component("usuarios", {
    templateUrl: "usuarios.html",
    controller($http, $location) {
      this.$onInit = () => {
        this.query();
      };

      this.query = () => {
        this.isLoading = true;
        $http.get("/api/usuarios").then(({ data }) => {
          this.usuarios = data;
          this.isLoading = false;
        });
      };

      this.exibirUsuario = usuarioId => {
        $location.path(`/admin/usuarios/${usuarioId}`);
      };

      this.removerUsuario = usuarioId => {
        this.isLoading = true;
        $http.delete(`/api/usuarios/${usuarioId}`).then(() => {
          this.query();
        });
      };
    }
  });

  angular.module("app").component("usuario", {
    templateUrl: "usuario.html",
    controller($http, $location, $routeParams) {
      this.$onInit = () => {
        this.query();
      };

      this.query = () => {
        this.isLoading = true;
        $http.get(`/api/usuarios/${$routeParams.id}`).then(({ data }) => {
          this.usuario = data;
          this.isLoading = false;
        });
      };

      this.voltar = () => {
        $location.path("/admin/usuarios");
      };

      this.tornarAdmin = () => {
        this.isLoading = true;
        $http
          .post(`/api/usuarios/${this.usuario._id}`, {
            isAdmin: true
          })
          .then(() => {
            this.query();
          });
      };
    }
  });

  angular
    .module("app")
    .config($routeProvider => {
      $routeProvider
        .when("/admin/alimentos/", {
          template: "<alimentos-admin>"
        })
        .when("/admin/alimentos/:id", {
          template: "<editar-alimento-admin>"
        })
        .when("/admin/novo-alimento", {
          template: "<editar-alimento-admin>"
        });
    })
    .component("alimentosAdmin", {
      templateUrl: "alimentos-admin.html",
      controller($http, $filter, $location) {
        this.$onInit = () => {
          this.isAdmin = true;
        };
        this.query = () => {
          return $http.get("/api/alimentos");
        };

        this.excluir = alimentoId => {
          return $http.delete(`/api/alimentos/${alimentoId}`);
        };
      }
    });

  angular.module("app").component("editarAlimentoAdmin", {
    templateUrl: "editar-alimento-admin.html",
    controller($http, $location, $routeParams) {
      this.$onInit = () => {
        if ($routeParams.id) {
          this.ehNovo = false;
          this.query();
        } else {
          this.ehNovo = true;
        }
      };
      this.categorias = [
        "Alimentos preparados",
        "Bebidas(alcoólicas e não alcoólicas)",
        "Carnes e derivados",
        "Cereais e derivados",
        "Frutas e derivados",
        "Gorduras e óleos",
        "Leguminosas e derivados",
        "Leite e derivados",
        "Nozes e sementes",
        "Outros alimentos industrializados",
        "Ovos e derivados",
        "Pescados e frutos do mar",
        "Produtos açucarados",
        "Verduras, hortaliças e derivados"
      ];

      this.query = () => {
        this.isLoading = true;
        $http.get(`/api/alimentos/${$routeParams.id}`).then(({ data }) => {
          this.alimento = data;
          this.isLoading = false;
        });
      };

      this.salvar = () => {
        this.isLoading = true;
        $http
          .post(
            `/api/alimentos/${this.ehNovo ? "" : this.alimento._id}`,
            this.alimento
          )
          .then(() => {
            this.voltar();
          });
      };

      this.voltar = () => {
        $location.path("/admin/alimentos");
      };
    }
  });

  angular
    .module("app")
    .config($routeProvider => {
      $routeProvider.when("/home-admin", {
        template: "<home-admin>"
      });
    })
    .component("homeAdmin", {
      templateUrl: "home-admin.html",
      controller($http, $location) {}
    });

  const m$1 = angular.module("app");

  m$1.config($routeProvider => {
    $routeProvider.when("/", {
      template: "<login>"
    });
  });

  m$1.run([
    "$locale",
    function($locale) {
      $locale.NUMBER_FORMATS.GROUP_SEP = ".";
      $locale.NUMBER_FORMATS.DECIMAL_SEP = ",";
    }
  ]);

}());
