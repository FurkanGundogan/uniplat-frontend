import React from "react";
import MainHomePage from "./MainHomePage";
import Navbar from "../../Navbar/Navbar";
import NavbarBottom from "../../Navbar/NavbarBottom";
const ParentHomePage = () => {

  return (
    <div>
      <Navbar />
      <MainHomePage />
      <NavbarBottom />
    </div>
  );
};

export default ParentHomePage;
