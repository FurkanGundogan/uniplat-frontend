import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import { PostsContext } from "../HomePosts/PostsContext";
import { useParams, useLocation } from "react-router-dom";
function PostOriginalSizeImagePage() {
  const { postid } = useParams();
  const { postsState } = useContext(PostsContext);
  const [post] = useState(postsState.posts.filter((p) => p.id === postid)[0]);
  const { img } = post;

  const navigate = useNavigate();
  let location = useLocation();
  const index = window.pageYOffset;
  return (
    <Lightbox
      image={img}
      title="Image"
      onClose={() =>
        navigate(location.state.backgroundLocation.pathname, {
          state: { prevScrollY: index },
        })
      }
    />
  );
}

export default PostOriginalSizeImagePage;
