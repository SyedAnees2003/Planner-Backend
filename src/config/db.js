const { Sequelize } = require('sequelize');

// Get database URL from Railway or use local
const databaseUrl = process.env.DATABASE_URL || 
  `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false
    } : {}
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false
});

module.exports = { sequelize };