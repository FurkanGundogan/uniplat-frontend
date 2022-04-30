import { Avatar, ListItemAvatar, Typography } from "@mui/material";
import React from "react";
import ListItemText from "@mui/material/ListItemText";
import { blue } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import { useState,useEffect } from "react";
import {URL_CLUBS,URL_USER_CLUBS_BY_CLUBID,URL_FILES} from "../../../Contexts/Paths"

import axios from "axios"

function MembershipItem({membership}) {
    const [club, setclub] = useState();
    const [clubUsers,setClubUsers]=useState();
   
    console.log(club?.name," - CLUB :",club,clubUsers)
    useEffect(() => {
      
        const setClubDetail = async () => {
          await axios
            .get(URL_CLUBS +"/"+ membership?.clubId)
            .then((response) => {
              setclub(response.data);
              setUsers(response.data.id)
            })
            .catch((e) => {
              console.log("-Club-detail-get-error");
            });
        };
        if (membership !== undefined) {
          setClubDetail();
        }
      }, [membership]); //eslint-disable-line


        const setUsers = async (id) => {
          await axios
            .get(URL_USER_CLUBS_BY_CLUBID + id)
            .then((response) => {
              console.log("res:",response)
              setClubUsers(response.data.content);
            })
            .catch((e) => {
              console.log("-Club-users-get-error");
            });
        };
  

  return (
    <>
      <ListItemAvatar>
        <Avatar 
        src={club && URL_FILES+"/"+club?.profileImgId}
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
              {clubUsers ? clubUsers.length:0 } Members
            </Typography>
          </React.Fragment>
        }
      />
  </>
  );
}

export default MembershipItem;
