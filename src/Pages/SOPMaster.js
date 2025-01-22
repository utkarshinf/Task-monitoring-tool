import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../style/style.css";
import {
  getAllSopMater,
  getSopTaskMap,
  createSop,
} from "../services/apiService";
import Sidebar from "../Components/partial/Sidebar";
import Navbar from "../Components/partial/Navbar";

const SOPMaster = () => {
  const [sopData, setSopData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSop, setSelectedSop] = useState(null);
  const [campaignTasks, setCampaignTasks] = useState([]);
  const [taskLoading, setTaskLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [sideClass, SetSideClass] = useState("");
  const [newClass, SetNewClass] = useState("");
  const [formClass, setFormClass] = useState("");
  const [dashClass, setDashClass] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  const [newSopData, setNewSopData] = useState({
    sopmastername: "",
    description: "",
    camapignTypeId: "",
    createdBy: "",
    status: "",
  });

  useEffect(() => {
    const fetchSopData = async () => {
      try {
        const response = await getAllSopMater();
        setSopData(response.data);
      } catch (error) {
        console.error("Error fetching SOP master Data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSopData();
  }, []);

  useEffect(() => {
    if (selectedSop) {
      const fetchTasks = async () => {
        setTaskLoading(true);
        try {
          const response = await getSopTaskMap();
          console.log("SOPMAP", response);

          setCampaignTasks(
            response.data.filter((task) => task.sopId === selectedSop.id)
          );
        } catch (error) {
          console.error("Error fetching campaign tasks:", error);
        } finally {
          setTaskLoading(false);
        }
      };

      fetchTasks();
    }
  }, [selectedSop]);

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

  const handleSopClick = (sop) => {
    setSelectedSop(sop);
    console.log("getSopTask", sop);
  };
  const handleFormChange = async (e) => {
    const { name, value } = e.target;
    setNewSopData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const filteredSopData = sopData.filter((sop) =>
    sop.sopmastername.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await createSop(newSopData);
      const response = await getAllSopMater();
      setSopData(response.data);

      setNewSopData({
        sopmastername: "",
        dscription: "",
        camapignTypeId: "",
        createdBy: "",
        status: "",
      });
      setShowCreateForm(false);
    } catch (error) {
      console.error("Error creating SOP", error);
      setError("Failed to create SOP ");
    }
  };
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

  return (
    <>
      <main className="main_context position-relative d-flex">
        <Sidebar sideClass={sideClass} />
        <div className={`dashboard w-100 ${newClass}`}>
          <Navbar handleToggle={handleToggle} />
          <div className="h-100 w-100 overflow-hidden position-relative">
            <div className={` mb-5 bg-white h-100 ${dashClass}`}>
              <div className="d-flex justify-content-between mt-4">
                <input
                  className="custom-search-button"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className="rounded-button"
                  onClick={() => toggleTaskForm()}
                >
                  <span>Create</span>
                </button>
              </div>
              <div className="container mt-5">
                <div className="custom-card">
                  {loading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p className="text-danger">Error: {error}</p>
                  ) : (
                    <ul className="list-group list-group-flush">
                      {filteredSopData.map((sop) => (
                        <li
                          className="list-group-item"
                          key={sop.id}
                          onClick={() => handleSopClick(sop)}
                          style={{ cursor: "pointer" }}
                        >
                          {sop.sopmastername}
                          <button className="btn-icon">
                            <i className="bi bi-pencil"></i>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            {selectedSop && (
              <div className="campaign-container position-absolute end-0">
                <div className="campaign">
                  <i
                    className="bi bi-x campaign-close-icon"
                    onClick={() => handleSopClick(null)}
                  ></i>
                  <div className="campaign-header">
                    {selectedSop.sopmastername}
                  </div>
                  <div className="row">
                    <div className="col-12">
                      {taskLoading ? (
                        <p>Loading tasks...</p>
                      ) : (
                        campaignTasks.map((task) => (
                          <div
                            className="campaign-check d-flex mb-3"
                            key={task.id}
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`task-${task.id}`}
                            />
                            <label
                              className="ms-3 campaign-check-label"
                              htmlFor={`task-${task.id}`}
                            >
                              {task.taskName}
                            </label>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  <button className="save-button mt-3">Save</button>
                </div>
              </div>
            )}

<div
            className={`container form-container position-absolute top-0 end-0 ${formClass}`}
          >
            <div className="task-form position-absolute end-0 bg-white py-3 px-2">
              <h3>Create SOP</h3>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label htmlFor="sopmastername" className="form-label">
                    SOP Master Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="sopmastername"
                    name="sopmastername"
                    value={newSopData.sopmastername}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="sopmasterdescription"
                    name="sopmasterdescription"
                    rows="3"
                    value={newSopData.sopmasterdescription}
                    onChange={handleFormChange}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="campaignTypeId" className="form-label">
                    Campaign Type ID
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="campaigntypeid"
                    name="campaigntypeid"
                    value={newSopData.campaigntypeid}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="createdBy" className="form-label">
                    Created By
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="createdby"
                    name="createdby"
                    value={newSopData.createdby}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                  <select
                    className="form-control"
                    id="status"
                    name="status"
                    value={newSopData.status}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Select Status</option>
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
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

export default SOPMaster;
