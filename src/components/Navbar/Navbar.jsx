import React, { useContext } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";

const Navbar = () => {
  const { setSignUp } = useContext(LoginContext);
  const navigate = useNavigate();
  const handleLogin = async () => {
    navigate("/");
    setSignUp("welcome");
  };
  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link to={"/"} draggable="false">
          <img src="/images/logo.png" alt="" draggable="false" />
        </Link>
        <img src="/images/Asocial_image.png" alt="" draggable="false" />
      </div>
      <div className="menu-login">
        <ul className="nav-menu">
          <li>Home</li>
          <li>About Us</li>
          <li>Help</li>
          <li>Contact Us</li>
        </ul>
        <div className="nav-login-cart">
          <Link to={"/login"}>
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
