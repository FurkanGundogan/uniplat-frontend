import { Avatar, ListItemAvatar, Typography } from "@mui/material";
import React from "react";
import ListItemText from "@mui/material/ListItemText";
import { blue } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import { useState,useEffect } from "react";
import {URL_USERS,URL_FILES} from "../../../Contexts/Paths"

import axios from "axios"
import {useAuthState } from "../../../Contexts";
function Follower({follower}) {
  const mainState = useAuthState(); //read user details from context
    const [user, setUser] = useState();
   
 
    console.log(user?.name," - user :",user)
    useEffect(() => {
      
        const setFollowerUser = async () => {
          await axios
            .get(URL_USERS +"/"+ follower?.userId,{headers:{"userId":mainState.user.id}})
            .then((response) => {
              setUser(response.data);
            })
            .catch((e) => {
              console.log("-Club-detail-get-error");
            });
        };
        if (follower !== undefined) {
          setFollowerUser();
        }
      }, [follower]); //eslint-disable-line


  

  return (
    <>
      <ListItemAvatar>
        <Avatar 
        src={user && URL_FILES+"/"+user?.profileImgId}
        sx={{ bgcolor: blue[100], color: blue[600] }}>
          <PersonIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={user?.name}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              sx={{ display: "inline" }}
              variant="body2"
              color={"gray"}
            >
              {user?.email }
            </Typography>
          </React.Fragment>
        }
      />
  </>
  );
}

export default Follower;
