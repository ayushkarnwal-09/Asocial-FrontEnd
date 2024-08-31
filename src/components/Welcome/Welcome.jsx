import React, { useContext } from "react";
import PhoneInput from "react-phone-input-2";
import { LoginContext } from "../../contexts/LoginContext";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const { mobileNo, setMobileNo, setSignUp, setVerificationCode } =
    useContext(LoginContext);
  const handleWelcomeSkipButton = () => {
    navigate("/tryforfree");
    setSignUp("tryForFree");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numericMobileNo = +mobileNo;
    console.log(numericMobileNo);

    try {
      const response = await fetch(
        "https://asocial-backend-l8ro.onrender.com/sendSms",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mobileNo: numericMobileNo }),
        }
      );

      const data = await response.json();
      console.log("Response from backend:", data);
      setVerificationCode(data.code);
      navigate("/verification");
      setSignUp("verificationCode");
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
  };

  return (
    <div className="login-form">
      <img src="/images/login/Welcome.png" alt="Welcome" />
      <p>A new and exciting way to meet people.</p>
      <form onSubmit={handleSubmit}>
        <div className="mobile">
          <PhoneInput
            country={"in"}
            value={mobileNo}
            onChange={(phone) => {
              setMobileNo(phone);
            }}
          />
        </div>
        <label className="login_checkbox">
          <input type="checkbox" /> Agree to our <a href="#">Terms</a> and{" "}
          <a href="#">Data policy</a>.
        </label>
        <button className="welcome_verification_code" type="submit">
          Get Verification code
        </button>
        <button
          className="welcome_skipButton"
          onClick={handleWelcomeSkipButton}
        >
          Skip SignUp
        </button>
      </form>
    </div>
  );
};

export default Welcome;
