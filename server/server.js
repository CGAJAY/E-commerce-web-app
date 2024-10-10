import express from "express";
import { configDotenv } from "dotenv";
import userRoutes from "./routes/user.Routes.js"; // Import user routes
// Import the database connection function
import { connectDB } from "./db/connectDB.js";
import cookieParser from "cookie-parser";

configDotenv(); // Load environment variables

const app = express(); // Create an Express application
connectDB(); // Connect to the database

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse JSON request bodies
app.use(express.json());

const PORT = process.env.PORT | 3000;

// Use user routes for all user-related endpoints
app.use("/", userRoutes);

app.listen(PORT, () => {
	console.log("hello");
});
