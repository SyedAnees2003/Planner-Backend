const { Sequelize } = require("sequelize");

let sequelize;

if (process.env.MYSQL_URL) {
  console.log("📦 Database URL: Using MYSQL_URL from env");

  sequelize = new Sequelize(process.env.MYSQL_URL, {
    dialect: "mysql",
    logging: false,
  });
} else {
  console.log("📦 Database URL: Using individual env vars");

  sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      dialect: "mysql",
      logging: false,
    }
  );
}

module.exports = sequelize;
