"use strict";

const Refeicao = require("./refeicao.model");

const AlimentoRefeicao = require("../alimento-refeicao/alimento-refeicao.model");
const Alimento = require("../alimento/alimento.model");
const AlimentoUsuario = require("../alimento-usuario/alimento-usuario.model");

const createError = require("http-errors");

module.exports = {
  queryOrCreate(req, res, next) {
    const { user } = req;
    const q = {
      usuario: user
    };

    const query = Refeicao.find(q);

    query.populate("alimentos");
    query.lean();
    query
      .exec()
      .then(refeicoes => {
        if (refeicoes.length === 0) {
          let refeicao;
          let refeicoesCriadas = [
            "Café da Manhã",
            "Almoço",
            "Jantar",
            "Lanche"
          ].map(nome => {
            refeicao = new Refeicao({
              nome,
              usuario: user
            });

            return refeicao.save();
          });

          res.send(refeicoesCriadas);
        } else {
          getAlimentosRefeicoes(refeicoes).then(refeicoesPopuladas => {
            res.send(refeicoesPopuladas);
          });
        }
      })
      .catch(next);
  },
  load(req, res, next, id) {
    Refeicao.findById(id).then(refeicao => {
      if (!refeicao) {
        return next(createError(404, "Alimento de Usuário não encontrado"));
      }

      req.refeicao = refeicao;
      next();
    });
  },
  get(req, res) {
    res.send(req.refeicao);
  },
  adicionarAlimento(req, res, next) {
    const { refeicao, body } = req;

    const alimentoRefeicao = new AlimentoRefeicao(body);

    alimentoRefeicao
      .save()
      .then(() => {
        refeicao.alimentos.push(alimentoRefeicao);
      })
      .then(() => {
        refeicao.save().then(() => {
          res.send(refeicao);
        });
      })
      .catch(next);
  }
};

function getAlimentosRefeicoes(refeicoes) {
  return Promise.all(
    refeicoes.map(refeicao => {
      if (refeicao.alimentos.length === 0) {
        return refeicao;
      }

      return getAlimentosRefeicao(refeicao).then(refeicaoPopulada => {
        return refeicaoPopulada;
      });
    })
  );
}

async function getAlimentosRefeicao(refeicao) {
  for (const alimentoRefeicao of refeicao.alimentos) {
    if (alimentoRefeicao.nomeModelo === "Alimento") {
      await Alimento.findById(alimentoRefeicao.alimento).then(alimento => {
        alimentoRefeicao.alimento = alimento;
      });
    } else {
      await AlimentoUsuario.findById(alimentoRefeicao.alimento).then(
        alimento => {
          alimentoRefeicao.alimento = alimento;
        }
      );
    }
  }

  return refeicao;
}
