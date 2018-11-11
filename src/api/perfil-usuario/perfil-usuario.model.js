"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.SchemaTypes;

const PerfilUsuarioSchema = new Schema({
  usuario: {
    type: ObjectId,
    ref: "Usuario",
    required: true
  },
  idade: {
    type: Number
  },
  peso: {
    type: Number
  },
  altura: {
    type: Number
  },
  genero: {
    type: String,
    enum: ["Masculino", "Feminino"]
  },
  nivelAtividade: {
    type: String,
    enum: [
      "Sedentário",
      "Ligeiramente ativo",
      "Moderadamento ativo",
      "Ativo",
      "Hiperativo"
    ]
  }
});

module.exports = mongoose.model(
  "PerfilUsuario",
  PerfilUsuarioSchema,
  "perfilusuarios"
);
