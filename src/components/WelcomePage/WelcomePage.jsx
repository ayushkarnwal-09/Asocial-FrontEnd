import React, { useContext, useRef, useState } from "react";
import "./WelcomePage.css";

import "react-phone-input-2/lib/style.css";
import Welcome from "../Welcome/Welcome";
import VerificationCode from "../VerificationCode/VerificationCode";
import Welcome_Tryforfree from "../Welcome_Tryforfree/Welcome_Tryforfree";
import Register from "../Register/Register";
import ScreenName from "../ScreenName/ScreenName";
import Gender from "../Gender/Gender";
import Avatar from "../Avatar/Avatar";
import Interests from "../Interests/Interests";
import { LoginContext } from "../../contexts/LoginContext";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const { signUp } = useContext(LoginContext);
  const navigate = useNavigate();
  const handleAccountCreated = () => {
    navigate("/home");
  };
  return (
    <>
      <div className="welcome">
        <div className="left-conta">
          <img src="/images/login/rectangle.png" alt="" />
        </div>
        <div className="right-conta">
          <img src="/images/login/login_logo.png" alt="" draggable="false" />
          <img src="/images/login/login_group.png" alt="" draggable="false" />
          <img src="/images/login/login_video.png" alt="" draggable="false" />
        </div>
      </div>
      {(() => {
        switch (signUp) {
          case "welcome":
            return <Welcome />;
          case "verificationCode":
            return <VerificationCode />;
          case "tryForFree":
            return <Welcome_Tryforfree />;

          case "Register":
            return <Register />;

          case "ScreenName":
            return <ScreenName />;

          case "Gender":
            return <Gender />;

          case "Avatar":
            return <Avatar />;

          case "Interests":
            return <Interests />;

          case "Account-Created":
            return (
              <div className="account_created">
                <img src="/images/accountCreated/account_created.png" />
                <h1>Account Created</h1>
                <p>
                  Dear user your account has been created successfully continue
                  to start using App.
                </p>
                <button onClick={handleAccountCreated}>Get Started</button>
              </div>
            );

          default:
            return null;
        }
      })()}
    </>
  );
};

export default WelcomePage;
