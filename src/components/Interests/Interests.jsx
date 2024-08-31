import React, { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import InterestModal from "../InterestModal/InterestModal";

const Interests = () => {
  const {
    mobileNo,
    DOB,
    name,
    gender,
    avatar,
    interest,
    handleYourOwnInterest,
    interestModal,
    setInterestModal,
    setInterest,
    setSignUp,
  } = useContext(LoginContext);
  const creativity = [
    "Art",
    "Design",
    "Makeup",
    "Singing",
    "Photography",
    "Writing",
    "Dancing",
    "Crafts",
  ];

  const formData = {
    mobileNo: mobileNo,
    DOB: DOB,
    name: name,
    gender: gender,
    avatar: avatar,
    interest: interest,
  };

  const sports = ["Yoga", "Running", "Gym", "Football", "Cricket", "Tennis"];
  const news = ["Abp", "Aajtak", "news24", "RepublicBharat"];

  const handleInterestItems = (item) => {
    const isSelected = interest.includes(item);

    if (isSelected) {
      setInterest(interest.filter((selectedItem) => selectedItem !== item));
    } else {
      if (interest.length == 5) {
        alert("you can't select more than 5!");
      } else setInterest([...interest, item]);
    }
  };

  const handleInterestSubmit = async () => {
    console.log(interest);
    console.log(formData);

    try {
      const response = await fetch(
        "https://asocial-backend-l8ro.onrender.com/signup",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        setSignUp("Account-Created");
      } else {
        alert(data.errors);
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("An error occurred during sign-up. Please try again.");
    }
  };

  return (
    <div className="interest">
      <div className="interest_imagePage">
        <img src="/images/interests/interest_image.png" />
      </div>

      <h1>Your Interests</h1>
      <p>Pick up to 5 things you Love. </p>
      <div className="interest_containter">
        <h3>Creativity</h3>
        <div className="category">
          {creativity.map((item, index) => (
            <div
              key={`creativity${index}`}
              className={`item ${
                interest.includes(item) ? "interest_selected" : ""
              }`}
              onClick={() => handleInterestItems(item)}
            >
              {item}
            </div>
          ))}
        </div>
        <h3>Sports</h3>
        <div className="category">
          {sports.map((item, index) => (
            <div
              key={`sports${index}`}
              className={`item ${
                interest.includes(item) ? "interest_selected" : ""
              }`}
              onClick={() => handleInterestItems(item)}
            >
              {item}
            </div>
          ))}
        </div>
        <h3>News</h3>
        <div className="category">
          {news.map((item, index) => (
            <div
              key={`news${index}`}
              className={`item ${
                interest.includes(item) ? "interest_selected" : ""
              }`}
              onClick={() => handleInterestItems(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <button className="interest_own" onClick={handleYourOwnInterest}>
        Enter your own
      </button>
      {interestModal && (
        <InterestModal
          setInterestModal={setInterestModal}
          interest={interest}
          setInterest={setInterest}
        />
      )}
      <button className="interest_next" onClick={handleInterestSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Interests;
