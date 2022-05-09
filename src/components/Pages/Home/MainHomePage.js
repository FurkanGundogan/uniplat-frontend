import React from "react";
import Grid from "@mui/material/Grid";
import MainHomeStyles from "./MainHomeStyles";
import UserAvatar from "../UserAvatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import ArticleIcon from "@mui/icons-material/Article";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthDispatch, logout, useAuthState } from "../../Contexts";
import { useContext } from "react";
import NewPostModal from "../Post/NewPostModal";
import { NewPostModalContext } from "../../Contexts/NewPostModalContext";
import { UserExtraInfoContext } from "../../Contexts/UserExtraInfoContext";
import PostArea from "../HomePosts/PostArea";
import "react-awesome-lightbox/build/style.css";

const MainHomePage = () => {
  const dispatch = useAuthDispatch(); // read dispatch method from context
  const mainState = useAuthState(); //read user details from context
  const { newPostState, setNewPostState } = useContext(NewPostModalContext);
  const { userUni } = useContext(UserExtraInfoContext);
  
  // console.log("home mainstate:", mainState.user);

  const handleLogout = () => {
    logout(dispatch);
    window.location.href = "/SignIn";
  };

 

  const classes = MainHomeStyles();
  return (
    <Grid container className={classes.HomeContainer}>
      <Grid item className={classes.LeftSide}>
        <div className={classes.leftSideInner}>
          <UserAvatar
            id={mainState.user.id}
            profileImgId={mainState.user.profileImgId}
          />
          <Typography variant="body1" className={classes.UserName}>
            {mainState.user.name} {mainState.user.surname}
          </Typography>
          <Divider />

          <Typography variant="body1" className={classes.UserUni}>
            {userUni.name}
          </Typography>
          <Typography variant="body1" className={classes.UserDept}>
            {mainState.user.type}
          </Typography>
          <Typography variant="body1" className={classes.UserDept}>
            {mainState.user.description}
          </Typography>
          <div className={classes.LeftSideButtonWrapper}>
            <Button
              className={classes.LeftSideButton}
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => {
                setNewPostState({ type: "Post", isOpen: true,ownerId:mainState.user.id,ownerType:"USER"});
              }}
            >
              New Post
            </Button>
          </div>
          <div className={classes.LeftSideButtonWrapper}>
            <Button
              className={classes.LeftSideButton}
              startIcon={<EventIcon />}
            >
              Etkinlikler
            </Button>
          </div>
          <div className={classes.LeftSideButtonWrapper}>
            <Button
              className={classes.LeftSideButton}
              startIcon={<ArticleIcon />}
            >
              Anketler
            </Button>
          </div>
          <div className={classes.LeftSideButtonWrapper}>
            <Button
              className={classes.LeftSideButton}
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </Grid>
      <Grid item className={classes.Center}>
        {newPostState && (
          <NewPostModal modalState={newPostState} setModal={setNewPostState} />
        )}

        <PostArea />
      </Grid>
      <Grid item className={classes.RightSide}>
        <div className={classes.rightSideInner}>
          <Typography variant="body1" className={classes.UserDept}>
            Right Side
          </Typography>
          <Typography variant="body1" className={classes.UserDept}>
            Right Side
          </Typography>
          <Typography variant="body1" className={classes.UserDept}>
            Right Side
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default MainHomePage;
