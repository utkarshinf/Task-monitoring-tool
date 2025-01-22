import React ,{ useState }from "react";
import "../style/style.css";
import Sidebar from "../Components/partial/Sidebar";
import Navbar from "../Components/partial/Navbar";

const Report = () => {
    const [sideClass, SetSideClass] = useState("");
    const [newClass, SetNewClass] = useState("");
      const [dashClass, setDashClass] = useState("");
      
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
    <main className="main_context position-relative d-flex"> 
    <Sidebar sideClass={sideClass} />
    <div className={`dashboard w-100 ${newClass}`}>
    <Navbar handleToggle={handleToggle} />
          <div className="h-100 w-100 overflow-hidden position-relative">
      <div className={` mb-5 bg-white h-100 ${dashClass}`}>
      <div className="d-flex justify-content-between mt-4"></div>
        </div>

        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="report-title">Report</h3>
            <div className="d-flex gap-2">
              <div className="custom-dropdown">
                <button
                  className="custom-btn dropdown-toggle px-3 py-2"
                  type="button"
                  id="dateRangeDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Date Range
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Today</a></li>
                  <li><a className="dropdown-item" href="#">This Week</a></li>
                  <li><a className="dropdown-item" href="#">Last Week</a></li>
                  <li><a className="dropdown-item" href="#">This month</a></li>
                  <li><a className="dropdown-item" href="#">Last Month</a></li>
                  <li><a className="dropdown-item" href="#">All</a></li>
                </ul>
              </div>
              <div className="custom-dropdown">
                <button
                  className="custom-btn dropdown-toggle px-3 py-2"
                  type="button"
                  id="teamWiseDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Team Wise
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Content Team</a></li>
                  <li><a className="dropdown-item" href="#">Digital Marketing Team</a></li>
                  <li><a className="dropdown-item" href="#">Branding Team</a></li>
                  <li><a className="dropdown-item" href="#">Graphing Team</a></li>
                  <li><a className="dropdown-item" href="#">Advertising Team</a></li>
                  <li><a className="dropdown-item" href="#">All Teams</a></li>
                </ul>
              </div>

              {/* Export Button */}
              <button className="custom-btn px-3 py-2">
                Export <i className="bi bi-file-earmark-arrow-down"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <div className="custom-card">
            <ul className="list-group list-group-flush">
              {[...Array(8)].map((_, idx) => (
                <li className="list-group-item" key={idx}>
                  ABc
                  <button className="btn-icon">
                    <i className="bi bi-pencil"></i>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 d-flex justify-content-end">
            <button className="create-btn">
              <i className="bi bi-plus"></i>
            </button>
          </div>
        </div>
      </div>
      </div>
    </main>
    </>
  );
};

export default Report;
