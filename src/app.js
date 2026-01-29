const dotenv = require("dotenv");
dotenv.config(); // ✅ FIRST
const appRoute = require('./routes/index.js')

const express = require("express");
const connectDB = require("./config/database.js");
// const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const app = express();

// middleware
app.use(express.json());
// app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


// MUST be BEFORE routes
app.use(
  "/images",
  express.static(path.join(__dirname, "../public/images"))
);



app.use(express.static('public'));

app.use("/app/v1",appRoute);

const PORT = process.env.PORT;

connectDB.connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MySQL connection error:", err);
    process.exit(1);
  });



 // ✅ MySQL connection check
// connectDB
//   .query("SELECT 1")
//   .then(() => {
//     console.log("✅ MySQL Database connection established...");
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ Database connection failed:", err);
//     process.exit(1);
 //);