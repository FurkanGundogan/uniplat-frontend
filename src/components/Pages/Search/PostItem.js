import React, { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import { TYPE_CLUB, TYPE_UNI, TYPE_USER, URL_CLUBS, URL_POSTS, URL_UNIVERSITIES, URL_USERS } from "../../Contexts/Paths";
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
    let target = "";
    if (post?.ownerType === TYPE_USER) target = URL_USERS;
    if (post?.ownerType === TYPE_UNI) target = URL_UNIVERSITIES;
    if (post?.ownerType === TYPE_CLUB) target = URL_CLUBS;

    if (post?.ownerId !== undefined && post?.ownerId !== null) {
      axios
        .get(target + "/" + post.ownerId, {
          headers: { userId: mainState.user.id },
        })
        .then((response) => {
          setOwner(response.data);
        })
        .catch((e) => {
          console.log("-serach-post-owner-detail-get-error");
        });
    }
    // eslint-disable-next-line
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
