import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adddata } from './context/ContextProvider';

const Register = () => {
    const { setUdata } = useContext(adddata);
    const navigate = useNavigate();

    const [project, setProject] = useState({
        name: "",
        steps: "",
        materials: "",
        progress: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const addProject = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:8003/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        });

        const data = await res.json();
        if (res.ok) {
            setUdata(data);
            navigate("/");
        } else {
            alert("Error adding project");
        }
    };

    return (
        <div className="container">
            <h2 className="mt-4">Add New Project</h2>
            <form className="mt-4" onSubmit={addProject}>
                <div className="mb-3">
                    <label className="form-label">Project Name</label>
                    <input type="text" name="name" value={project.name} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Project Steps</label>
                    <textarea name="steps" value={project.steps} onChange={handleChange} className="form-control" rows="3" required></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Materials Required</label>
                    <textarea name="materials" value={project.materials} onChange={handleChange} className="form-control" rows="3" required></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Progress (%)</label>
                    <input type="number" name="progress" value={project.progress} onChange={handleChange} className="form-control" min="0" max="100" required />
                </div>
                <button type="submit" className="btn btn-primary">Add Project</button>
            </form>
        </div>
    );
};

export default Register;
