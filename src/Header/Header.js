import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import "./Header.css";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <div className="header-main">
      <h1>Adventurous Ride</h1>
      <ul>
        <li>
          <Link to="/home" className="headerLink">
            Home
          </Link>
        </li>
        <li>
          <Link to="/destination" className="headerLink">
            Destination
          </Link>
        </li>
        <li>
          <Link to="/login" className="headerLink">
            {loggedInUser.successIn ? `${loggedInUser.displayName}` : "Login"}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
