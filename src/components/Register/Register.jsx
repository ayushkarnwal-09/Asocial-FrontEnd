import React, { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { setSignUp } = useContext(LoginContext);
  const handleRegisterButton = () => {
    navigate("/login");
    setSignUp("welcome");
  };

  return (
    <div className="register">
      <img src="/images/register/register_image.png" />
      <h1>Unlock these features with a free Asocial account.</h1>
      <div className="register_h4">
        <h4>- Set a profile picture or avatar.</h4>
        <h4>- Set a custom screen name.</h4>
        <h4>- Interest based matching.</h4>
      </div>
      <button onClick={handleRegisterButton}>Register</button>
    </div>
  );
};

export default Register;
