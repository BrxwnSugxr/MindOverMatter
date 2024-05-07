import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <ul>
        <li>
          <NavLink to="/contact">Contact Us</NavLink>
        </li>
        <li>
          <a href="http://www.instagram.com">Instgram</a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
