import React from "react";
import MainProfilePage from "./MainProfilePage";
import Navbar from "../../Navbar/Navbar";
import NavbarBottom from "../../Navbar/NavbarBottom";
const ParentProfilePage = () => {

  return (
    <div>
      <Navbar />
      <MainProfilePage />
      <NavbarBottom />
    </div>
  );
};

export default ParentProfilePage;
