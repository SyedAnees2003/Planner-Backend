require("dotenv").config();
const app = require("./src/app");
const { sequelize } = require("./src/models");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log("🚀 Starting server...");
    console.log("🔧 NODE_ENV:", process.env.NODE_ENV || 'development');
    console.log("📦 Database URL:", process.env.DATABASE_URL ? "Set by Railway" : "Using local");
    
    // Test connection
    await sequelize.authenticate();
    console.log("✅ Database connected!");
    
    // Sync models
    console.log("🔄 Syncing database...");
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log("🔄 Database synchronized (dev)");
    } else {
      console.log("🚫 Skipping sync in production");
    }
        
    app.listen(PORT, () => {
      console.log(`🎉 Server running on port: ${PORT}`);
      console.log(`🌐 Local: http://localhost:${PORT}`);
      if (process.env.RAILWAY_PUBLIC_DOMAIN) {
        console.log(`🚂 Railway: ${process.env.RAILWAY_PUBLIC_DOMAIN}`);
      }
    });
  } catch (error) {
    console.error("❌ Startup failed!");
    console.error("Error:", error.message);
    console.error("Stack:", error.stack);
    process.exit(1);
  }
}

startServer();