import React, { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import { URL_POSTS, URL_USERS } from "../../Contexts/Paths";
import { useAuthState } from "../../Contexts";
import SearchPageStyles from "./SearchPageStyles";
import axios from "axios";
import PostCard from "./PostCard";
function PostItem({ user, i }) {
  const mainState = useAuthState(); //read user details from context
  const classes = SearchPageStyles();
  const [post, setPost] = useState();
 
  useEffect(() => {
    axios
      .get(URL_POSTS + "/" + user.id, {
        headers: { userId: mainState.user.id },
      })
      .then((response) => {
        setPost(response.data);
      })
      .catch((e) => {
        console.log("-serach-post-detail-get-error");
      });
  }, [user.id,mainState.user.id]);

  const [owner, setOwner] = useState();

  useEffect(() => {
    if (post?.ownerId !== undefined && post?.ownerId !== null) {
      axios
        .get(URL_USERS + "/" + post.ownerId, {
          headers: { userId: mainState.user.id },
        })
        .then((response) => {
          setOwner(response.data);
        })
        .catch((e) => {
          console.log("-serach-post-owner-detail-get-error");
        });
    }
  }, [post?.ownerId,mainState.user.id]);

 
  return (
    <div>
      <div key={i} className={classes.searchPostItemCardWrapper}>
        {post && owner &&
        <PostCard post={post} owner={owner} usertype={owner?.type}
       
        />
        }
        <Divider key={i + 1} variant="inset" component="li" />
      </div>
    </div>
  );
}

export default PostItem;
