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

import FollowClubItem from "./FollowClubItem";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgressForTabs from "../CircularProgressForTabs";
import { TYPE_CLUB, TYPE_UNI, TYPE_USER } from "../../../Contexts/Paths";
import FollowUniItem from "./FollowUniItem";
import UseGetFollows from "./UseGetFollows"
import { useCallback,useRef,useState,useEffect } from "react";
export default function FollowsListModal({
  showFollowsList,
  setShowFollowsList,
}) {
  const classes = MainProfileStyles();
  const { userid, uniid } = useParams();
  const [pageNumber, setPageNumber] = useState(0);
  const theme = useTheme();
  const [owner, setOwner] = useState();
  useEffect(() => {
    setOwner(userid ? userid : uniid);
  }, [userid, uniid]);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();


    const { follows, hasMore, loading } = UseGetFollows(
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
            {follows !== null ? (
              follows?.map((follow, i) => {
                if (follows.length === i + 1) {
                  if(follow.followType === TYPE_USER){
                    return <ListItem
                    button
                    key={i}
                    ref={lastPostElementRef}
                    onClick={() => {
                      setShowFollowsList(false);
                      navigate("/" + follow?.followId);
                    }}
                  >
                    <FollowUserItem follow={follow} />
                  </ListItem>
                  }if(follow.followType === TYPE_UNI){
                    return <ListItem
                    button
                    key={i}
                    ref={lastPostElementRef}
                    onClick={() => {
                      setShowFollowsList(false);
                      navigate("/uni/" + follow?.followId);
                    }}
                  >
                    <FollowUniItem follow={follow} />
                  </ListItem>
                  }
                  if(follow.followType === TYPE_CLUB){
                    return <ListItem
                    button
                    key={i}
                    ref={lastPostElementRef}
                    onClick={() => {
                      setShowFollowsList(false);
                      navigate("/clubs/" + follow?.followId);
                    }}
                  >
                    <FollowClubItem follow={follow} />
                  </ListItem>
                  }
                }else{
                  if(follow.followType === TYPE_USER){
                    return <ListItem
                    button
                    key={i}
                    onClick={() => {
                      setShowFollowsList(false);
                      navigate("/" + follow?.followId);
                    }}
                  >
                    <FollowUserItem follow={follow} />
                  </ListItem>
                  }if(follow.followType === TYPE_UNI){
                    return <ListItem
                    button
                    key={i}
                    onClick={() => {
                      setShowFollowsList(false);
                      navigate("/uni/" + follow?.followId);
                    }}
                  >
                    <FollowUniItem follow={follow} />
                  </ListItem>
                  }
                  if(follow.followType === TYPE_CLUB){
                    return <ListItem
                    button
                    key={i}
                    onClick={() => {
                      setShowFollowsList(false);
                      navigate("/clubs/" + follow?.followId);
                    }}
                  >
                    <FollowClubItem follow={follow} />
                  </ListItem>
                  }
                }


                
                 return <div className="div"></div>
              })
            ) : (
              <CircularProgressForTabs />
            )}

          </List>
          <List sx={{ pt: 0 }}>
            <Divider />
 
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
}
