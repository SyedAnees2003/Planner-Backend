const app = require("./src/app");
const sequelize = require("./src/config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log("🚀 Starting server...");
    console.log("🔧 NODE_ENV:", process.env.NODE_ENV);
    console.log("🔧 PORT:", PORT);

    await sequelize.authenticate();
    console.log("✅ Database connected");

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Startup failed!");
    console.error(err);
    process.exit(1);
  }
};

startServer();