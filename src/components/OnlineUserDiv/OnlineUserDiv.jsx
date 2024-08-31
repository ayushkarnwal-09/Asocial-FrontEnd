import React from "react";
import "./OnlineUserDiv.css";

const OnlineUserDiv = ({ mobileNo, remoteMobileNo }) => {
  const handleBlockedUser = async () => {
    try {
      const response = await fetch(
        "https://asocial-backend-l8ro.onrender.com/addingUserToBlockedList",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mobileNo, remoteMobileNo }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Blocked user data:", data);

      // Handle the data or update the UI accordingly here
    } catch (error) {
      console.log("Error blocking user:", error);
    }
  };

  const handleUnfriendUser = async () => {
    try {
      const response = await fetch(
        "https://asocial-backend-l8ro.onrender.com/unfriend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mobileNo, remoteMobileNo }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Unfriend user data:", data);

      // Handle the data or update the UI accordingly here
    } catch (error) {
      console.log("Error blocking user:", error);
    }
  };

  return (
    <div className="onlineUserDiv">
      <p onClick={handleUnfriendUser}>Unfriend</p>
      <p>Report</p>
      <p onClick={handleBlockedUser}>Block</p>
    </div>
  );
};

export default OnlineUserDiv;
