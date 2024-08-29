import React, { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";

const Welcome_Tryforfree = () => {
  const { setSignUp } = useContext(LoginContext);
  return (
    <div className="tryForFree">
      <h1>Try For Free</h1>
      <p>Enter your details.</p>
      <div className="tryforfreeName">
        <h3>Name</h3>
        <input type="text" placeholder="  Screen Name/ Nick Name" />
      </div>
      <div className="try_gender">
        <h3>Gender</h3>
        <div className="try_gender_selection">
          <div className="try_fit_img">
            <img
              className="male"
              src="/images/tryForFree/try_rectangle.png"
              alt="Male"
            />
            <img
              className="male1"
              src="/images/tryForFree/try_male.png"
              alt="Male Icon"
            />
            <span>Male</span>
          </div>
          <div className="try_fit_img">
            <img
              className="female"
              src="/images/tryForFree/try_rectangle.png"
              alt="Female"
            />
            <img
              className="female1"
              src="/images/tryForFree/try_female.png"
              alt="Female Icon"
            />
            <span>Female</span>
          </div>
          <div className="try_fit_img">
            <img
              className="binary"
              src="/images/tryForFree/try_rectangle.png"
              alt="Non-binary"
            />
            <img
              className="binary1"
              src="/images/tryForFree/try_nonbinary.png"
              alt="Non-binary Icon"
            />
            <span>Non-binary</span>
          </div>
        </div>
      </div>
      <button onClick={() => setSignUp("Register")}>Submit</button>
    </div>
  );
};

export default Welcome_Tryforfree;
