import React from "react";
import { useNavigate } from "react-router-dom";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import { useParams, useLocation } from "react-router-dom";
import {URL_FILES} from "../../Contexts/Paths"
function PostOriginalSizeImagePage() {
  const { imgId } = useParams();

  const navigate = useNavigate();
  let location = useLocation();
  const index = window.pageYOffset;
  return (
    <Lightbox
      image={imgId && URL_FILES+"/"+imgId}
      title="Image"
      onClose={() =>
        navigate(location.state.backgroundLocation.pathname, {
          state: { ...location.state,prevScrollY: index },
        })
      }
    />
  );
}

export default PostOriginalSizeImagePage;
