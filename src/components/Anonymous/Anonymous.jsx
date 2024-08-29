import React, { useContext } from "react";
import "./Anonymous.css";
import { LoginContext } from "../../contexts/LoginContext";
import { Link } from "react-router-dom";

const Anonymous = () => {
  const { setSignUp } = useContext(LoginContext);
  return (
    <div className="anonymous">
      <div className="left">
        <h3>Best Video Calling around the world.</h3>
        <img src="/images/Anonymous.png" alt="" />
        <h1>Video Calling & Chat</h1>
        <p>
          Introducing our revolutionary anonymous video calling feature,
          designed to prioritize privacy and provide a secure space for candid
          conversations. With this cutting-edge capability, users can engage in
          video calls without revealing their personal information, fostering a
          sense of confidentiality and freedom.
        </p>
        <Link to={"/login"}>
          <button type="button" onClick={() => setSignUp("welcome")}>
            Login
          </button>
        </Link>
      </div>
      <div className="right">
        <img src="/images/banner_img.png" alt="" />
      </div>
    </div>
  );
};

export default Anonymous;
