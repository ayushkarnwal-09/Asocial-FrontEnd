import React, { useCallback, useContext, useEffect, useState } from "react";
import "./AllFriends.css";
import { LoginContext } from "../../contexts/LoginContext";
import OnlineUserDiv from "../OnlineUserDiv/OnlineUserDiv";
const AllFriends = () => {
  const { userDetails, token } = useContext(LoginContext);

  const [allFriendsFetchData, setAllFriendsFetchData] = useState([]);
  const [selectedUserDialogueBox, setSelectedUserDialogueBox] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);

  const handleUserOnlineDialogueBox = (index) => {
    if (!selectedUserDialogueBox) {
      setSelectedUserDialogueBox(true);
      setSelectedUserIndex(index);
    } else {
      setSelectedUserDialogueBox(false);
      setSelectedUserIndex(null);
    }
  };

  // fetching user friends
  const fetchUserFriends = useCallback(async () => {
    try {
      const response = await fetch("http://127.0.0.1:4000/fetchUserFriends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobileNo: userDetails.mobileNo }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Fetched friends:", data);
      setAllFriendsFetchData(data);
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchUserFriends();
  }, [token, fetchUserFriends]);

  return (
    <div className="allFriends">
      <h5>All Friends {`(${allFriendsFetchData.length})`}</h5>
      {allFriendsFetchData.length > 0 ? (
        <div className="totalOnlineScrollerDiv">
          {allFriendsFetchData.map((user, index) => (
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
      ) : (
        <h5>No Friends!!</h5>
      )}
    </div>
  );
};

export default AllFriends;
