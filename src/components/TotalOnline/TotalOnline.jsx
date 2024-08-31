import React, { useCallback, useContext, useEffect, useState } from "react";
import "./TotalOnline.css";
import { LoginContext } from "../../contexts/LoginContext";
import OnlineUserDiv from "../OnlineUserDiv/OnlineUserDiv";

const TotalOnline = () => {
  const [onlineAllUsers, setOnlineAllUsers] = useState([]);
  const [onlineUserLength, setOnlineUserLength] = useState(null);
  const [selectedUserDialogueBox, setSelectedUserDialogueBox] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const { userDetails, token } = useContext(LoginContext);

  const handleUserOnlineDialogueBox = (index) => {
    if (!selectedUserDialogueBox) {
      setSelectedUserDialogueBox(true);
      setSelectedUserIndex(index);
    } else {
      setSelectedUserDialogueBox(false);
      setSelectedUserIndex(null);
    }
  };

  // fetching online users
  const fetchOnlineUser = useCallback(async () => {
    try {
      const response = await fetch(
        "https://asocial-backend-l8ro.onrender.com/onlineUserDetails",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setOnlineAllUsers(data);
      setOnlineUserLength(data.length);
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchOnlineUser();
  }, [token, fetchOnlineUser]);

  return (
    <div className="totalOnline">
      <h5>Total Online {`(${onlineUserLength})`}</h5>
      <div className="totalOnlineScrollerDiv">
        {onlineAllUsers.map((user, index) => (
          <div key={index} className="userContainer">
            <div className="onlineUserImgName">
              <img
                className="userOnlineavatar"
                src={user.avatar}
                alt="Avatar"
              />
              <p>{user.name}</p>
            </div>
            <div className="onlineUserImgBox">
              <img
                className="UserOnlineDot"
                src="/images/OnlineFriend/Dot.png"
                alt="Online Dot"
                onClick={() => handleUserOnlineDialogueBox(index)}
              />
              {selectedUserDialogueBox && selectedUserIndex === index && (
                <OnlineUserDiv
                  mobileNo={userDetails.mobileNo}
                  remoteMobileNo={user.mobileNo}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalOnline;
