require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/conn");
const users = require("./models/userSchema");
const cors = require("cors");
const router = require("./routes/router");
const port = process.env.PORT || 8003;

// Enable CORS
app.use(cors({
    origin: "http://localhost:3000", // Allow requests from the frontend
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
    credentials: true, // Allow cookies if needed
}));

// Middleware for parsing JSON bodies
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.json("Server started");
});

app.use(router);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
