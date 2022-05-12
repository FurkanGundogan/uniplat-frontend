import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import PostCardStyles from "../PostCardStyles";
import { URL_FILES, URL_USERS } from "../../../Contexts/Paths";
import axios from "axios";
import { Avatar } from "@mui/material";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
function Comment({ comment, mainUserId }) {
  const navigate = useNavigate();
  const [owner, setOwner] = useState();

  useEffect(() => {
    axios({
      method: "GET",
      headers: { userId: mainUserId },
      url: URL_USERS + "/" + comment.userId,
    })
      .then((response) => {
        setOwner(response.data);
        console.log("set Owner:", response.data);
      })
      .catch((error) => {
        console.log("get comment owner error");
      });
  }, [comment.userId, mainUserId]);

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
        <Avatar
          sx={{ bgcolor: red[500], mr: 1, my: 0.5, alignSelf: "center" }}
          aria-label="recipe"
          src={owner?.profileImgId && URL_FILES + "/" + owner?.profileImgId}
          onClick={(e) => {
            e.stopPropagation();
            navigate("/" + owner?.id);
          }}
        ></Avatar>
        <div>
          <div className={classes.commentUserNameWrapper}>
            <div className={classes.commentUserName}>
              {owner?.name + " " + owner?.surname}
            </div>
          </div>
          <div className={classes.commentTextWrapper}>
            <span className={classes.commentText}>{comment.comment}</span>
          </div>
          <div className={classes.commentTimeWrapper}>
            <span className={classes.commentTimeText}>
              {new Date(comment.createdAt).toLocaleDateString() +
                " - " +
                new Date(comment.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
            </span>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default Comment;
