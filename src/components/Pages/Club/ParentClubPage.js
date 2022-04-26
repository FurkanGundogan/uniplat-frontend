import React from "react";
import MainClubPage from "./MainClubPage";
import Navbar from "../../Navbar/Navbar";
import NavbarBottom from "../../Navbar/NavbarBottom";
const ParentClubPage = () => {

  return (
    <div>
      <Navbar />
      <MainClubPage />
      <NavbarBottom />
    </div>
  );
};

export default ParentClubPage;
