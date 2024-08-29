import React from "react";
import "./AutoRoll.css";

const AutoRoll = () => {
  return (
    <div className="autoroll">
      <div className="left-cont">
        <img className="roll_circle" src="/images/roll_circle.png" alt="" />
        <img
          className="roll_girl"
          src="/images/autoroll/roll_girl.png"
          alt=""
        />
        <img className="roll_boy" src="/images/autoroll/roll_boy.png" alt="" />
        <img
          className="roll_women"
          src="/images/autoroll/roll_women.png"
          alt=""
        />
      </div>
      <div className="right-cont">
        <img src="images/autoroll/roll_heading.png" alt="" />
        <img className="roll_splash" src="images/splash.png" alt="" />
        <h1>Convinience and Efficiency to the next level.</h1>
        <p>
          The Auto Roll feature in our video calling app takes convenience and
          efficiency to the next level, ensuring that your virtual meetings
          begin seamlessly with minimal effort. No more navigating through
          multiple screens or settings—simply set your preferences, and let Auto
          Roll take care of the rest.
        </p>
      </div>
    </div>
  );
};

export default AutoRoll;
