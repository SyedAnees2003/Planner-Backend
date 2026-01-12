const { Sequelize } = require("sequelize");

if (!process.env.MYSQL_URL) {
  throw new Error("MYSQL_URL is not defined in environment variables");
}

const sequelize = new Sequelize(process.env.MYSQL_URL, {
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;