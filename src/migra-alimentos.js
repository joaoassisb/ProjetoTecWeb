"use strict";

require("./server");

const mongoose = require("mongoose");
const Alimento = mongoose.model("Alimento");

const { alimentos } = require("../combined.js");

let contador = 0;

migrar()
  .then(() => {
    console.log("CABOOOOOOOOOO CARAIO");
    process.exit(0);
  })
  .catch(err => {
    console.log("erro");
    console.log(err);
  });

async function migrar() {
  console.log("Migrando alimentos");
  let alimento;

  for (const objeto of alimentos) {
    alimento = new Alimento(objeto);
    if (contador <= 372) {
      console.log("alimento ja criado");
    } else {
      console.log(`Alimento ${alimento.id} criado`);

      await alimento.save();
    }
    contador++;
  }

  console.log(`${contador} alimentos criado`);

  return;
}

// Alimento.count()
//   .then(alimentos => {
//     console.log(alimentos);
//   })
//   .catch(err => {
//     console.log(err);
//     console.log("ERRO");
//   });

// Alimento.remove({}).then(() => {
//   console.log("removeu");
// });
