import React, { useEffect, useState } from "react";
import Sidebar from "../Components/partial/Sidebar";
import "../style/style.css";
import { getTasks } from "../services/apiService";
import Navbar from "../Components/partial/Navbar";

const Dashboard = () => {
  const [sideClass, SetSideClass] = useState("");
  const [newClass, SetNewClass] = useState("");
  const [formClass, setFormClass] = useState("");
  const [dashClass, setDashClass] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  const toggleTaskForm = (taskId) => {
    if (formClass === "") {
      setSelectedTask(taskId);
      setFormClass("open");
      setDashClass("open_bar");
    } else {
      setSelectedTask("");
      setFormClass("");
      setDashClass("");
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.data);
      } catch (error) {
        console.error("Failed to fetch Tasks", error);
      }
    };
    fetchTasks();
  }, []);

  const handleToggle = () => {
    if (sideClass === "") {
      SetSideClass("close");
    } else {
      SetSideClass("");
    }
    if (newClass === "") {
      SetNewClass("dashboard_active");
    } else {
      SetNewClass("");
    }
  };

  return (
    <>
      <main className="main_context position-relative d-flex ">
        <Sidebar sideClass={sideClass} />
        <div className={`dashboard w-100 ${newClass}`}>
          <Navbar handleToggle={handleToggle} />
          <div className="h-100 w-100 overflow-hidden position-relative">
            <div className={` mb-5 bg-white h-100 ${dashClass}`}>
              <div className="dashboard-shadow-box">
                <table className="table table-bordered m-0">
                  <thead className="dashboard-table-header">
                    <tr>
                      <th>Today's Task</th>
                      <th>Pending</th>
                      <th>Completed</th>
                      <th>Future</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="dashboard-striped-row">
                      <td
                        className="dashboard-highlight py-3"
                        style={{ backgroundColor: "#FDEA5A" }}
                        onClick={() => toggleTaskForm(1)}
                      >
                        10
                      </td>
                      <td
                        className="dashboard-highlight py-3"
                        style={{ backgroundColor: "#FEC751" }}
                      >
                        3
                      </td>
                      <td
                        className="dashboard-highlight py-3"
                        style={{ backgroundColor: "#8DF478" }}
                      >
                        7
                      </td>
                      <td
                        className="dashboard-highlight py-3"
                        style={{ backgroundColor: "#ABC1F1" }}
                      >
                        24
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="dashboard-shadow-box">
                <table className="table table-bordered mt-4">
                  <thead className="dashboard-table-header">
                    <tr>
                      <th>Task</th>
                      <th>Task Name</th>
                      <th>TAT</th>
                      <th>% Pending</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => (
                      <tr className="dashboard-striped-row" key={task.id}>
                        <td onClick={() => toggleTaskForm(task.id)}>
                          TASK {task.id}
                        </td>
                        <td>{task.taskname || "No Name Provided"}</td>
                        <td>{task.tat || "-"}</td>
                        <td>{task.pendingPercentage || "0%"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div
              className={`container form-container position-absolute top-0 end-0 ${formClass}`}
            >
              <div className="task-form position-absolute end-0 bg-white py-3 px-2">
                <h4 className="mb-3 fw-bold">Today's Task - {selectedTask}</h4>
                <form>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      id="taskName"
                      placeholder="Task Name"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      id="project"
                      placeholder="Project"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      id="taskMaster"
                      placeholder="Task Master"
                    />
                  </div>
                  <div className="mb-2">
                    <textarea
                      className="form-control"
                      id="taskDescription"
                      rows="3"
                      placeholder="Task Description"
                    ></textarea>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <input
                        type="date"
                        className="form-control"
                        id="dueDate"
                      />
                    </div>
                    <div className="col-md-6 mb-2">
                      <input
                        type="date"
                        className="form-control"
                        id="assignedOn"
                      />
                    </div>
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      id="assignedTo"
                      placeholder="Assigned To"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      id="taskStatus"
                      placeholder="Task Status"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="number"
                      className="form-control"
                      id="percentComplete"
                      placeholder="% Complete"
                    />
                  </div>
                  <div className="mb-2 dashed-border">
                    <p className="mb-2">
                      Drag and Drop here <strong>or</strong>
                    </p>
                    <button type="button" className="btn btn-link">
                      Browse files
                    </button>
                  </div>
                  <div className="mb-2">
                    <textarea
                      className="form-control"
                      id="comments"
                      rows="2"
                      placeholder="Comments"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn-save py-2 px-5">
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
