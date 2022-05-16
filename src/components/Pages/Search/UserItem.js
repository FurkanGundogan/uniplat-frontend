import React, { useEffect, useState } from 'react'
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { URL_FILES, URL_USERS } from '../../Contexts/Paths';
import { useAuthState } from '../../Contexts';
import axios from 'axios';
import SearchPageStyles from './SearchPageStyles';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from 'react-router-dom';
function UserItem({user,i}) {
  const navigate=useNavigate()
  const mainState = useAuthState(); //read user details from context
  const classes = SearchPageStyles();
  const [owner,setOwner]=useState()

  useEffect(()=>{
     axios
    .get(URL_USERS + "/" + user.id,{ headers:{"userId":mainState.user.id} })
    .then((response) => {
      setOwner(response.data);
    })
    .catch((e) => {
      console.log("-serach-user-detail-get-error");
    });
  },[user.id,mainState.user.id])

  return (
    <div>
       <div key={i}>
          <ListItem key={i} alignItems="flex-start" className={classes.searchItemListItem}
          onClick={()=>{
            navigate("/"+user?.id)
          }}
          >
            <ListItemAvatar>
              <Avatar 
              src={user?.profileImgId && URL_FILES+"/"+user?.profileImgId}
              alt="Remy Sharp"></Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              secondary={
                <div className={classes.searchItemBottom}>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {user?.description}
                </Typography>
                <div className={classes.searchItemInner}>
                  {" — " + owner?.email}
                  {owner?.followedByUser === true && (
                    <div className={classes.searchItemBottomFollowing}>
                      <CheckCircleIcon fontSize={"18px"} />
                      
                    </div>
                  )}
                </div>
              </div>
              }
            />
          </ListItem>
          <Divider key={i+1} variant="inset" component="li" />
        </div>
    </div>
  )
}

export default UserItem