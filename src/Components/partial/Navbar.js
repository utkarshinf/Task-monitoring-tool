import React, { useState, useRef } from 'react';
import { FaSearch, FaBell, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Navbar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSearchOpen, setIsSearchOpen] = useState(true);
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

  return (
    <nav className="navbar bg-light py-3 px-4 shadow-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="navbar-user d-flex align-items-center">
          <span className="fw-bold">{userName}</span>
        </div>
        <div className="navbar-calendar d-flex align-items-center">
          <FaCalendarAlt className="me-2" size={20} />
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MMMM d, yyyy"
            className="form-control border-0 bg-light fw-bold"
            calendarClassName="custom-calendar"
          />
        </div>
        <div className="navbar-search position-relative">
          <FaSearch 
            className="search-icon" 
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
    </nav>
  );
};

export default Navbar;
