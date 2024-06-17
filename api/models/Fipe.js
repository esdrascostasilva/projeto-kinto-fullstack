const { DataTypes } = require("sequelize");
const db = require("../db/connection");

const Fipe = db.define("Fipe", {
  modelo: {
    type: DataTypes.STRING,
    require: true,
  },
  versao: {
    type: DataTypes.STRING,
    require: true,
  },
  fipe: {
    type: DataTypes.STRING,
    require: true,
  },
  ano_modelo: {
    type: DataTypes.INTEGER,
    require: true,
  },
  data_referencia: {
    type: DataTypes.STRING,
    require: true,
  },
  valor: {
    type: DataTypes.DECIMAL(8, 2),
    require: true,
  },
});

module.exports = Fipe;
