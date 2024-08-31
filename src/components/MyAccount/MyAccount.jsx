import React, { useContext, useState } from "react";
import "./MyAccount.css";
import { LoginContext } from "../../contexts/LoginContext";
import InterestModal from "../InterestModal/InterestModal";

const MyAccount = ({ setHomeRightPanelSwitchCase }) => {
  const { userDetails } = useContext(LoginContext);
  const [userDetailsInterest, setUserDetailsInterest] = useState(
    userDetails.interest
  );
  const [interestModal, setInterestModal] = useState(false);
  console.log(userDetailsInterest);
  const handleMyAccountClose = () => {
    setHomeRightPanelSwitchCase("startNewConversation");
  };

  const handleMyAccountInterests = async (item) => {
    try {
      const response = await fetch(
        "https://asocial-backend-l8ro.onrender.com:4000/removeInterestThroughMyAccount",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobileNo: userDetails.mobileNo,
            item: item,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setUserDetailsInterest(data.data);
    } catch (error) {
      console.log("Error in removing items:", error);
    }
  };
  return (
    <>
      <div className="myAccountModalWrapper"></div>;
      <div className="myAccountDiv">
        <div className="myAccountTitle">
          <h4>My Account</h4>
          <img
            src="/images/myAccount/close.png"
            onClick={handleMyAccountClose}
          />
        </div>
        <img className="myAccountImg" src={userDetails.avatar} />
        <div className="myAccountUserDetails">
          <div className="myAccountName">
            <label htmlFor="name" className="myAccountNameLabel">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="myAccountNameField"
              value={userDetails.name}
            />
          </div>
          <div className="myAccountGender">
            <label htmlFor="gender" className="myAccountNameLabel">
              Gender
            </label>
            <div className="myAccountGenderImg">
              <img src="/images/myAccount/male.png" />
              <img src="/images/myAccount/female.png" />
              <img src="/images/myAccount/nonbinary.png" />
            </div>
          </div>
          <div className="myAccountAge">
            <label htmlFor="age" className="myAccountNameLabel">
              DOB
            </label>
            <input
              type="text"
              id="name"
              className="myAccountNameField"
              value={userDetails.DOB}
            />
          </div>
          <div className="myAccountInterest">
            <div>
              <h3>Interests</h3>
            </div>

            <div className="myAccountInterestItems">
              {userDetailsInterest &&
                userDetailsInterest.map((item) => (
                  <div className="myAccountInterestItem">
                    <p>{item} </p>
                    <span onClick={() => handleMyAccountInterests(item)}>
                      x
                    </span>
                  </div>
                ))}
            </div>
          </div>
          <button
            className="interest_own"
            style={{ width: "100%", left: "0", marginTop: "5%" }}
            onClick={() => {
              setInterestModal(true);
            }}
          >
            Enter your own
          </button>
          {interestModal && (
            <InterestModal
              setInterestModal={setInterestModal}
              setUserDetailsInterest={setUserDetailsInterest}
            />
          )}
          <button
            className="interest_next"
            style={{ width: "100%", marginLeft: "0" }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
