import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./Header.styles.css";

const Header = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  return (
    <header className="header-container">
      <img src="" alt="logo" />
      <ul>
        <li>
          <Link to="/">Dasboard</Link>
        </li>
        <li>
          <Link to="/safety">Safety Measures</Link>
        </li>
        <li>
          <Link to="/news">News</Link>
        </li>
        <li>
          <Link to="/aboutus">About Us</Link>
        </li>
        {
          isAuthenticated && (
            <li onClick={() => logoutWithRedirect()}>log Out</li>
        )}
        {isAuthenticated && (          
            <li>
              <img className="user-image" src={user.picture} alt={user.name} />
            </li>
        )}
        {!isAuthenticated && (
          <li onClick={() => loginWithRedirect()}>Sign In</li>
        )}
      </ul>
    </header>
  );
};

export default Header;
