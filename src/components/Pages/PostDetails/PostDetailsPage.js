import React from "react";
import PostDetailsItem from "./PostDetailsItem";
import Navbar from "../../Navbar/Navbar";
import NavbarBottom from "../../Navbar/NavbarBottom";
const PostDetailsPage = () => {

  return (
    <div>
      <Navbar />
      <PostDetailsItem/>
      <NavbarBottom />
    </div>
  );
};

export default PostDetailsPage;
