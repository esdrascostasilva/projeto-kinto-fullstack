const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("kinto", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
