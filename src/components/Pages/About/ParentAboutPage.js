import React from "react";
import Navbar from "../../Navbar/Navbar";
import NavbarBottom from "../../Navbar/NavbarBottom";
import About from "./About";
const ParentAboutPage = () => {

  return (
    <div>
      <Navbar />
      <About />
      <NavbarBottom />
    </div>
  );
};

export default ParentAboutPage;
