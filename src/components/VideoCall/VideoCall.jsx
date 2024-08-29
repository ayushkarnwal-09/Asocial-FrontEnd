import React, { useCallback, useEffect, useRef, useState } from "react";
import "./VideoCall.css";
import "bootstrap/dist/css/bootstrap.min.css";
import VideoCallSidebar from "../VideoCallSidebar/VideoCallSidebar";
import SocketJoining from "../SocketJoining/SocketJoining";
import RoomPage from "../../pages/RoomPage";
import Friends from "../Friends/Friends";
import ChatSection from "../ChatSection/ChatSection";
import VideoChatHistory from "../VideoChatHistory/VideoChatHistory";
import { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import MyAccount from "../MyAccount/MyAccount";

const VideoCall = () => {
  // page variables
  const [videoCall_left, setVideoCall_left] = useState(false);
  const [homeRightPanelSwitchCase, setHomeRightPanelSwitchCase] = useState(
    "startNewConversation"
  );
  // fetch userDetails
  const { userDetails, setUserDetails } = useContext(LoginContext);
  const { token } = useContext(LoginContext);
  // videocall variables
  const [phoneNo, setPhoneNo] = useState();
  const [room, setRoom] = useState();

  // fetching token

  const handleLeftPanel = () => {
    setVideoCall_left(!videoCall_left);
  };

  // fetch userdetails useEffect
  const fetchUserDetails = useCallback(async () => {
    if (!token) {
      console.log("No token found");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:4000/userDetails", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      setUserDetails(data.user);
    } catch (error) {
      console.log("Error fetching user details, error");
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchUserDetails(token);
    }
  }, [token, fetchUserDetails]);

  // setting user online in database.

  const setOnlineUser = useCallback(async () => {
    const { ["_id"]: removedKey, ...rest } = userDetails;

    try {
      const response = await fetch("http://127.0.0.1:4000/setOnlineUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rest),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Server response:", result);
    } catch (error) {
      console.error("Error during setOnlineUser request:", error);
    }
  }, [userDetails]);

  useEffect(() => {
    if (userDetails) {
      console.log(userDetails);
      setPhoneNo(userDetails.mobileNo);
      setRoom(1); // Set room number to 1 as per the requirement
      console.log(phoneNo);
      setOnlineUser();
    }
  }, [userDetails, setOnlineUser]);

  // videocall function

  // Functions
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setHomeRightPanelSwitchCase("socketJoining");
  };

  return (
    <div className="videocall">
      {/* react left sidebar*/}
      {videoCall_left && (
        <VideoCallSidebar
          videoCall_left={videoCall_left}
          setHomeRightPanelSwitchCase={setHomeRightPanelSwitchCase}
        />
      )}

      <div className={`videoCall_rightpanel ${videoCall_left ? "shrink" : ""}`}>
        <img
          className="videoCallPanelButton"
          src="images/videoCall/leftPanelButton.png"
          onClick={handleLeftPanel}
        />

        {/* Right Side*/}

        {(() => {
          switch (homeRightPanelSwitchCase) {
            case "startNewConversation":
              return (
                <>
                  <div className="newConversation">
                    <h1>Start New Conversation.</h1>
                  </div>
                  <form onSubmit={handleSubmitForm}>
                    <button className="joinButtonHomepage">Join</button>
                  </form>
                </>
              );

            case "socketJoining":
              return (
                <SocketJoining
                  phoneNo={phoneNo}
                  room={room}
                  token={token}
                  setHomeRightPanelSwitchCase={setHomeRightPanelSwitchCase}
                />
              );
            case "roomPage":
              return (
                <RoomPage
                  phoneNo={phoneNo}
                  setHomeRightPanelSwitchCase={setHomeRightPanelSwitchCase}
                />
              );

            case "Friends":
              return <Friends />;

            case "chatSection":
              return <ChatSection />;

            case "VideoChatHistory":
              return <VideoChatHistory />;

            case "myAccount":
              return (
                <MyAccount
                  setHomeRightPanelSwitchCase={setHomeRightPanelSwitchCase}
                />
              );

            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
};

export default VideoCall;
