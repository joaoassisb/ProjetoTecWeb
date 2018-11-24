"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.SchemaTypes;

const AlimentoUsuarioSchema = new Schema({
  usuario: {
    type: ObjectId,
    ref: "Usuario",
    required: true
  },
  description: String,
  category: String,
  humidity_percents: Number,
  energy_kcal: Number,
  energy_kj: Number,
  protein_g: Number,
  lipidius_g: Number,
  cholesterol_mg: Number,
  carbohydrate_g: Number,
  fiber_g: Number,
  ashes_g: Number,
  calcium_mg: Number,
  magnesium_mg: Number,
  manganese_mg: Number,
  phosphorus_mg: Number,
  iron_mg: Number,
  sodium_mg: Number,
  potassium_mg: Number,
  copper_mg: Number,
  zinc_mg: Number,
  retinol_mcg: String,
  re_mcg: String,
  rae_mcg: String,
  tiamina_mg: Number,
  riboflavin_mg: String,
  pyridoxine_mg: Number,
  niacin_mg: String,
  vitaminC_mg: String,
  saturated_g: Number,
  monounsaturated_g: Number,
  polyunsaturated_g: Number,
  tryptophan_g: Number,
  threonine_g: Number,
  isoleucine_g: Number,
  leucine_g: Number,
  lysine_g: Number,
  methionine_g: Number,
  cystine_g: Number,
  phenylalanine_g: Number,
  tyrosine_g: Number,
  valine_g: Number,
  arginine_g: Number,
  histidine_g: Number,
  alanine_g: Number,
  aspartic_g: Number,
  glutamic_g: Number,
  glycine_g: Number,
  proline_g: Number
});

module.exports = mongoose.model(
  "AlimentoUsuario",
  AlimentoUsuarioSchema,
  "alimentosusuarios"
);
