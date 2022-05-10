import { Avatar, ListItemAvatar } from "@mui/material";
import React, { useState,useEffect   } from "react";
import ListItemText from "@mui/material/ListItemText";
import { blue } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import { URL_FILES, URL_USERS } from "../../../Contexts/Paths";
import axios from "axios";
function LikeUser({ like,mainUserId }) {
   

    const [user, setUser] = useState();

    useEffect(()=>{
      axios({
        method: "GET",
        url: URL_USERS+"/"+like.userId,
        headers:{"userId":mainUserId}
      })
        .then((response) => {
            setUser(response.data);
        })
        .catch((error) => {
          console.log("get user detail in like");
        });
    },[like.userId,mainUserId])

  return (
    <>
      <ListItemAvatar>
        <Avatar 
        src={user && URL_FILES+"/"+user.profileImgId}
        sx={{ bgcolor: blue[100], color: blue[600] }}>
          <PersonIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText>
           {user && (user?.name + " " + user?.surname)}
      </ListItemText>
    </>
  );
}

export default LikeUser;
