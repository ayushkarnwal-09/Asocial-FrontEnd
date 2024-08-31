import React, { useCallback, useContext, useEffect, useState } from "react";
import "./Blocked.css";
import { LoginContext } from "../../contexts/LoginContext";

const Blocked = () => {
  const { userDetails, token } = useContext(LoginContext);

  const [blockedUsers, setBlockedUsers] = useState([]);

  const fetchBlockedUsers = useCallback(async () => {
    try {
      const response = await fetch(
        "https://asocial-backend-l8ro.onrender.com:4000/fetchBlockedUsers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mobileNo: userDetails.mobileNo }),
        }
      );
      console.log(userDetails.mobileNo);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Fetched Blocked Users:", data);
      setBlockedUsers(data);
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchBlockedUsers();
  }, [token, fetchBlockedUsers]);

  return (
    <div className="blocked">
      <h5>
        Blocked {blockedUsers.length > 0 ? `(${blockedUsers.length})` : "(0)"}
      </h5>
      {blockedUsers.length > 0 ? (
        <div className="totalOnlineScrollerDiv">
          {blockedUsers.map((user, index) => (
            <div key={index} className="userContainer">
              <div className="onlineUserImgName">
                <img
                  className="userOnlineavatar"
                  src={user.avatar}
                  alt="Avatar"
                />
                <p>{user.name}</p>
              </div>
              <div className="blockedButton">
                <button>Blocked</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h5>No Blocked Users!</h5>
      )}
    </div>
  );
};

export default Blocked;
