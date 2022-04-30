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

import FollowUserItem from "./FollowUserItem";
import FolowUniItem from "./FollowUniItem";
import FollowClubItem from "./FollowClubItem";
import { useContext } from "react";
import { ProfileContext } from "../ProfileContext";
import { useNavigate } from "react-router-dom";
import CircularProgressForTabs from "../CircularProgressForTabs";

export default function FollowsListModal({
  showFollowsList,
  setShowFollowsList,
}) {
  const classes = MainProfileStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const { profileFollows, profileClubs, profileUniversities } =
    useContext(ProfileContext);


  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        open={showFollowsList}
        onClose={() => setShowFollowsList(false)}
        aria-labelledby="responsive-dialog-title"
        scroll="paper"
      >
        <div className={classes.AdminListModalCloseIconWrapper}>
          <CloseIcon
            onClick={() => setShowFollowsList(false)}
            className={classes.AdminListModalCloseIcon}
          />

          <DialogTitle
            className={classes.AdminListModalTitle}
            id="responsive-dialog-title"
          >
            {"Follows"}
          </DialogTitle>
        </div>
        <Divider />
        <DialogContent>
          <List sx={{ pt: 0 }}>
            {profileFollows !== null ? (
              profileFollows?.map((follow, i) => (
                <ListItem
                  button
                  key={i}
                  onClick={() => {
                    setShowFollowsList(false);
                    navigate("/" + follow?.userId);
                  }}
                >
                  <FollowUserItem follow={follow} />
                </ListItem>
              ))
            ) : (
              <CircularProgressForTabs />
            )}

            {profileUniversities !== null ? (
              profileUniversities?.map((follow, i) => (
                <ListItem
                  button
                  key={i}
                  onClick={() => {
                    setShowFollowsList(false);
                    navigate("/uni/" + follow?.universityId);
                  }}
                >
                  <FolowUniItem follow={follow} />
                </ListItem>
              ))
            ) : (
              <CircularProgressForTabs />
            )}

            {profileClubs !== null ? (
              profileClubs?.map((follow, i) => (
                <ListItem
                  button
                  key={i}
                  onClick={() => {
                    setShowFollowsList(false);
                    navigate("/clubs/" + follow?.clubId);
                  }}
                >
                  <FollowClubItem follow={follow} />
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
