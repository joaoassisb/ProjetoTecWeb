"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.SchemaTypes;

const RefeicaoSchema = new Schema({
  nome: {
    type: String,
    enum: ["Café da Manhã", "Almoço", "Jantar", "Lanche"],
    required: true
  },
  usuario: {
    type: ObjectId,
    required: true
  },
  alimentos: [
    {
      type: ObjectId,
      ref: "AlimentoRefeicao",
      required: true
    }
  ],
  totalCalorias: Number,
  totalProteinas: Number,
  totalCarboidratos: Number,
  totalLipidios: Number
});

RefeicaoSchema.pre("save", function(done) {
  if (this.alimentos.length === 0) {
    done();
  }
  this.totalCalorias = 0;
  this.totalCarboidratos = 0;
  this.totalProteinas = 0;
  this.totalLipidios = 0;

  this.alimentos.forEach(alimento => {
    this.totalCalorias += alimento.totalCalorias;
    this.totalProteinas += alimento.totalProteinas;
    this.totalCarboidratos += alimento.totalCarboidratos;
    this.totalLipidios += alimento.totalLipidios;
  });

  done();
});

module.exports = mongoose.model("Refeicao", RefeicaoSchema, "refeicoes");
