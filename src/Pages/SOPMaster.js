import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../style/style.css";
import { getAllSopMater, getSopTaskMap } from "../services/apiService";

const SOPMaster = () => {
  const [sopData, setSopData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSop, setSelectedSop] = useState(null);
  const [campaignTasks, setCampaignTasks] = useState([]);
  const [taskLoading, setTaskLoading] = useState(false);

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

          setCampaignTasks(response.data.filter(task => task.sopId === selectedSop.id));
        } catch (error) {
          console.error("Error fetching campaign tasks:", error);
        } finally {
          setTaskLoading(false);
        }
      };

      fetchTasks();
    }
  }, [selectedSop]);

  const handleSopClick = (sop) => {
    setSelectedSop(sop);
    console.log("getSopTask",sop)
  };

  return (
    <main className="main_context position-relative">
      <div className="header d-flex justify-content-between align-items-center p-3">
        <div className="d-flex align-items-center">
          <div className="profile-circle me-3"></div>
          <span className="welcome-text fw-bold fst-italic text-muted">
            Welcome Back, Admin!
          </span>
        </div>
      </div>
      <div className="container mt-0 bg-white">
        <div className="row">
          <div className="d-flex justify-content-between mt-4">
            <button className="custom-search-button">
              <span>Search...</span>
              <i className="bi bi-search"></i>
            </button>
            <button className="rounded-button">
              <span>Create</span>
              <img src="assest/🦆 icon _plus_.png" alt="" />
            </button>
          </div>
        </div>
        <div className="container mt-5">
          <div className="custom-card">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-danger">Error: {error}</p>
            ) : (
              <ul className="list-group list-group-flush">
                {sopData.map((sop) => (
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
            <div className="campaign-header">{selectedSop.sopmastername}</div>
            <div className="row">
              <div className="col-12">
                {taskLoading ? (
                  <p>Loading tasks...</p>
                ) : (
                  campaignTasks.map((task) => (
                    <div className="campaign-check d-flex mb-3" key={task.id}>
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
    </main>
  );
};

export default SOPMaster;
