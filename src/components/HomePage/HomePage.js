import React from "react";
import Navbar from "../Navbar/Navbar";
import NavbarBottom from "../Navbar/NavbarBottom";
import MainHomePage from "./MainHomePage";
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <MainHomePage />
      <NavbarBottom />
    </div>
  );
};

export default HomePage;
