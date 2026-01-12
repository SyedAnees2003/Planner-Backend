const { Sequelize } = require("sequelize");

// Debug: Show what MySQL variables are available
console.log("🔍 Checking MySQL environment variables...");
const mysqlVars = {};
Object.keys(process.env).forEach(key => {
  if (key.includes('MYSQL') || key.includes('DATABASE')) {
    mysqlVars[key] = process.env[key] ? '***' + process.env[key].slice(-4) : 'null';
  }
});
console.log("📋 Available MySQL vars:", Object.keys(mysqlVars));

// Railway provides MYSQL_URL, but let's check all possibilities
let connectionString = process.env.MYSQL_URL || process.env.DATABASE_URL;

// If no direct URL, try to construct from Railway's individual variables
if (!connectionString && process.env.MYSQLHOST) {
  console.log("🛠️ Constructing URL from Railway individual variables");
  connectionString = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;
}

// If still no connection string, use local development fallback
if (!connectionString) {
  console.log("🏠 Using local development configuration");
  connectionString = `mysql://${process.env.DB_USER || 'root'}:${process.env.DB_PASSWORD || ''}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 3306}/${process.env.DB_NAME || 'planner_db'}`;
}

console.log("🔗 Database URL configured");

const sequelize = new Sequelize(connectionString, {
  dialect: "mysql",
  // Add SSL for Railway
  dialectOptions: connectionString.includes('railway') ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : {},
  logging: console.log, // Enable logging to see queries
});

module.exports = sequelize;