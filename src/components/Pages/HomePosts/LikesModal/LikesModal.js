import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import List from "@mui/material/List";
import CloseIcon from "@mui/icons-material/Close";
import PostCardStyles from "../PostCardStyles";
import Divider from "@mui/material/Divider";
import { URL_USER_LIKED_POSTS } from "../../../Contexts/Paths";
import axios from "axios";
import { useState,useEffect } from "react";
import LikeUser from "./LikeUser";
import { ListItem } from "@mui/material";
import { useAuthState } from "../../../Contexts";
export default function LikesModal({ showLikes, setShowLikes, postId }) {
  const mainState = useAuthState(); //read user details from context
  const classes = PostCardStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [likeUserList, setLikeUserList] = useState();

  useEffect(()=>{
    axios({
      method: "GET",
      url: URL_USER_LIKED_POSTS,
      params: {
        postId: postId,
      },
    })
      .then((response) => {
        setLikeUserList(response.data.content);
      })
      .catch((error) => {
        console.log("get liked user list error");
      });
  },[postId,showLikes])

 

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        open={showLikes}
        onClose={() => setShowLikes(false)}
        aria-labelledby="responsive-dialog-title"
        scroll="paper"
      >
        <div className={classes.LikeModalCloseIconWrapper}>
          <CloseIcon
            onClick={() => setShowLikes(false)}
            className={classes.LikeModalCloseIcon}
          />

          <DialogTitle
            className={classes.LikeModalTitle}
            id="responsive-dialog-title"
          >
            {"Likes"}
          </DialogTitle>
        </div>
        <Divider />
        <DialogContent>
          <List sx={{ pt: 0 }}>
            {likeUserList &&
              likeUserList.map((like, i) => (
                <ListItem button key={i}>
                  <LikeUser like={like} mainUserId={mainState.user.id}/>
                </ListItem>
              ))}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
}
