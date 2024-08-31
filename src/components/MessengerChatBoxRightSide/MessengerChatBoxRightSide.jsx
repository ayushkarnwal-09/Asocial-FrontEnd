import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./MessengerChatBoxRightSide.css";
import { LoginContext } from "../../contexts/LoginContext";
import { useSocket } from "../../contexts/SocketProvider";
import { LuSend } from "react-icons/lu";

const MessengerChatBoxRightSide = ({ user }) => {
  const { userDetails, token } = useContext(LoginContext);
  const [userMessage, setUserMessage] = useState("");
  const [userMessageArr, setUserMessageArr] = useState([]);
  const { socket } = useSocket();
  // to scroll msg down
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messageArr changes
  useEffect(() => {
    scrollToBottom();
  }, [userMessageArr]);

  const fetchUsermessageHistory = useCallback(async () => {
    try {
      const response = await fetch(
        "https://asocial-backend-l8ro.onrender.com/fetchUsermessageHistory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobileNo: userDetails.mobileNo,
            targetMobileNo: user.mobileNo,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Fetched message arr:", data);
      setUserMessageArr(data.messages);
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  }, [token, user]);

  useEffect(() => {
    fetchUsermessageHistory();
  }, [user, fetchUsermessageHistory]);

  const handleUserMessage = async (e) => {
    e.preventDefault();

    if (userMessage.trim() === "") {
      alert("enter Message before clicking send!! you stupid fellow!!");
      return; // Do nothing if the input is empty
    }

    const obj = { msg: userMessage, mobileNo: userDetails.mobileNo };
    try {
      const response = await fetch(
        "https://asocial-backend-l8ro.onrender.com/fetchUpdatingUserHistoryMessage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            obj,
            mobileNo: userDetails.mobileNo,
            targetMobileNo: user.mobileNo,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("message Array updated:", data);
      setUserMessageArr(data.messages);
    } catch (error) {
      console.log("Error in updating message history:", error);
    }

    socket.emit("chatMessage");

    console.log(userMessageArr);
    setUserMessage("");
  };

  useEffect(() => {
    socket.on(
      "receive-chatMessage",
      () => {
        fetchUsermessageHistory();
      },
      [fetchUsermessageHistory]
    );

    return () => {
      socket.off("receive-chatMessage");
    };
  }, [token, user]);

  return (
    <div className="messengerChatBox">
      <div className="messengerChatBoxTitle">
        <div className="messengerChatBoxTitleAvatar">
          <img src={user.avatar} />
        </div>
        <div className="messengerChatBoxTitleName">
          <h5>{user.name}</h5>
          <p>Online</p>
        </div>
        <div className="messengerChatBoxTitleDots">
          <img src="/images/messangerChatBoxRightSide/dots.svg" />
        </div>
      </div>
      <hr className="messengerChatBoxHrLine" />
      <div className="messengerChatBoxMessages">
        {Array.isArray(userMessageArr) &&
          userMessageArr.map((m, i) => (
            <div
              key={i}
              className="messengerChatBoxcontainer"
              style={{
                flexDirection:
                  userDetails.mobileNo === m.mobileNo ? "row-reverse" : "",
                alignSelf:
                  userDetails.mobileNo === m.mobileNo
                    ? "flex-end"
                    : "flex-start",
              }}
            >
              <div className="messengerChatBoxcontainerImgDiv">
                <img
                  src={
                    userDetails.mobileNo === m.mobileNo
                      ? user.avatar
                      : userDetails.avatar
                  }
                />
              </div>
              <div
                className="messengerChatBoxUserMessage"
                style={{
                  background:
                    userDetails.mobileNo === m.mobileNo
                      ? "rgba(219, 116, 220, 1)"
                      : "rgba(243, 243, 243, 1)",
                  color:
                    userDetails.mobileNo === m.mobileNo ? "white" : "black",
                  borderRadius:
                    userDetails.mobileNo === m.mobileNo
                      ? "20px 20px 0px 20px"
                      : "20px 20px 20px 0px",
                }}
              >
                <p>{m.msg}</p>
              </div>
            </div>
          ))}
        <div
          ref={messagesEndRef}
          style={{ background: "white", height: "0" }}
        />
      </div>
      <hr className="messengerChatBoxHrLine" />
      <div className="messengerChatBoxEnterMessage">
        <form
          className="messengerChatBoxEnterMessage_form"
          onSubmit={handleUserMessage}
        >
          <input
            type="text"
            placeholder="Type a Message"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <LuSend
            onClick={handleUserMessage}
            className="messengerChatBoxEnterMessage_formSendButton"
          />
        </form>
      </div>
    </div>
  );
};

export default MessengerChatBoxRightSide;
