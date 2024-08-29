import React, { useState } from "react";
import "./Friends.css";
import TotalOnline from "../TotalOnline/TotalOnline";
import AllFriends from "../AllFriends/AllFriends";
import SendRequest from "../SendRequest/SendRequest";
import NewRequest from "../NewRequest/NewRequest";
import Blocked from "../Blocked/Blocked";

const Friends = () => {
  const [friendsSliderSelected, setFriendsSliderSelected] = useState(0);

  const handleFriendsSlider = (index) => {
    setFriendsSliderSelected(index);
  };

  return (
    <div className="homepage_friendsDiv">
      <div className="friendsDiv_heading">
        <h1>Friends</h1>
      </div>
      <div className="friends_slider">
        {[
          "Online",
          "All Friends",
          "Send Request",
          "New Request",
          "Blocked",
        ].map((item, index) => (
          <>
            <div
              key={index}
              onClick={() => handleFriendsSlider(index)}
              style={{
                background:
                  friendsSliderSelected === index
                    ? "linear-gradient(90deg, #FD4E86 0%, #D67BEC 100%)"
                    : "",
                color: friendsSliderSelected === index ? "white" : "black",
                cursor: "pointer",
              }}
            >
              <p>{item}</p>
            </div>
          </>
        ))}
      </div>

      {/*Cases*/}
      {(() => {
        switch (friendsSliderSelected) {
          case 0:
            return (
              <>
                <TotalOnline />
              </>
            );

          case 1:
            return (
              <>
                <AllFriends />
              </>
            );
          case 2:
            return (
              <>
                <SendRequest />
              </>
            );
          case 3:
            return (
              <>
                <NewRequest />
              </>
            );
          case 4:
            return (
              <>
                <Blocked />
              </>
            );

          default:
            return null;
        }
      })()}
    </div>
  );
};

export default Friends;
