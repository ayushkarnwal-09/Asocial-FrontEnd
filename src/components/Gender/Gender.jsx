import React, { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";

const Gender = () => {
  const { gender, setGender, handleGenderNext } = useContext(LoginContext);
  return (
    <div className="gender">
      <div className="gender_page_image">
        <img src="images/gender/gender_page.png" />
      </div>
      <h1>Gender</h1>
      <p>Only once to choose.</p>
      <div className="gender_selection">
        <img
          onClick={() => setGender("male")}
          src="/images/gender/male.png"
          style={{
            cursor: "pointer",
            border:
              gender === "male" ? "2px solid blue" : "2px solid transparent",
          }}
        />
        <img
          onClick={() => setGender("female")}
          src="/images/gender/female.png"
          style={{
            cursor: "pointer",
            border:
              gender === "female" ? "2px solid blue" : "2px solid transparent",
          }}
        />
        <img
          onClick={() => setGender("nonbinary")}
          src="/images/gender/nonbinary.png"
          style={{
            cursor: "pointer",
            border:
              gender === "nonbinary"
                ? "2px solid blue"
                : "2px solid transparent",
          }}
        />
      </div>

      <button className="genderButton" onClick={handleGenderNext}>
        Next
      </button>
    </div>
  );
};

export default Gender;
