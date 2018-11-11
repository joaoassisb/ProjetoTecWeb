"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.SchemaTypes;
const createError = require("http-errors");

const ResultadosSchema = new Schema({
  perfilUsuario: {
    type: ObjectId,
    ref: "PerfilUsuario",
    required: true
  },
  usuario: {
    type: ObjectId,
    ref: "Usuario",
    required: true
  },
  imc: Number,
  gorduraCorporal: Number,
  taxaMetabolicaBasal: Number,
  exigenciaAgua: Number,
  requisitosCaloricos: Number
});

ResultadosSchema.method({
  calcular() {
    this.calcularIMC();

    return this.save();
  },
  calcularIMC() {
    if (
      !this.perfilUsuario ||
      !this.perfilUsuario.peso ||
      !this.perfilUsuario.altura
    ) {
      return createError(
        402,
        "Para calcular o IMC é necessário cadastrar o peso e a altura"
      );
    }

    const { peso, altura } = this.perfilUsuario;
    const alturaEmMts = (altura / 100).toFixed(2);
    this.imc = (peso / (alturaEmMts * alturaEmMts)).toFixed(2);
    return;
  }
});

module.exports = mongoose.model(
  "ResultadosUsuario",
  ResultadosSchema,
  "resultadosusuarios"
);
