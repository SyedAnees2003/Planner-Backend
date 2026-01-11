require("dotenv").config();
const app = require("./src/app");
const { sequelize } = require("./src/models");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Test database connection first
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
    
    // Sync database (alter: true for dev, remove for production)
    await sequelize.sync({ alter: process.env.NODE_ENV !== 'production' });
    console.log("✅ Database synchronized.");
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port: ${PORT}`);
      console.log(`🌐 URL: ${process.env.RAILWAY_PUBLIC_DOMAIN || `http://localhost:${PORT}`}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();