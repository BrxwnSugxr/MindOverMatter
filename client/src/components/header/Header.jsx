import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './Header.css';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const { loggedInUser } = useContext(AuthContext);
  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.href = '/';
  };
  return (
    <ul className="link-items">
      {isLoggedIn ? (
        <>
          <li>
            <NavLink to="/events-list">Events List</NavLink>
          </li>
          {loggedInUser?.user?.type == 'user' && (
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
          )}
          {loggedInUser?.admin?.type === 'admin' && (
            <li>
              <NavLink to="/dashboard">Add Event</NavLink>
            </li>
          )}
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/contact">Contact Us</NavLink>
      </li>
    </ul>
  );
};

export default Header;
