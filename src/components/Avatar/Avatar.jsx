import React, { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";

const Avatar = () => {
  const { avatar, handleAvatarChange, handleAvatarClicked, handleAvatarNext } =
    useContext(LoginContext);
  return (
    <div className="avatar">
      <div className="avatar_page_image">
        <img src="images/avatar/avatar_page.png" />
      </div>
      <h1>Avatar</h1>
      <p>Select the avatar you like.</p>
      <div className="avatar_L1">
        <div className="custom_input">
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />
          <label htmlFor="fileInput" className="avatar_customLabel">
            <img
              className="avatar_customLabel_img"
              src={avatar === null ? "images/avatar/pic_1.png" : avatar}
              style={{
                width: "100%",
                height: "90%",
                objectFit: "cover",
                overflow: "hidden",
              }}
            />
          </label>
        </div>

        <img
          src="images/avatar/pic_2.png"
          onClick={handleAvatarClicked}
          style={{
            cursor: "pointer",
            border:
              avatar === "/images/avatar/pic_2.png"
                ? "2px solid blue"
                : "2px solid transparent",
          }}
        />
        <img
          src="images/avatar/pic_3.png"
          onClick={handleAvatarClicked}
          style={{
            cursor: "pointer",
            border:
              avatar === "/images/avatar/pic_3.png"
                ? "2px solid blue"
                : "2px solid transparent",
          }}
        />
      </div>
      <div className="avatar_L2">
        <img
          src="images/avatar/pic_4.png"
          onClick={handleAvatarClicked}
          style={{
            cursor: "pointer",
            border:
              avatar === "/images/avatar/pic_4.png"
                ? "2px solid blue"
                : "2px solid transparent",
          }}
        />
        <img
          src="images/avatar/pic_5.png"
          onClick={handleAvatarClicked}
          style={{
            cursor: "pointer",
            border:
              avatar === "/images/avatar/pic_5.png"
                ? "2px solid blue"
                : "2px solid transparent",
          }}
        />
        <img
          src="images/avatar/pic_6.png"
          onClick={handleAvatarClicked}
          style={{
            cursor: "pointer",
            border:
              avatar === "/images/avatar/pic_6.png"
                ? "2px solid blue"
                : "2px solid transparent",
          }}
        />
      </div>
      <div className="avatar_L3">
        <img
          src="images/avatar/pic_7.png"
          onClick={handleAvatarClicked}
          style={{
            cursor: "pointer",
            border:
              avatar === "/images/avatar/pic_7.png"
                ? "2px solid blue"
                : "2px solid transparent",
          }}
        />
        <img
          src="images/avatar/pic_8.png"
          onClick={handleAvatarClicked}
          style={{
            cursor: "pointer",
            border:
              avatar === "/images/avatar/pic_8.png"
                ? "2px solid blue"
                : "2px solid transparent",
          }}
        />
        <img
          src="images/avatar/pic_9.png"
          onClick={handleAvatarClicked}
          style={{
            cursor: "pointer",
            border:
              avatar === "/images/avatar/pic_9.png"
                ? "2px solid blue"
                : "2px solid transparent",
          }}
        />
      </div>

      <button className="avatarButton" onClick={handleAvatarNext}>
        Next
      </button>
    </div>
  );
};

export default Avatar;
