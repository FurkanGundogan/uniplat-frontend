import React from "react";
import Navbar from "../../Navbar/Navbar";
import NavbarBottom from "../../Navbar/NavbarBottom";
import SearchPage from "./SearchPage";
const ParentSearchPage = () => {

  return (
    <div>
      <Navbar />
      <SearchPage />
      <NavbarBottom />
    </div>
  );
};

export default ParentSearchPage;
