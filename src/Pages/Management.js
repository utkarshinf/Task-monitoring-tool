import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from "../Components/partial/Sidebar";
import { toggleFormVisibility, setFormVisibility } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getTeams, registerUser } from "../services/apiService";
import Navbar from "../Components/partial/Navbar";

const Management = () => {
  const isFormVisible = useSelector((state) => state.auth.isFormVisible);
  const dispatch = useDispatch();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [newClass, SetNewClass] = useState("");
  const [sideClass, SetSideClass] = useState("");
  const [formClass, setFormClass] = useState("");
  const [dashClass, setDashClass] = useState("");

  const [selectedTask, setSelectedTask] = useState(null);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    user_role: "",
    departmentid: "",
    teamid: "",
    managerid: "",
    password: "",
  });

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsData = await getTeams();
        console.log("Teams Data:", teamsData);
        if (Array.isArray(teamsData)) {
          setTeams(teamsData);
        } else if (teamsData?.team) {
          setTeams(teamsData.team);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching teams data", error);
      }
    };
    fetchTeams();
  }, []);

  // const toggleForm = () => {
  //   dispatch(toggleFormVisibility());
  // };

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

  const closeForm = () => {
    dispatch(setFormVisibility(false));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      departmentid: parseInt(formData.departmentid, 10),
      teamid: parseInt(formData.teamid, 10),
      managerid: parseInt(formData.managerid, 10),
      user_role: formData.user_role.toLowerCase(),
    };

    try {
      const response = await registerUser(formattedData);
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        user_role: "",
        departmentid: "",
        teamid: "",
        managerid: "",
        password: "",
      });
      closeForm();
    } catch (error) {
      console.error("Error:", error);
    }
  };
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTeams = teams.filter(
    (team) =>
      team.teamname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.user?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <main className="main_context position-relative d-flex">
        <Sidebar sideClass={sideClass} />
        <div className={`dashboard w-100 ${newClass}`}>
          <Navbar handleToggle={handleToggle} />

          <div className="h-100 w-100 overflow-hidden position-relative">
            <div className={` mb-5 bg-white h-100 ${dashClass}`}>

              
              <div className="row">
                <div className="container mt-4">
                  <h3 className="fw-bold management">Management</h3>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <input
                    type="text"
                    className="form-control w-50"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <div className="d-flex align-items-center gap-3">
                    <i className="bi bi-trash icon-trash"></i>
                    <button
                      className="btn btn-add-new px-4 py-2 d-flex align-items-center gap-2"
                      onClick={toggleTaskForm}
                    >
                      Add New <i className="bi bi-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="container mt-5">
                <div className="row">
                  <table className="table custom-table">
                    <thead>
                      <tr>
                        <th className="checkbox-column"></th>
                        <th className="user-column">User</th>
                        <th className="role-column">Role</th>
                        <th className="team-column">Team</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            Loading...
                          </td>
                        </tr>
                      ) : filteredTeams.length > 0 ? (
                        filteredTeams.map((team, index) => (
                          <tr key={index}>
                            <td>
                              <input type="checkbox" />
                            </td>
                            <td>{team.user || "N/A"}</td>
                            <td>{team.role || "N/A"}</td>
                            <td>{team.teamname}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No results match your search.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div
              className={`container form-container position-absolute top-0 end-0 ${formClass}`}
            >
              <div className="task-form position-absolute end-0 bg-white py-3 px-2">
                  <button
                    className="btn-close position-absolute top-0 end-0 me-3 mt-3"
                    onClick={closeForm}
                    aria-label="Close"
                  ></button>
                  <div className="row justify-content-center">
                    <div className="col-md-10">
                      <div className="task-form position-absolute end-0 bg-white py-3 px-2">
                        <h3 className="mb-4 fw-bold">Add User</h3>
                        <form onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <input
                              type="text"
                              className="form-control custom-input"
                              placeholder="First Name"
                              name="firstname"
                              value={formData.firstname}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-3">
                            <input
                              type="text"
                              className="form-control custom-input"
                              placeholder="Last Name"
                              name="lastname"
                              value={formData.lastname}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-3">
                            <input
                              type="email"
                              className="form-control custom-input"
                              placeholder="Email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-3">
                            <input
                              type="tel"
                              className="form-control custom-input"
                              placeholder="Phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-3">
                            <input
                              type="text"
                              className="form-control custom-input"
                              placeholder="Role"
                              name="user_role"
                              value={formData.user_role}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-3">
                            <input
                              type="text"
                              className="form-control custom-input"
                              placeholder="Department ID"
                              name="departmentid"
                              value={formData.departmentid}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-3">
                            <input
                              type="text"
                              className="form-control custom-input"
                              placeholder="Team ID"
                              name="teamid"
                              value={formData.teamid}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-3">
                            <input
                              type="text"
                              className="form-control custom-input"
                              placeholder="Manager ID"
                              name="managerid"
                              value={formData.managerid}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-3">
                            <input
                              type="password"
                              className="form-control custom-input"
                              placeholder="Password"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                            />
                          </div>
                          <button
                            type="submit"
                            className="btn submit-btn custom-submit-btn"
                          >
                            Add User
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
               
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Management;
