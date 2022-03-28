import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { blue } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from '@mui/icons-material/Close';
import MainGroupStyles from "./MainGroupStyles";
import Divider from '@mui/material/Divider';
import { IconButton, Typography } from "@mui/material";

import GroupAddIcon from '@mui/icons-material/GroupAdd';

export default function RequestListModal({ showJoinReqList, setJoinReqList }) {
 
    const classes = MainGroupStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const requestList = ["username@gmail.com", "user02@gmail.com"];


  const handleListItemDeleteClick = (value) => {
    console.log("Rejected:",value);
  };

  const handleListItemAcceptClick = (value) => {
    console.log("Accepted:",value);
  };

  
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        open={showJoinReqList}
        onClose={() => setJoinReqList(false)}
        aria-labelledby="responsive-dialog-title"
        scroll="paper"
      >
         <div className={classes.AdminListModalCloseIconWrapper}>
         <CloseIcon onClick={()=>setJoinReqList(false)} className={classes.AdminListModalCloseIcon}/>
         
        <DialogTitle className={classes.AdminListModalTitle}  id="responsive-dialog-title">{"Requests"}</DialogTitle>
        </div>
        <Divider/>
        <DialogContent>
          <List sx={{ pt: 0 }}>
            {requestList.map((user,i) => (
              <ListItem
                button
                key={i}
                secondaryAction={
                    <div>
                    <IconButton onClick={() => handleListItemAcceptClick(user)} edge="start" aria-label="delete">
                      <GroupAddIcon />
                    </IconButton>
                      <IconButton onClick={() => handleListItemDeleteClick(user)} edge="end" aria-label="delete">
                      <CloseIcon />
                    </IconButton>
                    </div>
                  }
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                primary={"Ahmet Ak"}  
                secondary={
                    <React.Fragment>
                      <Typography
                      component="span"
                        sx={{ display: 'inline' }}
                        variant="body2"
                        color={"gray"}
                      >
                         {user}
                      </Typography>
                     
                    </React.Fragment>
                  }
                />
                
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
}
