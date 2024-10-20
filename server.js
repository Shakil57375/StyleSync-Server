import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/route.js";

// App Configuration
const app = express();
const port = process.env.PORT || 5000;
connectDB();
connectCloudinary();
// Middleware configuration
app.use(express.json());
app.use(cors());

// API endpoints
app.use("/api/user", userRouter);


app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => console.log("server listening on port", port));
