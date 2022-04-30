import { Avatar, ListItemAvatar, Typography } from "@mui/material";
import React from "react";
import ListItemText from "@mui/material/ListItemText";
import { blue } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import { useState,useEffect } from "react";
import {URL_USER_CLUBS_BY_CLUBID,URL_FILES} from "../../../Contexts/Paths"

import axios from "axios"

function ClubItem({club}) {
    const [uniClubsMembers, setUniClubsMembers] = useState();
 
    console.log(club.name," - uyeler :",uniClubsMembers)
    useEffect(() => {
      
        const setClubsDetail = async () => {
          await axios
            .get(URL_USER_CLUBS_BY_CLUBID + club.id)
            .then((response) => {
              setUniClubsMembers(response.data.content);
            })
            .catch((e) => {
              console.log("profile-uni-clubs-detail-get-error");
            });
        };
        if (club !== undefined) {
          setClubsDetail();
        }
      }, [club]); //eslint-disable-line

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
              {uniClubsMembers && uniClubsMembers.length} Members
            </Typography>
          </React.Fragment>
        }
      />
  </>
  );
}

export default ClubItem;
