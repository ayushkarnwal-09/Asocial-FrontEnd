import "./App.css";
import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignUp from "./pages/LoginSignUp";
import TryForFree from "./pages/TryForFree";
import SignUp from "./pages/SignUp";
import HomeVideoCall from "./pages/HomeVideoCall";
import { SocketProvider } from "./contexts/SocketProvider";
import RoomPage from "./pages/RoomPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <SocketProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginSignUp />} />
            <Route path="/verification" element={<LoginSignUp />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/tryforfree" element={<TryForFree />} />
            <Route path="/home" element={<HomeVideoCall />} />
            <Route path="/room/:roomId" element=<RoomPage /> />
          </Routes>
        </SocketProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
