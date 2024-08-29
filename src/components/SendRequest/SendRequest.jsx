import React, { useCallback, useEffect, useState } from "react";
import "./SendRequest.css";
import { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";

const SendRequest = () => {
  const { userDetails, token } = useContext(LoginContext);
  const [SentRequestUsers, setSentRequestUsers] = useState([]);
  const [SentRequestUsersLength, setSentRequestUsersLength] = useState(0);

  const fetchUserSentRequests = useCallback(async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:4000/fetchUserSentRequests",
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
      console.log("Send Request Users:", data);
      setSentRequestUsers(data);
      setSentRequestUsersLength(data.length);
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  }, [userDetails.mobileNo]);

  useEffect(() => {
    fetchUserSentRequests();
  }, [fetchUserSentRequests]);

  const handleSentRequestCancel = async (remoteMobileNo) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:4000/handleSentRequestCancel",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobileNo: userDetails.mobileNo,
            remoteMobileNo,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      fetchUserSentRequests();
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  };

  return (
    <div className="sendRequest">
      <h5>
        Send Request{" "}
        {SentRequestUsersLength ? `(${SentRequestUsersLength})` : "(0)"}
      </h5>
      {SentRequestUsers.length > 0 ? (
        <div className="totalOnlineScrollerDiv">
          {SentRequestUsers.map((user, index) => (
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
                <button onClick={() => handleSentRequestCancel(user.mobileNo)}>
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h5>No Send Requests!</h5>
      )}
    </div>
  );
};

export default SendRequest;
