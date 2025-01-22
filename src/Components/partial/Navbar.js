import React, { useState, useRef } from 'react';
import { FaSearch, FaBell, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaBars } from 'react-icons/fa6';

const Navbar = ({handleToggle}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const [calenderOpen,setIsCalenderOpen] =useState(false)
  const [userName] = useState("Admin");
  const searchInputRef = useRef(null); 

  const handleSearchIconClick = () => {
    setIsSearchOpen(true); 
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);
  };

  const handleSearchBlur = () => {
    setIsSearchOpen(false);
  };

  const toggleCalender = () => {
    setIsCalenderOpen((prev)=> !prev);
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsCalenderOpen(false)
  }


  return (
    <nav className="navbar bg-light py-3 px-4 shadow-sm rounded-end-4 rounded-bottom-0">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="navbar-user d-flex align-items-center">
          <span className="fw-bold">Welcome back {userName}</span>
          <FaBars className='ms-3 fs-4' onClick={handleToggle}/>
        </div>
        <div className='d-flex'>
        <div className="navbar-calendar d-flex align-items-center">
          <FaCalendarAlt className="me-2" size={16} />
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MMMM d, yyyy"
            className=" border-0 bg-light fw-bold"
            calendarClassName="custom-calendar"
          />
        </div>
        <div className="navbar-search position-relative me-5">
          <FaSearch 
            className="search-icon position-absolute end-0 top-50 me-3" 
            onClick={handleSearchIconClick} 
            style={{ cursor: 'pointer' }} 
          />
          {isSearchOpen && (
            <input
              ref={searchInputRef}
              type="text"
              className="form-control rounded-pill px-4 search-input"
              placeholder="Search..."
              onBlur={handleSearchBlur}
            />
          )}
        </div>
        <div className="navbar-notification position-relative">
          <FaBell size={24} className="notification-icon" />
          <span className="notification-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            3
          </span>
        </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
