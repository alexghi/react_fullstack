import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Student Management</Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink 
            to="/" 
            className={isActive => isActive ? "nav-link active" : "nav-link"}
            end
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/students" 
            className={isActive => isActive ? "nav-link active" : "nav-link"}
          >
            Students
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/homeworks" 
            className={isActive => isActive ? "nav-link active" : "nav-link"}
          >
            Homeworks
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;