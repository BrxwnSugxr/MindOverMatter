import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setIsLoggedIn(false);
    window.location.href = '/';
  };
  return (
    <ul className="header-items">
      <li>
        <Link to="/">Home</Link>
      </li>
      {isLoggedIn && (
        <li>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      )}
    </ul>
  );
};

export default Header;
