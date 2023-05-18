import React from "react";
import { Link } from "react-router-dom";
import "./NavigationalBar.css";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const NavigationalBar = () => {
  const { user, setUser } = useContext(AuthContext);
  const logOutHandle = () => {
    setUser(null);
    console.log("Log out");
    console.log("User value", user);
  };
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/shoes" className="navbar-link">
            Shoes
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/basket" className="navbar-link">
            Basket
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/profile" className="navbar-link">
            Profile
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/feedbacks" className="navbar-link">
            Feedbacks
          </Link>
        </li>
        <li className="navbar-item">
          <Link
            to="/login"
            className="navbar-link"
            onClick={() => logOutHandle()}
          >
            Log out
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationalBar;
