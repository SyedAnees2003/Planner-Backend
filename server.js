require("dotenv").config();
const app = require("./src/app");
const { sequelize } = require("./src/models");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log("🔍 Database URL:", process.env.DATABASE_URL ? "Set by Railway" : "Using local");
    console.log("🌐 Environment:", process.env.NODE_ENV);
    
    // Test database connection
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
    
    // Sync database (safe for production)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log("🔄 Database synchronized (alter mode).");
    } else {
      await sequelize.sync();
      console.log("✅ Database synchronized.");
    }
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port: ${PORT}`);
      console.log(`📡 Public URL: ${process.env.RAILWAY_PUBLIC_DOMAIN || `http://localhost:${PORT}`}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    console.error("💡 Check if DATABASE_URL is set in Railway variables");
    process.exit(1);
  }
}

startServer();