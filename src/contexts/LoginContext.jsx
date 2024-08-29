import { createContext, useState, useRef } from "react";

export const LoginContext = createContext(null);

export const LoginContextProvider = (props) => {
  // VARIABLES
  const [signUp, setSignUp] = useState("welcome");
  const [mobileNo, setMobileNo] = useState("");
  const [verificationCode, setVerificationCode] = useState(null);
  const [values, setValues] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [DOB, setDOB] = useState(null);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [interest, setInterest] = useState([]);
  const [interestModal, setInterestModal] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("auth-token"));
  const [userDetails, setUserDetails] = useState();

  // FUNCTIONS

  const handleChange = (index, event) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);

    if (event.target.value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !values[index]) {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleScreenNameNext = () => {
    console.log(name, DOB);
    setSignUp("Gender");
  };

  const handleGenderNext = () => {
    console.log(name, DOB, gender);
    setSignUp("Avatar");
  };

  const handleAvatarClicked = async (e) => {
    const imageSrc = e.currentTarget.src;
    setAvatar(imageSrc);
    await console.log(avatar);
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      console.log(file);
      setAvatar(url);
    }
    await console.log(avatar);
  };

  const handleAvatarNext = () => {
    setSignUp("Interests");
  };

  const handleYourOwnInterest = () => {
    setInterestModal(!interestModal);
  };

  return (
    <LoginContext.Provider
      value={{
        signUp,
        setSignUp,
        mobileNo,
        setMobileNo,
        verificationCode,
        setVerificationCode,
        values,
        setValues,
        inputRefs,
        handleChange,
        handleKeyDown,
        DOB,
        setDOB,
        name,
        setName,
        handleScreenNameNext,
        gender,
        setGender,
        handleGenderNext,
        avatar,
        setAvatar,
        handleAvatarClicked,
        handleAvatarChange,
        handleAvatarNext,
        interest,
        setInterest,
        interestModal,
        setInterestModal,
        handleYourOwnInterest,
        token,
        userDetails,
        setUserDetails,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
