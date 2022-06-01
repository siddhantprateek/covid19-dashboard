import React from 'react';
import { Link } from 'react-router-dom';
import './Header.styles.css';


const Header = () => {

  return (
    <header className='header-container'>
      <img src="" alt="logo" />
      <ul>
        <li>
          <Link to="/">
            Dasboard
          </Link>
        </li>
        <li>
          <Link to="/safety" >
            Safety Measures
          </Link>
        </li>
        <li>
          <Link to="/news">
            News
          </Link>
        </li>
        <li>
          <Link to="/aboutus">
            About Us
          </Link>
        </li>
        <li>
          <img src="" alt="user" />
        </li>
      </ul>
    </header>
  );
};

export default Header;