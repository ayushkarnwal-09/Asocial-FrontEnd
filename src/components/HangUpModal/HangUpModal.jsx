import React from "react";
import "./HangUpModal.css";
import { CgCloseR } from "react-icons/cg";

const HangUpModal = ({
  phoneNo,
  remotePhoneNo,
  callEndTimeRef,
  setHomeRightPanelSwitchCase,
}) => {
  const diffSeconds = Math.floor(callEndTimeRef.current / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);

  const handleAddPerson = async () => {
    console.log(phoneNo, remotePhoneNo);
    try {
      const response = await fetch("http://127.0.0.1:4000/sendRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNo, remotePhoneNo }),
      });
      if (!response.ok) {
        throw new Error("Failed to add friend");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Error from backend, error");
    }

    setHomeRightPanelSwitchCase("startNewConversation");
  };

  const handleCloseHangUpModal = () => {
    setHomeRightPanelSwitchCase("startNewConversation");
  };
  return (
    <>
      <div className="HangUp-wrapper" onClick={handleCloseHangUpModal}></div>
      <div className="HangUp-Modal">
        <CgCloseR
          className="closeHangUpModal"
          onClick={handleCloseHangUpModal}
        />
        <div className="hangUpModalImg">
          <img src="/images/hangUp/Hangup_image.png" />
        </div>
        <p>{`${diffHours} hours : ${diffMinutes}  minutes : ${diffSeconds} seconds`}</p>
        <h5>User has ended the call</h5>
        <div className="hangUpButton">
          <button onClick={handleAddPerson}>Add Friend</button>
          <button>Report</button>
        </div>
      </div>
    </>
  );
};

export default HangUpModal;
