require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./config/db");
const cors=require("cors");

const authRoutes=require("./routes/authRoutes");
const resumeRoutes=require("./routes/resumeRoutes");

// middleware to handle cors
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
)

connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// Server upload folder
app.use("/uploads", 
    express.static(path.join(__dirname, "uploads"),{
        setHeaders: (res, path)=>{
            res.set("Access-Control-Allow-Origin", "http://localhost:5173");
        }
    })
);

// Start Server
const PORT=process.env.PORT||5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));