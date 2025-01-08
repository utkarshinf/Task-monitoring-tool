import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { dashIconImg, logo, logoutIconImg, settingIconImg } from '../../utils'

const Sidebar = () => {
  return (
    <>
    <div className="siderbar pt-4 h-100">
        <div>
            <Link className="ms-5">
            <img src={logo} alt="Reality Assiatant" className="object-fit-contain"/>
            </Link>
            </div>
            <div className="d-flex flex-column justify-content-between sub_bar">
            <ul className="nav_list ps-0 mt-5">
                <li className="nav_item mb-2 list-unstyled"><NavLink className="text-white text-decoration-none ps-5 py-2 d-flex align-items-center" to="/admin-dashboard"><span><img src={dashIconImg} alt="Setting Icon" width={40}/></span> Dashboard</NavLink></li>
                <li className="nav_item mb-2 list-unstyled"><NavLink className="text-white text-decoration-none ps-5 py-2  d-flex">Management</NavLink></li>
                <li className="nav_item mb-2 list-unstyled"><NavLink className="text-white text-decoration-none ps-5 py-2  d-flex">SOP Master</NavLink></li>
                <li className="nav_item mb-2 list-unstyled"><NavLink className="text-white text-decoration-none ps-5 py-2  d-flex">Report</NavLink></li>
            </ul>
            <ul className="nav_list ps-0 mt-5 ">
            <li className="nav_item mb-2 list-unstyled"><NavLink className="text-white text-decoration-none ps-5 py-2 d-flex align-items-center" to="/admin-dashboard"> <span><img src={settingIconImg} alt="Setting Icon" width={40}/></span> Setting</NavLink></li>
                <li className="nav_item mb-2 list-unstyled"><NavLink className="text-white text-decoration-none ps-5 py-2  d-flex align-items-center"> 
                <span><img src={logoutIconImg} alt="Logout Icon" width={40}/></span>  Log Out</NavLink></li>
            </ul>
            </div>
       
    </div>
    </>
  )
}

export default Sidebar