const mongoose = require("mongoose");

// Define the Project schema
const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    steps: { type: String, required: true },
    materials: { type: String, required: true },
    progress: { type: Number, required: true },
});

// Create the Project model from the schema
const Project = mongoose.model("Project", projectSchema);

// Export the Project model
module.exports = Project;
