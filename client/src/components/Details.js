import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Details = () => {
    const [projectData, setProjectData] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch project data by ID
    const fetchProjectData = async () => {
        try {
            const res = await fetch(`http://localhost:8003/getuser/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();

            if (res.status === 200) {
                setProjectData(data);
            } else {
                console.error("Error fetching project details");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Delete project by ID
    const deleteProject = async () => {
        try {
            const res = await fetch(`http://localhost:8003/deleteuser/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (res.status === 200) {
                console.log("Project deleted successfully");
                navigate("/"); // Redirect to the homepage
            } else {
                console.error("Error deleting project");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchProjectData();
    }, []);

    return (
        <div className="container mt-3">
            <h1>Project Details</h1>
            <Card sx={{ maxWidth: 600 }}>
                <CardContent style={{ background: 'linear-gradient(to right, #4db6ac, #80cbc4)' }}>
                    <h4>Steps:</h4>
                    <p>{projectData.steps || "No steps available"}</p>

                    <h4>Materials:</h4>
                    <p>{projectData.materials || "No materials available"}</p>

                    <div className="mt-3">
                        <button className="btn btn-danger" onClick={deleteProject}>
                            Delete Project
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Details;
