import React, { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

const ScreenName = () => {
  const { DOB, name, setName, setDOB, handleScreenNameNext } =
    useContext(LoginContext);
  return (
    <div className="screenName">
      <div className="screen_images">
        <img src="images/screenName/screen_name.png" />
        <p>......</p>
        <img src="images/screenName/screen_gender.png" />
        <p>......</p>
        <img src="images/screenName/screen_avatar.png" />
        <p>......</p>
        <img src="images/screenName/screen_interest.png" />
      </div>
      <h1>Your Screen Name</h1>
      <p>Enter your name.</p>
      <input
        className="screen_name"
        type="text"
        value={name}
        placeholder="Screen Name / nickname"
        onChange={(e) => setName(e.target.value)}
      />
      <h1>Date of Birth</h1>
      <p>You must be 18 or above to use Asocial</p>
      <div className="custom-date-picker">
        <FaCalendarAlt className="calendar-icon" />

        <DatePicker
          selected={DOB}
          onChange={(date) => setDOB(date)}
          placeholderText="DD/MM/YYYY"
          dateFormat="dd/MM/yyyy"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      </div>
      <button className="screenNameButton" onClick={handleScreenNameNext}>
        Next
      </button>
    </div>
  );
};

export default ScreenName;
