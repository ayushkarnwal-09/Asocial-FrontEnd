import React from "react";
import "./Customs.css";

const Customs = () => {
  return (
    <div className="customs">
      <div className="left-con">
        <img src="/images/Custom.png" alt="" />
        <img className="customs_splash" src="/images/splash.png" alt="" />
        <h1>Customs Interest and Create your own Interest</h1>
        <p>
          Introducing our revolutionary anonymous video calling feature,
          designed to prioritize privacy and provide a secure space for candid
          conversations. With this cutting-edge capability, users can engage in
          video calls without revealing their personal information, fostering a
          sense of confidentiality and freedom. Introducing our revolutionary
          anonymous video calling feature, designed to prioritize privacy and
          provide a secure space for candid conversations.
        </p>
      </div>

      <div className="right-con">
        <img className="squares" src="/images/squares.png" alt="" />
        <img className="girl" src="/images/girl.png" alt="" />
      </div>
    </div>
  );
};

export default Customs;
