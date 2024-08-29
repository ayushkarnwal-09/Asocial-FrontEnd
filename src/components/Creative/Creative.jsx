import React from "react";
import "./Creative.css";

const Creative = () => {
  return (
    <div className="creative">
      <div className="left-c">
        <img src="/images/creative.png" />
      </div>
      <div className="right-c">
        <h1>Creative</h1>
        <img src="/images/splash.png" alt="" />
        <h2>Create Avatar & Upload your Own Image.</h2>
        <p>
          Introducing our revolutionary anonymous video calling feature,
          designed to prioritize privacy and provide a secure space for candid
          conversations. With this cutting-edge capability, users can engage in
          video calls without revealing their personal information, fostering a
          sense of confidentiality and freedom. Introducing our revolutionary
          anonymous video calling feature, designed to prioritize privacy and
          provide a secure space for candid conversations.
        </p>
        <button>View</button>
      </div>
    </div>
  );
};

export default Creative;
