import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import WelcomePage from "../components/WelcomePage/WelcomePage";
import { LoginContextProvider } from "../contexts/LoginContext";

const LoginSignUp = () => {
  return (
    <>
      <Navbar />
      <WelcomePage />
    </>
  );
};

export default LoginSignUp;
