import React, { useContext } from "react";
import "./TryForFree.css";
import { LoginContext } from "../../contexts/LoginContext";
import { Link } from "react-router-dom";

const TryForFree = () => {
  const { setSignUp } = useContext(LoginContext);
  return (
    <div className="tryforfree">
      <div className="left-co">
        <img className="try_logo" src="/images/try_logo.png" alt="" />
        <img className="try_splash" src="/images/splash.png" alt="" />
        <h1>Easily Connect Video Calling without Sign up</h1>
        <p>
          Video calling without sign-up refers to the ability to participate in
          video calls or conferences without the need to create an account or
          log in with personal credentials. This approach is designed to offer a
          more convenient and accessible experience for users who want to join a
          video meeting quickly without the commitment of registering for a
          platform.
        </p>
        <Link to={"/tryforfree"}>
          <button onClick={() => setSignUp("tryForFree")}>Try for free</button>
        </Link>
      </div>
      <div className="right-co">
        <img src="/images/Try_for_free.png" alt="'" />
      </div>
    </div>
  );
};

export default TryForFree;
