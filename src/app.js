const express = require("express")
const app = express()

app.use(express.json())

app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/tasks", require("./routes/taskRoutes"))
app.use("/api/groups", require("./routes/groupRoutes"))
app.use("/api/comments", require("./routes/commentRoutes"))
app.use("/api/progress", require("./routes/progressRoutes"))

module.exports = app
