import React, { useContext, useRef } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { useNavigate } from "react-router-dom";

const VerificationCode = () => {
  const {
    mobileNo,
    values,
    handleChange,
    handleKeyDown,
    inputRefs,
    verificationCode,
    setSignUp,
  } = useContext(LoginContext);

  const navigate = useNavigate();
  const formData = { mobileNo: mobileNo };

  const handleVerificationSubmit = async () => {
    if (+values.join("") === verificationCode) {
      try {
        const response = await fetch(
          "https://asocial-backend-l8ro.onrender.com:4000/login",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (data.success) {
          localStorage.setItem("auth-token", data.token);
          navigate("/home");
        } else {
          navigate("/signup");
          setSignUp("ScreenName");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again.");
      }
    } else {
      alert("Incorrect verification code. Please try again.");
    }
  };
  return (
    <div className="verification-form">
      <h1>Verification Code</h1>
      <p id="syntax">
        Please enter the verification code sent to your mobile number.
      </p>
      <img
        src="/images/verificationCode/verifyTick.png"
        alt="Verification Tick"
      />
      <div className="number-boxes-container">
        {values.map((value, index) => (
          <input
            key={index}
            className="number-box"
            value={value}
            maxLength="1"
            onChange={(event) => handleChange(index, event)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}
      </div>
      <div className="resend">
        <p>Didn't receive the code?</p>
        <h4>Resend Code</h4>
      </div>
      <button onClick={handleVerificationSubmit}>Submit</button>
    </div>
  );
};

export default VerificationCode;
