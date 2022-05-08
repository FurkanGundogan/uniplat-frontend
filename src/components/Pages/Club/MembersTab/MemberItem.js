import { Avatar, ListItemAvatar, Typography } from "@mui/material";
import React from "react";
import ListItemText from "@mui/material/ListItemText";
import { blue } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import { useState,useEffect } from "react";
import {URL_USERS,URL_FILES} from "../../../Contexts/Paths"
import { useAuthState } from "../../../Contexts";
import axios from "axios"

function ClubItem({member}) {
    const [memberDetails, setMemberDetails] = useState();
    const mainState = useAuthState(); //read user details from context
    console.log(" uye :",memberDetails)
    
    useEffect(() => {
      
        const setDetails = async () => {
          await axios
            .get(URL_USERS +"/"+ member.userId,{headers:{"userId":mainState.user.id}})
            .then((response) => {
              setMemberDetails(response.data);
            })
            .catch((e) => {
              console.log("profile-uni-clubs-detail-get-error");
            });
        };
        if (member !== undefined) {
          setDetails();
        }
      }, [member]); //eslint-disable-line

  return (
    <>
      <ListItemAvatar>
        <Avatar 
        src={memberDetails && URL_FILES+"/"+memberDetails?.profileImgId}
        sx={{ bgcolor: blue[100], color: blue[600] }}>
          <PersonIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={memberDetails?.name +" "+ memberDetails?.surname}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              sx={{ display: "inline" }}
              variant="body2"
              color={"gray"}
            >
             {memberDetails?.email}
            </Typography>
          </React.Fragment>
        }
      />
  </>
  );
}

export default ClubItem;
