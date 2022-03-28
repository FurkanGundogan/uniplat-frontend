import React from "react";
import MainSocialPage from "./MainSocialPage";
import Navbar from "../../Navbar/Navbar";
import NavbarBottom from "../../Navbar/NavbarBottom";
const ParentSocialPage = () => {

  return (
    <div>
      <Navbar />
      <MainSocialPage />
      <NavbarBottom />
    </div>
  );
};

export default ParentSocialPage;
