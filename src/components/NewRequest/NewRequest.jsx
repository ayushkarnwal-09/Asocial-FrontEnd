import React, { useCallback, useContext, useEffect, useState } from "react";
import "./NewRequest.css";
import { LoginContext } from "../../contexts/LoginContext";

const NewRequest = () => {
  const { userDetails } = useContext(LoginContext);
  const [newRequestUsers, setNewRequestUsers] = useState([]);
  const [newRequestUsersLength, setNewRequestUsersLength] = useState(0);

  const fetchUserNewRequests = useCallback(async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:4000/fetchUserNewRequests",
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
      console.log("New Request Users:", data);
      setNewRequestUsers(data);
      setNewRequestUsersLength(data.length);
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  }, [userDetails.mobileNo]);

  useEffect(() => {
    fetchUserNewRequests();
  }, [fetchUserNewRequests]);

  const handleNewRequestConfirmButton = async (remoteMobileNo) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:4000/acceptingNewRequest",
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
      fetchUserNewRequests();
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  };

  const handleNewRequestCancelButton = async (remoteMobileNo) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:4000/cancellingNewRequest",
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
      fetchUserNewRequests();
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  };

  return (
    <div className="newRequest">
      <h5>
        New Request{" "}
        {newRequestUsersLength ? `(${newRequestUsersLength})` : "(0)"}
      </h5>
      {newRequestUsers.length > 0 ? (
        <div className="newRequestScrollerDiv">
          {newRequestUsers.map((user, index) => (
            <div key={index} className="newRequestContainer">
              <div className="newRequest2div">
                <div className="newRequestImg">
                  <img
                    className="newRequestAvatar"
                    src={user.avatar}
                    alt="Avatar"
                  />
                </div>
                <div className="newRequestname">
                  <h5>{user.name}</h5>
                  <p>Sent you a friend request</p>
                </div>
              </div>
              <div className="newRequestButton">
                <button
                  className="newRequestCancelButton"
                  onClick={() => handleNewRequestCancelButton(user.mobileNo)}
                >
                  Cancel
                </button>
                <button
                  className="newRequestConfirmButton"
                  onClick={() => handleNewRequestConfirmButton(user.mobileNo)}
                >
                  Confirm
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h5>No New Request!</h5>
      )}
    </div>
  );
};

export default NewRequest;
