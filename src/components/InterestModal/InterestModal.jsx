import React, { useContext, useState } from "react";
import "./InterestModal.css";
import { LoginContext } from "../../contexts/LoginContext";

const InterestModal = ({
  setInterestModal,
  setUserDetailsInterest,
  interest,
  setInterest,
}) => {
  const [customInterest, setCustomInterest] = useState("");
  const { userDetails } = useContext(LoginContext);
  const handleEnterYourOwnInterestModal = () => {
    setInterestModal(false);
  };
  const handleCloseInterestModal = async (e) => {
    e.preventDefault();
    if (customInterest.length == 0) {
      alert("You stupid fellow! it can't be empty!!");
      return;
    }
    if (setInterestModal) {
      // If managing through the user's account
      try {
        const response = await fetch(
          "https://asocial-backend-l8ro.onrender.com/addingInterestThroughMyAccount",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              mobileNo: userDetails.mobileNo,
              item: customInterest,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        setUserDetailsInterest(data.data); // Update with new interests
      } catch (error) {
        console.log("Error in adding items:", error);
      }
    } else {
      if (interest.length == 5) {
        alert("you can't select more than 5!");
      }
      if (interest.includes(customInterest)) {
        alert("already selected");
      } else {
        if (interest.length < 5) {
          setInterest([...interest, customInterest]);
        }
      }
    }
    setInterestModal(false);
  };
  return (
    <>
      <div
        className="modal-wrapper"
        onClick={handleEnterYourOwnInterestModal}
      ></div>
      <div className="interest_modal">
        <div className="interest_modal_img_h1">
          <h1>Enter your own Interest.</h1>
          <img
            src="/images/interestModal/interest_close.png"
            onClick={handleEnterYourOwnInterestModal}
          />
        </div>
        <form onSubmit={handleCloseInterestModal} className="interestModalForm">
          <div className="interestModalInputAdd">
            <input
              value={customInterest}
              type="text"
              placeholder=" type your interest words here"
              onChange={(e) => setCustomInterest(e.target.value)}
            />
            <button className="interest_modal_add" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default InterestModal;
