const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const appRoute = require("./routes/index.js");
const connectDB = require("./config/database.js");

const app = express();

// ---------- Middleware ----------
app.use(express.json());

app.use(cors({
  origin: true, // ✅ allow your live frontend
  credentials: true
}));

// ---------- Static Files ----------
app.use(
  "/images",
  express.static(path.join(__dirname, "../public/images"))
);

app.use(express.static("public"));

// ---------- Routes ----------
app.use("/app/v1", appRoute);

// ---------- PORT (HOSTINGER REQUIRED) ----------
const PORT = process.env.PORT || 3000;

// ---------- Start Server FIRST ----------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// ---------- DB Connection (NON-BLOCKING) ----------
connectDB.connectToDatabase()
  .then(() => console.log("✅ MySQL connected"))
  .catch(err => console.error("❌ MySQL error:", err));
