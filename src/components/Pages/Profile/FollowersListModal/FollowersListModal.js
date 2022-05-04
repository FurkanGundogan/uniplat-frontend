import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CloseIcon from "@mui/icons-material/Close";
import MainProfileStyles from "../MainProfileStyles";
import Divider from "@mui/material/Divider";

import FollowerUserItem from "./FollowerUserItem";

import { useContext } from "react";
import { ProfileContext } from "../ProfileContext";
import { useNavigate } from "react-router-dom";
import CircularProgressForTabs from "../CircularProgressForTabs";

export default function FollowersListModal({
  showFollowersList,
  setShowFollowersList,
}) {
  const classes = MainProfileStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const { profileFollowers } = useContext(ProfileContext);
  

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        open={showFollowersList}
        onClose={() => setShowFollowersList(false)}
        aria-labelledby="responsive-dialog-title"
        scroll="paper"
      >
        <div className={classes.AdminListModalCloseIconWrapper}>
          <CloseIcon
            onClick={() => setShowFollowersList(false)}
            className={classes.AdminListModalCloseIcon}
          />

          <DialogTitle
            className={classes.AdminListModalTitle}
            id="responsive-dialog-title"
          >
            {"Followers"}
          </DialogTitle>
        </div>
        <Divider />
        <DialogContent>
          <List sx={{ pt: 0 }}>
            {profileFollowers !== null ? (
              profileFollowers?.map((follower, i) => (
                <ListItem
                  button
                  key={i}
                  onClick={() => {
                    setShowFollowersList(false);
                    navigate("/" + follower?.followerId);
                  }}
                >
                  <FollowerUserItem follower={follower} />
                </ListItem>
              ))
            ) : (
              <CircularProgressForTabs />
            )}

            
          </List>
          <List sx={{ pt: 0 }}>
            <Divider />
            {/*
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
            */}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
}
