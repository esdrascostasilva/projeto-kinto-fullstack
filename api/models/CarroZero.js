const { DataTypes } = require("sequelize");
const db = require("../db/connection");

const CarroZero = db.define("CarroZero", {
  modelo: {
    type: DataTypes.STRING,
    require: true,
  },
  fipe: {
    type: DataTypes.STRING,
    require: true,
  },
  valor: {
    type: DataTypes.DECIMAL(8, 2),
    require: true,
  },
});

module.exports = CarroZero;
