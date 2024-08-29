import React, { useState } from "react";
import "./MyAsocialDropDown.css";

const MyAsocialDropDown = ({
  myAsocialbuttonli,
  setHomeRightPanelSwitchCase,
}) => {
  const [myAccountWrapper, setmyAccountWrapper] = useState(false);
  const handledropdownButton = (item) => {
    if (item == "Friends") {
      setHomeRightPanelSwitchCase("Friends");
    }
    if (item == "Messages") {
      setHomeRightPanelSwitchCase("chatSection");
    }
    if (item == "Video Chat History") {
      setHomeRightPanelSwitchCase("VideoChatHistory");
    }
    if (item == "My Account") {
      setHomeRightPanelSwitchCase("myAccount");
    }
  };
  return (
    <ul className="myasocialdropdown">
      {myAsocialbuttonli.map((item) => (
        <li key={item} onClick={() => handledropdownButton(item)}>
          <p className="videoCallSidebarP">{item}</p>
        </li>
      ))}
    </ul>
  );
};

export default MyAsocialDropDown;
