import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Edit = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get project ID from URL

    // State for project details
    const [inpval, setINP] = useState({
        steps: "",
        materials: "",
        progress: 0 // Default to 0
    });

    // Fetch project data by ID and populate the state
    const getdata = async () => {
        try {
            const res = await fetch(`http://localhost:8003/getuser/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (res.ok) {
                const data = await res.json();
                console.log("Fetched data:", data); // Debug log
                setINP(data); // Populate state with project data
            } else {
                console.error("Error fetching project data");
                alert("Failed to fetch project data");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Update state on input change
    const setdata = (e) => {
        const { name, value } = e.target;
        console.log(`Setting data: ${name} = ${value}`); // Debug log
        setINP((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Update project details and redirect to Home page
    const updateProject = async (e) => {
        e.preventDefault(); // Prevent form reload
        console.log("Update Project function triggered");
        console.log("Current state before update:", inpval);

        const { steps, materials, progress } = inpval;

        try {
            const res = await fetch(`http://localhost:8003/updateuser/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ steps, materials, progress }) // Send updated project data
            });

            if (res.ok) {
                const data = await res.json();
                console.log("Project updated successfully:", data); // Debug log
                navigate("/"); // Redirect to Home page after successful update
            } else {
                console.error("Failed to update project");
                alert("Failed to update project. Please check the inputs.");
            }
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    // Fetch project data on component mount
    useEffect(() => {
        getdata();
    }, []);

    return (
        <div className="container">
            <h2>Edit Project</h2>
            <form className="mt-4" onSubmit={updateProject}>
                <div className="row">
                    <div className="mb-3 col-lg-12 col-md-12 col-12">
                        <label className="form-label">Steps</label>
                        <textarea
                            name="steps"
                            value={inpval.steps}
                            onChange={setdata}
                            className="form-control"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-3 col-lg-12 col-md-12 col-12">
                        <label className="form-label">Materials</label>
                        <textarea
                            name="materials"
                            value={inpval.materials}
                            onChange={setdata}
                            className="form-control"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label className="form-label">Progress (%)</label>
                        <input
                            type="number"
                            name="progress"
                            value={inpval.progress}
                            onChange={setdata}
                            className="form-control"
                            min="0"
                            max="100"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Update Project
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
