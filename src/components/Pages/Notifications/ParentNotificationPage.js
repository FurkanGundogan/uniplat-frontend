import React from "react";
import Navbar from "../../Navbar/Navbar";
import NavbarBottom from "../../Navbar/NavbarBottom";
import NotificationPage from "./NotificationPage";
const ParentNotificationPage = () => {

  return (
    <div>
      <Navbar />
      <NotificationPage />
      <NavbarBottom />
    </div>
  );
};

export default ParentNotificationPage;
