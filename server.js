const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));

// Connect to DB
connectDB();

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/stripe", require("./routes/billing"));
app.use("/api/myAccount", require("./routes/myAccount"));
app.use("/api/movies", require("./routes/movies"));
app.use("/api/rent", require("./routes/rent"));
app.use("/api/return", require("./routes/return"));

const PORT = 5000;

app.listen(PORT, () => `Server started on PORT ${PORT}`);
