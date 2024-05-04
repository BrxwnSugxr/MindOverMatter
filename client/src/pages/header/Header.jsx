import React from 'react';

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    window.location.href = '/';
  };
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
      </li>
    </ul>
  );
};

export default Header;
