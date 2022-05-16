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

import { useCallback,useRef,useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgressForTabs from "../CircularProgressForTabs";
import UseGetFollowers from "../FollowersTab/UseGetFollowers";

export default function FollowersListModal({
  showFollowersList,
  setShowFollowersList,
}) {
  const classes = MainProfileStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  
  

  const {userid} = useParams();
  const [pageNumber, setPageNumber] = useState(0);
  const [owner, setOwner] = useState();
  useEffect(() => {
    setOwner(userid);
  }, [userid]);

  const { followers, hasMore, loading } = UseGetFollowers(
    owner,
    pageNumber,
  );

 
  const observer = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [userid, loading, hasMore] //eslint-disable-line
  );


 



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
            {followers !== null ? (
              followers?.map((follower, i) => {
                if(followers.length === i + 1){
                  return <ListItem
                  button
                  ref={lastPostElementRef}
                  key={i}
                  onClick={() => {
                    setShowFollowersList(false);
                    navigate("/" + follower?.userId);
                  }}
                >
                  <FollowerUserItem follower={follower} />
                </ListItem>
                }else{
                  return <ListItem
                  button
                  key={i}
                  onClick={() => {
                    setShowFollowersList(false);
                    navigate("/" + follower?.userId);
                  }}
                >
                  <FollowerUserItem follower={follower} />
                </ListItem>
                }
               
})
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
