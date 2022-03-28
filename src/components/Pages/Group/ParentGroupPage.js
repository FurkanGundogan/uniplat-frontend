import React from "react";
import MainGroupPage from "./MainGroupPage";
import Navbar from "../../Navbar/Navbar";
import NavbarBottom from "../../Navbar/NavbarBottom";
const ParentGroupPage = () => {

  return (
    <div>
      <Navbar />
      <MainGroupPage />
      <NavbarBottom />
    </div>
  );
};

export default ParentGroupPage;
