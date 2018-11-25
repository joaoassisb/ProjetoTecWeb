"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.SchemaTypes;

const AlimentoRefeicaoSchema = new Schema({
  alimento: {
    type: ObjectId
  },
  nomeModelo: {
    type: String,
    required: true
  },
  totalCalorias: Number,
  totalProteinas: Number,
  totalCarboidratos: Number,
  totalLipidios: Number
});

module.exports = mongoose.model(
  "AlimentoRefeicao",
  AlimentoRefeicaoSchema,
  "alimentosrefeicoes"
);
