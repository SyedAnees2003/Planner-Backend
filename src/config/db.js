const { Sequelize } = require('sequelize');

const databaseUrl = process.env.DATABASE_URL;

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'mysql',
  dialectOptions: databaseUrl && databaseUrl.includes('railway') ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : {},
  logging: console.log
});

module.exports = sequelize;