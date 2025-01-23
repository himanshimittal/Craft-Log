const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Project = require("../models/userSchema");
const signs = require("../models/signupSchema"); // Ensure the relative path is correct
const PDFDocument = require("pdfkit");


// Signup Route (new)
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    // Check if all fields are present
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if user already exists
        const existingUser = await signs.findOne({ email });
        if (existingUser) {
            return res.status(422).json({ message: "User already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new signs({
            name,
            email,
            password: hashedPassword
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login Route (new)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password are required" });
    }
  
    try {
      const user = await signs.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });  // Changed to 401
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });  // Changed to 401
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// Register a user
router.post("/register", async (req, res) => {
    try {
        const { name, steps, materials, progress } = req.body;
        console.log("Received data:", req.body); // Debugging log

        // Validate input fields
        if (!name || !steps || !materials || progress === undefined) {
            return res.status(400).json({ message: "Please fill all fields." });
        }

        // Create a new project
        const newProject = new Project({ name, steps, materials, progress });

        // Save the project to the database
        await newProject.save();

        // Log success
        console.log("New Project Created:", newProject);

        // Return success response
        res.status(201).json({ 
            message: "Project added successfully", 
            project: newProject 
        });
    } catch (error) {
        console.error("Error adding project:", error);
        res.status(500).json({ 
            message: "Internal server error. Please try again later.", 
            error: error.message 
        });
    }
});


// Get All Users
router.get("/getdata", async (req, res) => {
    try {
        const userList = await Project.find(); // Use the correct model name
        res.status(200).json(userList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Download PDF
router.get("/downloadpdf", async (req, res) => {
    try {
        const userList = await Project.find();

        if (!userList || userList.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        const doc = new PDFDocument();
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=users.pdf");

        doc.pipe(res);

        doc.fontSize(18).text("Staff Record", { align: "center" });
        doc.moveDown();

        userList.forEach((user, index) => {
            doc.fontSize(12).text(`Staff ID : ${index + 1}`);
            doc.text(`Name: ${user.name}`);
            doc.text(`Email: ${user.email}`);
            doc.text(`Age: ${user.age}`);
            doc.text(`Mobile: ${user.mobile}`);
            doc.text(`Work: ${user.work}`);
            doc.text(`Address: ${user.add}`);
            doc.text(`Description: ${user.desc}`);
            doc.moveDown();
        });

        doc.end();
    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).json({ error: error.message });
    }
});


router.get("/getuser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userindividual = await Project.findById({ _id: id });
        if (!userindividual) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(userindividual);
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


router.patch("/updateuser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateduser = await Project.findByIdAndUpdate(id, req.body, { new: true });
        if (!updateduser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updateduser);
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.delete("/deleteuser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletuser = await Project.findByIdAndDelete({ _id: id });
        if (!deletuser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(deletuser);
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
