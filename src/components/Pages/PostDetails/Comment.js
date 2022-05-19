import React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import PostCardStyles from "../HomePosts/PostCardStyles";
function Comment({ comment }) {
  // console.log("comment:",comment)
  const classes = PostCardStyles();
  return (
    <div>
      <Box
        
        sx={{
          display: "flex",
          alignItems: "flex-end",
          padding: "0px 16px 0px 16px",
          marginBottom: "16px",
         
        }}
      >
        <AccountCircle
          sx={{
            color: "action.active",
            mr: 1,
            my: 0.5,
            alignSelf: "center",
            fontSize: "48px",
          }}
        />
        <div>
          <div className={classes.commentUserNameWrapper}>
            <div className={classes.commentUserName}>{comment.userId}</div>
          </div>
          <div className={classes.commentTextWrapper}>
           
            <span className={classes.commentText}>{comment.comment}</span>
              
          
          </div>
          <div className={classes.commentTimeWrapper}>
          <span className={classes.commentTimeText}>{"12h"}</span>
            </div>
        </div>
      </Box>
    </div>
  );
}

export default Comment;
