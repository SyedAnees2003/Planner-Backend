const app = require("./src/app");
const sequelize = require("./src/config/db");
const { User, Group, Task, Comment, GroupMember, TaskParticipation } = require("./src/models");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log("🚀 Starting server on Railway...");
    console.log("🔧 NODE_ENV:", process.env.NODE_ENV || 'development');
    console.log("📍 PORT:", PORT);

    // Test database connection
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");

    // Sync all models/tables
    console.log("🔄 Syncing database tables...");
    await sequelize.sync({ alter: true });
    console.log("✅ Database tables synced!");

    // Start the server
    app.listen(PORT, () => {
      console.log(`🎉 Server running on port ${PORT}`);
      console.log(`📡 Local: http://localhost:${PORT}`);
      
      // Check if we're on Railway
      if (process.env.RAILWAY_STATIC_URL) {
        console.log(`🚂 Railway URL: ${process.env.RAILWAY_STATIC_URL}`);
      } else if (process.env.RAILWAY_PUBLIC_DOMAIN) {
        console.log(`🚂 Railway Public Domain: ${process.env.RAILWAY_PUBLIC_DOMAIN}`);
      }
    });
  } catch (err) {
    console.error("❌ Server startup failed!");
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    console.error("Error code:", err.code);
    console.error("Full error:", err);
    process.exit(1);
  }
};

startServer();