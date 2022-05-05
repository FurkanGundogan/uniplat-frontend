import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { blue } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import { URL_USERS,URL_FILES } from "../../../Contexts/Paths";
import axios from "axios";
function FollowerUserItem({ follower }) {
  const [userDetails, setUserDetails] = useState();
  useEffect(() => {
    const setDetails = async () => {
      await axios
        .get(URL_USERS + "/" + follower?.userId)
        .then((response) => {
          setUserDetails(response.data);
        })
        .catch((e) => {
          console.log("-user-detail-get-error");
        });
    };
    if (follower !== undefined) {
      setDetails();
    }
  }, [follower]); //eslint-disable-line

  return (
    <>
      <ListItemAvatar>
        <Avatar
        src={userDetails && URL_FILES+"/"+userDetails?.profileImgId}
        sx={{ bgcolor: blue[100], color: blue[600] }}>
          <PersonIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={userDetails?.name +" "+userDetails?.surname}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              sx={{ display: "inline" }}
              variant="body2"
              color={"gray"}
            >
              {userDetails?.email}
            </Typography>
          </React.Fragment>
        }
      />
    </>
  );
}

export default FollowerUserItem;
