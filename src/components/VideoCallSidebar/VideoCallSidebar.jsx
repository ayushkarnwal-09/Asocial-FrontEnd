import React, { useState, useEffect } from "react";
import "./VideoCallSidebar.css";
import { CiVideoOn } from "react-icons/ci";
import MyAsocialDropDown from "../MyAsocialDropDown/MyAsocialDropDown";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const VideoCallSidebar = ({ videoCall_left, setHomeRightPanelSwitchCase }) => {
  const [myAsocialButton, setMyAsocialButton] = useState();
  const [leftPanelProfileButton, setLeftPanelProfileButton] = useState(false);
  const [leftPanelSettingButton, setLeftPanelSettingButton] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [videoCallSidebarClickedButton, setVideoCallSidebarClickedButton] =
    useState("Video Chat");
  const navigate = useNavigate();

  console.log(showContent);

  useEffect(() => {
    if (videoCall_left) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 20);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowContent(false);
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [videoCall_left]);

  const myAsocialbutton = ["Friends", "Messages", "Video Chat History"];
  const profilebutton = ["My Account"];
  const settingbutton = [
    "Privacy Policy",
    "Terms and Conditions",
    "Interest Matching",
  ];

  const handleSidebarLogoutButton = () => {
    localStorage.removeItem("auth-token");
    navigate("/");
  };

  const handleVideoChatButton = () => {
    setHomeRightPanelSwitchCase("startNewConversation");
    setVideoCallSidebarClickedButton("Video Chat");
  };

  const handleMyAsocialButton = () => {
    setMyAsocialButton(!myAsocialButton);
    setVideoCallSidebarClickedButton("My Asocial");
  };

  const handleProfileButton = () => {
    setLeftPanelProfileButton(!leftPanelProfileButton);
    setVideoCallSidebarClickedButton("Profile");
  };

  const handleSettingButton = () => {
    setLeftPanelSettingButton(!leftPanelSettingButton);
    setVideoCallSidebarClickedButton("Settings");
  };

  return (
    <div
      className={`videoCall_leftpanel ${
        showContent ? "videoCall_leftpanel_show" : ""
      }`}
    >
      <img
        src="images/videoCall/VideoCall_Logo.png"
        className="videoCallleftpanelimg"
      />
      <button
        className="videocall_videochat"
        onClick={handleVideoChatButton}
        style={{
          background:
            videoCallSidebarClickedButton === "Video Chat" ? "white" : "none",
          color:
            videoCallSidebarClickedButton === "Video Chat"
              ? "rgba(219, 116, 220, 1)"
              : "white",
        }}
      >
        <CiVideoOn className="videoCallSidebarIcon" />
        <p className="videoCallSidebarP">Video Chat</p>
        <img
          className="videoCallSidebarArrowImage"
          src="images/videoCall/Arrow_right.png"
        />
      </button>

      <div className="myasocialbuttondiv">
        <button
          className="myasocialbutton"
          onClick={handleMyAsocialButton}
          style={{
            background:
              videoCallSidebarClickedButton === "My Asocial" ? "white" : "none",
            color:
              videoCallSidebarClickedButton === "My Asocial"
                ? "rgba(219, 116, 220, 1)"
                : "white",
            marginTop: "3%",
          }}
        >
          <img
            src="images/videoCall/MyAsocialButton.png"
            className="videoCallSidebarIcon"
          />
          <p className="videoCallSidebarP">My Asocial</p>
          <img
            src="images/videoCall/Arrow_right.png"
            className="videoCallSidebarArrowImage"
          />
        </button>
        {myAsocialButton && (
          <MyAsocialDropDown
            myAsocialbuttonli={myAsocialbutton}
            setHomeRightPanelSwitchCase={setHomeRightPanelSwitchCase}
          />
        )}
      </div>

      <div className="profilebuttondiv">
        <button
          className="leftpanelprofilebutton"
          onClick={handleProfileButton}
          style={{
            background:
              videoCallSidebarClickedButton === "Profile" ? "white" : "none",
            color:
              videoCallSidebarClickedButton === "Profile"
                ? "rgba(219, 116, 220, 1)"
                : "white",
            marginTop: "3%",
          }}
        >
          <img
            src="images/videoCall/Group.png"
            className="videoCallSidebarIcon"
          />
          <p className="videoCallSidebarP">Profile</p>
          <img
            src="images/videoCall/Arrow_right.png"
            className="videoCallSidebarArrowImage"
          />
        </button>
        {leftPanelProfileButton && (
          <MyAsocialDropDown
            myAsocialbuttonli={profilebutton}
            setHomeRightPanelSwitchCase={setHomeRightPanelSwitchCase}
          />
        )}
      </div>

      <div className="settingsbuttondiv">
        <button
          className="leftpanelsettingsbutton"
          onClick={handleSettingButton}
          style={{
            background:
              videoCallSidebarClickedButton === "Settings" ? "white" : "none",
            color:
              videoCallSidebarClickedButton === "Settings"
                ? "rgba(219, 116, 220, 1)"
                : "white",
            marginTop: "3%",
          }}
        >
          <img
            src="images/videoCall/setting.png"
            className="videoCallSidebarIcon"
          />
          <p className="videoCallSidebarP">Settings</p>
          <img
            src="images/videoCall/Arrow_right.png"
            className="videoCallSidebarArrowImage"
          />
        </button>
        {leftPanelSettingButton && (
          <MyAsocialDropDown myAsocialbuttonli={settingbutton} />
        )}
      </div>
      <button
        className="logoutSidebarButton"
        onClick={handleSidebarLogoutButton}
        style={{ marginLeft: "2%" }}
      >
        <MdOutlineLogout className="videoCallSidebarIcon" />
        <p className="videoCallSidebarP">Logout</p>
      </button>
    </div>
  );
};

export default VideoCallSidebar;
