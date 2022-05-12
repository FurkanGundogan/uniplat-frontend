import { Avatar, ListItemAvatar, Typography } from "@mui/material";
import React from "react";
import ListItemText from "@mui/material/ListItemText";
import { blue } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import {URL_FILES} from "../../../Contexts/Paths"

function ClubItem({club}) {
 
  return (
    <>
      <ListItemAvatar>
        <Avatar 
        src={URL_FILES+"/"+club?.profileImgId}
        sx={{ bgcolor: blue[100], color: blue[600] }}>
          <PersonIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={club?.name}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              sx={{ display: "inline" }}
              variant="body2"
              color={"gray"}
            >
              {club?.countFollower} Members
            </Typography>
          </React.Fragment>
        }
      />
  </>
  );
}

export default ClubItem;
