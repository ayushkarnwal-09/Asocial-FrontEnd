import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../contexts/SocketProvider";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const SocketJoining = ({
  phoneNo,
  room,
  token,
  setHomeRightPanelSwitchCase,
}) => {
  const { socket, setSocket } = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    const socketInstance = io("https://asocial-backend-l8ro.onrender.com");

    socketInstance.on("connect", async () => {
      setSocket(socketInstance);
      console.log("Connected to socket", socketInstance.id);
    });
  }, [token, setSocket]);

  const handleJoinRoom = useCallback(
    (data) => {
      const { phoneNo, room } = data;
      setHomeRightPanelSwitchCase("roomPage");
    },
    [navigate]
  );

  useEffect(() => {
    if (socket) {
      socket.emit("room:join", { phoneNo, room });
      console.log(socket);
    }
  }, [phoneNo, room, socket]);

  useEffect(() => {
    if (socket) {
      socket.on("room:join", handleJoinRoom);
      return () => {
        socket.off("room:join", handleJoinRoom);
      };
    }
  }, [handleJoinRoom, socket]);

  return (
    <>
      <div>SocketJoining...</div>
    </>
  );
};

export default SocketJoining;
