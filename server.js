const app = require("./src/app");
const sequelize = require("./src/config/db");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    console.log("🚀 Starting server on Vercel...");
    console.log("🔧 NODE_ENV:", process.env.NODE_ENV);
    console.log("📍 PORT:", PORT);
    console.log("🌐 VERCEL:", process.env.VERCEL ? "Yes" : "No");

    // Try to connect to database
    try {
      await sequelize.authenticate();
      console.log("✅ Database connected");
      
      if (process.env.NODE_ENV !== 'production') {
        await sequelize.sync({ alter: true });
        console.log("🔄 Database synced");
      }
    } catch (dbError) {
      console.warn("⚠️ Database connection failed:", dbError.message);
    }

    // Start server
    const server = app.listen(PORT, () => {
      console.log(`🎉 Server running on port ${PORT}`);
      console.log(`🌐 URL: https://${process.env.VERCEL_URL || `localhost:${PORT}`}`);
    });

    return server;
  } catch (err) {
    console.error("❌ Startup failed!");
    console.error(err);
    process.exit(1);
  }
};

// Export for Vercel serverless
if (process.env.VERCEL) {
  // Running on Vercel - export the app
  module.exports = app;
} else {
  // Running locally - start the server
  startServer();
}