"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.SchemaTypes;

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
    this.calcularTaxaMetabolicaBasal();
    this.calcularExigenciaAguar();
    this.calcularGorduraCorporal();

    return this.save();
  },
  calcularIMC() {
    if (
      !this.perfilUsuario ||
      !this.perfilUsuario.peso ||
      !this.perfilUsuario.altura
    ) {
      return;
    }

    const { peso, altura } = this.perfilUsuario;
    const alturaEmMts = (altura / 100).toFixed(2);
    this.imc = (peso / (alturaEmMts * alturaEmMts)).toFixed(2);
    return;
  },
  calcularTaxaMetabolicaBasal() {
    if (this.perfilUsuario.genero === "Masculino") {
      this.taxaMetabolicaBasal =
        66 +
        13.7 * this.perfilUsuario.peso +
        5.0 * this.perfilUsuario.altura -
        6.8 * this.perfilUsuario.idade;
    } else if (this.perfilUsuario.genero === "Feminino") {
      this.taxaMetabolicaBasal =
        665 +
        9.6 * this.perfilUsuario.peso +
        1.8 * this.perfilUsuario.altura -
        4.7 * this.perfilUsuario.idade;
    }

    return;
  },
  calcularExigenciaAguar() {
    if (!this.perfilUsuario.peso) {
      return;
    }

    this.exigenciaAgua = ((35 * this.perfilUsuario.peso) / 1000).toFixed(2);
  },
  calcularGorduraCorporal() {
    if (Object.keys(this.perfilUsuario.medidas).length === 0) {
      return;
    }
    if (this.perfilUsuario.genero === "Masculino") {
      this.gorduraCorporal = (
        495 /
          (1.0324 -
            0.19077 *
              Math.log10(
                this.perfilUsuario.medidas.cintura -
                  this.perfilUsuario.medidas.pescoco
              ) +
            0.15456 * Math.log10(this.perfilUsuario.altura)) -
        450
      ).toFixed(2);
    } else if (this.perfilUsuario.genero === "Feminino") {
      this.gorduraCorporal = (
        495 /
          (1.29579 -
            0.35004 *
              Math.log10(
                this.perfilUsuario.medidas.cintura +
                  this.perfilUsuario.medidas.quadril -
                  this.perfilUsuario.medidas.pescoco
              ) +
            0.221 * Math.log10(this.perfilUsuario.medidas.altura)) -
        450
      ).toFixed(2);
    }

    return;
  }
});

module.exports = mongoose.model(
  "ResultadosUsuario",
  ResultadosSchema,
  "resultadosusuarios"
);
