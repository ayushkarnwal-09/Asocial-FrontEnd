import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Anonymous from "../components/Anonymous/Anonymous";
import Creative from "../components/Creative/Creative";
import TryForFree from "../components/TryForFree/TryForFree";
import Customs from "../components/Customs/Customs";
import AutoRoll from "../components/AutoRoll/AutoRoll";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Anonymous />
      <Creative />
      <TryForFree />
      <AutoRoll />
      <Customs />
      <Footer />
    </>
  );
};

export default Home;
