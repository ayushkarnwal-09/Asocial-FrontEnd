import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./ChatSection.css";
import { CiSearch } from "react-icons/ci";
import { LoginContext } from "../../contexts/LoginContext";
import MessengerChatBoxRightSide from "../MessengerChatBoxRightSide/MessengerChatBoxRightSide";
import { useSocket } from "../../contexts/SocketProvider";
import { io } from "socket.io-client";

const ChatSection = () => {
  const { userDetails, token } = useContext(LoginContext);
  const { socket, setSocket } = useSocket();
  const [userFriends, setUserFriends] = useState([]);
  const [messengerChatBoxOn, setMessengerChatBoxOn] = useState(false);
  const [messengerChatBoxUserSync, setMessengerChatBoxUserSync] = useState();
  const time = useRef();
  time.current = new Date();
  time.current = time.current + (5 * 60 + 30) * 60 * 1000;
  // connecting user to the socket.
  useEffect(() => {
    const socketInstance = io(
      "https://asocial-backend-l8ro.onrender.com:8000",
      {
        extraHeaders: {
          Authorization: token,
        },
      }
    );

    socketInstance.on("connect", async () => {
      setSocket(socketInstance);
      console.log("Connected to socket", socketInstance.id);
    });
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
        setSocket(null); // Set socket to null after disconnecting
        console.log("Socket disconnected and set to null");
      }
    };
  }, [token, setSocket]);

  // emitting chatRoom join

  useEffect(() => {
    if (socket) {
      socket.emit("chatRoom:join", userDetails.mobileNo);
      console.log(socket);
    }
  }, [userDetails.mobileNo, socket]);

  // fetching user friends
  const fetchUserFriends = useCallback(async () => {
    try {
      const response = await fetch(
        "https://asocial-backend-l8ro.onrender.com:4000/fetchUserFriends",
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
      console.log("Fetched friends:", data);
      setUserFriends(data);
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchUserFriends();
  }, [token, fetchUserFriends]);

  const handlemessengerNameBoxContainer = (user) => {
    setMessengerChatBoxOn(true);
    setMessengerChatBoxUserSync(user);
  };

  return (
    <div className="Messenger">
      <h3>Messages</h3>
      <div className="messengerBigbox">
        {/*left part NAME BOX */}
        <div className="messengerNameBox">
          <h5>All Messages</h5>
          <div className="messengerNameBox_searchbar">
            <CiSearch className="messengerNameBox_searchbaricon" />
            <input type="text" placeholder="Search here" />
          </div>
          {userFriends &&
            userFriends.map((friend, index) => (
              <div
                className="messengerNameBoxContainer"
                key={index}
                onClick={() => handlemessengerNameBoxContainer(friend)}
              >
                <div className="messengerNameBoxContainer_avatar">
                  <img src={friend.avatar} />
                </div>
                <div className="messengerNameBoxContainer_name">
                  {friend.name}
                </div>
                <div className="messengerNameBoxContainer_time">10:00 pm</div>
              </div>
            ))}
        </div>
        {/*Right part CHAT BOX */}
        {messengerChatBoxOn && (
          <MessengerChatBoxRightSide user={messengerChatBoxUserSync} />
        )}
      </div>
    </div>
  );
};

export default ChatSection;
