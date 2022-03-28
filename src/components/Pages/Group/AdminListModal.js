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
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import TextField from "@mui/material/TextField";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
export default function AdminListModal({ showAdminList, setShowAdminList }) {
    const classes = MainGroupStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const likeUserList = ["username@gmail.com", "user02@gmail.com"];

  const [newEmail, setNewEmail] = useState(null);

  const handleListItemDeleteClick = (value) => {
    console.log(value);
  };
  const handleAddNew = (value) => {
    console.log(newEmail)
  };
  
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        open={showAdminList}
        onClose={() => setShowAdminList(false)}
        aria-labelledby="responsive-dialog-title"
        scroll="paper"
      >
         <div className={classes.AdminListModalCloseIconWrapper}>
         <CloseIcon onClick={()=>setShowAdminList(false)} className={classes.AdminListModalCloseIcon}/>
         
        <DialogTitle className={classes.AdminListModalTitle}  id="responsive-dialog-title">{"Admins List"}</DialogTitle>
        </div>
        <Divider/>
        <DialogContent>
          <List sx={{ pt: 0 }}>
            {likeUserList.map((user,i) => (
              <ListItem
                button
                key={i}
                secondaryAction={
                    <IconButton onClick={() => handleListItemDeleteClick(user)} edge="end" aria-label="delete">
                      <PersonRemoveIcon />
                    </IconButton>
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
          <List sx={{ pt: 0 }}>
          <Divider/>
          <div style={{textAlign:"center", marginTop:"8px", fontFamily:"'Exo 2'", fontSize:"16px"}}>Add New Admin</div>
            <ListItem secondaryAction={
                    <IconButton onClick={()=>{
                        handleAddNew()
                    }} edge="end" aria-label="delete">
                      <SendIcon />
                    </IconButton>
                  }>
              <ListItemText primary={
                  <TextField
                  id="multiline-static"
                  placeholder="Email"
                  fullWidth
                  onChange={(e)=>setNewEmail(e.target.value)}
                />
              } />
            </ListItem>
            </List>
        </DialogContent>
      </Dialog>
    </div>
  );
}
