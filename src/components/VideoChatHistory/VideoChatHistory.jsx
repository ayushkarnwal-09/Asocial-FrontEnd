import React, { useCallback, useContext, useEffect, useState } from "react";
import "./VideoChatHistory.css";
import { LoginContext } from "../../contexts/LoginContext";

const VideoChatHistory = () => {
  const { userDetails, token } = useContext(LoginContext);
  const [chatHistoryUsers, setChatHistoryUsers] = useState([]);

  const fetchVideoChatHistory = useCallback(async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:4000/fetchVideoChatHistory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mobileNo: userDetails.mobileNo }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setChatHistoryUsers(data);
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  }, [userDetails.mobileNo]);

  useEffect(() => {
    fetchVideoChatHistory();
  }, [token, fetchVideoChatHistory]);

  return (
    <div className="homepage_videoChatHistory">
      <h1>Video Chat History</h1>
      <div className="videoChatHistoryBlock">
        <h5>{`Video Chat History (${chatHistoryUsers.length})`}</h5>
        <div className="videoChatHistoryScrollerDiv">
          {chatHistoryUsers.map((user, index) => (
            <div key={index} className="chatHistoryUser">
              <div className="chatHistoryImgName">
                <img
                  className="userOnlineavatar"
                  src={user.avatar}
                  alt="Avatar"
                />
                <p>{user.name}</p>
              </div>
              <div className="historyUserButton">
                <button>Add Friend</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoChatHistory;
