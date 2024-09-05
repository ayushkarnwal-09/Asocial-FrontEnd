import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactPlayer from "react-player";
import { useSocket } from "../contexts/SocketProvider";
import peer from "../service/peer";
import "./RoomPage.css";
import MessageApp from "../components/MessageApp/MessageApp";
import { IoMdPersonAdd } from "react-icons/io";
import HangUpModal from "../components/HangUpModal/HangUpModal";
import { LoginContext } from "../contexts/LoginContext";

const RoomPage = ({ setHomeRightPanelSwitchCase, phoneNo }) => {
  const { socket } = useSocket();
  const { userDetails } = useContext(LoginContext);
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [remotePhoneNo, setRemotePhoneNo] = useState();
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [messageApp, setMessageApp] = useState(false);
  const [messageArr, setMessageArr] = useState([]);
  const [acceptCall, setAcceptCall] = useState(false);
  const callStartTimeRef = useRef(null);
  const callEndTimeRef = useRef(null);
  const [hangUp, setHangUp] = useState(false);
  const [callHistory, setCallHistory] = useState(false);

  const handleUserJoined = useCallback(({ phoneNo, id }) => {
    console.log(`PhoneNo ${phoneNo} joined the room.`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log("incomming call", from, offer);
      const ans = await peer.getAnswer(offer);
      console.log(ans, "handleIncommingCall .........");
      console.log("FROM", from);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
    setAcceptCall(true);
    const currentTime = new Date();
    const istOffset = 5 * 60 + 30; // IST is UTC+5:30, so the offset in minutes is 330
    // currentISTTime = startTime
    const startTime = new Date(currentTime.getTime() + istOffset * 60 * 1000);
    callStartTimeRef.current = startTime;

    socket.emit("setRemoteCallStart", {
      Id: remoteSocketId,
      startTimer: startTime,
    });
    socket.emit("exchangePhoneNo", { phoneNo, Id: remoteSocketId });
  }, [myStream]);

  const handleCallAccepted = useCallback(
    async (from, ans) => {
      console.log("Call Accepted from:", from);
      console.log("Answer:", ans);
      await peer.setLocalDescription(from.ans);
      console.log("Call Accepted");

      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  const handleReceiveMessage = async (data) => {
    const obj = { message: data.message, socketId: data.socketId };
    setMessageArr((messages) => [...messages, obj]);
  };

  const handleHangUp = useCallback(async () => {
    const currentTime = new Date();
    const istOffset = 5 * 60 + 30; // IST is UTC+5:30, so the offset in minutes is 330
    const currentISTTime = new Date(
      currentTime.getTime() + istOffset * 60 * 1000
    );
    console.log(currentISTTime);
    const callDuration = currentISTTime - new Date(callStartTimeRef.current);
    callEndTimeRef.current = callDuration;
    setCallHistory(true);
    setHangUp(true);

    if (myStream) {
      myStream.getTracks().forEach((track) => track.stop());
    }

    socket.emit("call:hangup", { to: remoteSocketId, endTime: callDuration });
    setMyStream(null);
    setRemoteStream(null);
    setRemoteSocketId(null);
    // setHomeRightPanelSwitchCase("startNewConversation");
    socket.disconnect();
  }, [socket, remoteSocketId, setHomeRightPanelSwitchCase, myStream]);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      console.log("Got tracks!!");
      setRemoteStream(ev.streams[0]);
    });
  }, [setRemoteStream]);

  const handleAddCallHistory = useCallback(async () => {
    try {
      const response = await fetch(
        "https://asocial-backend-l8ro.onrender.com/addCallHistory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobileNo: userDetails.mobileNo,
            remoteMobileNo: remotePhoneNo,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Call history added successfully:", data);
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  });

  useEffect(() => {
    if (callHistory) {
      console.log(userDetails.mobileNo, remotePhoneNo);
      handleAddCallHistory();
    }
  }, [callHistory, handleAddCallHistory]);

  const handleRemoteHangUp = (endTime) => {
    callEndTimeRef.current = endTime;
    setHangUp(true);
    if (myStream) {
      myStream.getTracks().forEach((track) => track.stop());
    }
    setMyStream(null);
    setRemoteStream(null);
    setRemoteSocketId(null);
    socket.disconnect();
  };

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);
    socket.on("receivePhoneNo", async (data) => {
      setRemotePhoneNo(data);
      await console.log("Remote Phone No : ", remotePhoneNo);
    });
    socket.on("receive-message", handleReceiveMessage);
    socket.on("call:hangup", handleRemoteHangUp);
    socket.on("setCallStart", (startTimer) => {
      callStartTimeRef.current = startTimer;
    });

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
      socket.off("receivePhoneNo");
      socket.off("receive-message", handleReceiveMessage);
      socket.off("setCallStart");
      socket.off("call:hangup", handleRemoteHangUp);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
    handleReceiveMessage,
    handleRemoteHangUp,
  ]);

  return (
    <>
      <div className={`roomPage_div ${messageApp ? "roomPageShrink" : ""}`}>
        {remoteStream && (
          <img
            className={`messageAppButton ${
              messageApp ? "messageAppButtonShrink" : ""
            }`}
            src="images/roompage/messageApp.png"
            onClick={() => setMessageApp(!messageApp)}
          />
        )}
        {remoteSocketId && !myStream && (
          <button className="roompage_callButton" onClick={handleCallUser}>
            CALL
          </button>
        )}
        {myStream && remoteStream && !acceptCall && (
          <button className="roompage_sendStreamButton" onClick={sendStreams}>
            Accept Call
          </button>
        )}
        {myStream && remoteStream && (
          <button className="roompage_callButton" onClick={handleHangUp}>
            Hang Up
          </button>
        )}
        <div className="roompage_streaming">
          {myStream && (
            <>
              <ReactPlayer
                className={`roompage_myStream ${
                  messageApp ? "roompage_myStreamShrink" : ""
                }`}
                style={messageApp ? { right: "22%" } : { right: "2%" }}
                url={myStream}
                playing
              />
            </>
          )}
          {remoteStream && (
            <>
              <ReactPlayer
                className="roompage_remoteStream"
                url={remoteStream}
                playing
              />
            </>
          )}
        </div>
      </div>
      {remoteStream && messageApp && (
        <MessageApp
          remoteSocketId={remoteSocketId}
          messageArr={messageArr}
          setMessageApp={setMessageApp}
        />
      )}
      {hangUp && (
        <HangUpModal
          phoneNo={phoneNo}
          remotePhoneNo={remotePhoneNo}
          callEndTimeRef={callEndTimeRef}
          setHomeRightPanelSwitchCase={setHomeRightPanelSwitchCase}
        />
      )}
    </>
  );
};

export default RoomPage;
