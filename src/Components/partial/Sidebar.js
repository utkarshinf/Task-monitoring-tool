import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { dashIconImg, logo, logoutIconImg, settingIconImg } from '../../utils';

const Sidebar = ({sideClass}) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={`siderbar pt-4 h-100 ${sideClass}`}>
      <div>
        <NavLink className="ms-5" to="/admin-dashboard">
          <img src={logo} alt="Reality Assistant" className="object-fit-contain" />
        </NavLink>
      </div>
      <div className="d-flex flex-column justify-content-between sub_bar">
        <ul className="nav_list ps-0 mt-5">
          <li className="nav_item mb-2 list-unstyled">
            <NavLink className="text-white text-decoration-none ps-5 py-2 d-flex align-items-center" to="/admin-dashboard">
              <span>
                <img src={dashIconImg} alt="Dashboard Icon" width={40} />
              </span>
              Dashboard
            </NavLink>
          </li>
          <li className="nav_item mb-2 list-unstyled">
            <NavLink className="text-white text-decoration-none ps-5 py-2 d-flex" to="/management">
              Management
            </NavLink>
          </li>
          <li className="nav_item mb-2 list-unstyled">
            <NavLink className="text-white text-decoration-none ps-5 py-2 d-flex" to="/sop-master">
              SOP Master
            </NavLink>
          </li>
          <li className="nav_item mb-2 list-unstyled">
            <NavLink className="text-white text-decoration-none ps-5 py-2 d-flex" to="/report">
              Report
            </NavLink>
          </li>
        </ul>
        <ul className="nav_list ps-0 mt-5">
          <li className="nav_item mb-2 list-unstyled">
            <NavLink className="text-white text-decoration-none ps-5 py-2 d-flex align-items-center" to="/settings">
              <span>
                <img src={settingIconImg} alt="Setting Icon" width={40} />
              </span>
              Settings
            </NavLink>
          </li>
          <li className="nav_item mb-2 list-unstyled">
            <button
              className="text-white text-decoration-none ps-5 py-2 d-flex align-items-center bg-transparent border-0"
              onClick={handleLogout}
            >
              <span>
                <img src={logoutIconImg} alt="Logout Icon" width={40} />
              </span>
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

