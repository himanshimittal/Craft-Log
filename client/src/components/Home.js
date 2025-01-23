import React, { useState, useEffect, useContext } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NavLink } from "react-router-dom";
import { adddata, deldata, updatedata } from "./context/ContextProvider";
import { Pie } from "react-chartjs-2"; // Import Pie Chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [alerts, setAlerts] = useState({ success: false, update: false, delete: false });
    const { udata, setUdata } = useContext(adddata);
    const { updata, setUPdata } = useContext(updatedata);
    const { dltdata, setDLTdata } = useContext(deldata);

    const getProjects = async () => {
        try {
            const res = await fetch("http://localhost:8003/getdata");
            const data = await res.json();
            if (res.ok) {
                setProjects(data);
            } else {
                console.error("Error fetching projects");
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    useEffect(() => {
        getProjects();
    }, []);

    const deleteProject = async (id) => {
        try {
            const res = await fetch(`http://localhost:8003/deleteuser/${id}`, { method: "DELETE" });
            const deletedProject = await res.json();
            if (res.ok) {
                setDLTdata(deletedProject);
                getProjects();
                setAlerts({ ...alerts, delete: true });
                setTimeout(() => setAlerts({ ...alerts, delete: false }), 3000);
            } else {
                console.error("Error deleting project");
            }
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    useEffect(() => {
        if (udata) {
            setAlerts({ ...alerts, success: true });
            setTimeout(() => {
                setAlerts({ ...alerts, success: false });
                setUdata(null);
            }, 3000);
        }
        if (updata) {
            setAlerts({ ...alerts, update: true });
            setTimeout(() => {
                setAlerts({ ...alerts, update: false });
                setUPdata(null);
            }, 3000);
        }
    }, [udata, updata]);

    return (
        <>
            {alerts.success && udata && (
                <div className="alert alert-success"> <strong>{udata.name}</strong> added successfully! </div>
            )}
            {alerts.update && updata && (
                <div className="alert alert-success"> <strong>{updata.name}</strong> updated successfully! </div>
            )}
            {alerts.delete && dltdata && (
                <div className="alert alert-danger"> <strong>{dltdata.name}</strong> deleted successfully! </div>
            )}
            
            <div className="container mt-5">
                <div className="add_btn mt-2 mb-2">
                    <NavLink to="/register" className="btn btn-primary">Add Project</NavLink>
                    <button onClick={downloadPDF} className="btn btn-secondary ms-2">Download PDF</button>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Project Name</th>
                            <th>Progress</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project, index) => (
                            <tr key={project._id}>
                                <td>{index + 1}</td>
                                <td>{project.name}</td>
                                <td>
                                    <div style={{ width: "80px", height: "80px", position: "relative" }}>
                                        <Pie
                                            data={{
                                                labels: ["Completed", "Remaining"],
                                                datasets: [
                                                    {
                                                        data: [project.progress, 100 - project.progress],
                                                        backgroundColor: ["#4caf50", "#e0e0e0"], // Colors
                                                        hoverBackgroundColor: ["#388e3c", "#bdbdbd"],
                                                    },
                                                ],
                                            }}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: false,
                                                plugins: {
                                                    legend: {
                                                        display: false, // Hide legend
                                                    },
                                                },
                                            }}
                                        />
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "50%",
                                                left: "50%",
                                                transform: "translate(-50%, -50%)",
                                                fontSize: "10px",
                                                fontWeight: "bold",
                                                textAlign: "center",
                                            }}
                                        >
                                           
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <NavLink to={`view/${project._id}`} className="btn btn-success me-2">
                                        <RemoveRedEyeIcon />
                                    </NavLink>
                                    <NavLink to={`edit/${project._id}`} className="btn btn-primary me-2">
                                        <CreateIcon />
                                    </NavLink>
                                    <button className="btn btn-danger" onClick={() => deleteProject(project._id)}>
                                        <DeleteOutlineIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );

    function downloadPDF() {
        fetch("http://localhost:8003/downloadpdf")
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "DIY_Project_Tracker.pdf";
                document.body.appendChild(a);
                a.click();
                a.remove();
            })
            .catch(error => {
                console.error("Error downloading PDF:", error);
                alert("Error downloading PDF. Please try again later.");
            });
    }
};

export default Home;
