import React from "react";
import Grid from "@mui/material/Grid";
import MainProfileStyles from "./MainProfileStyles";
import UserAvatar from "../UserAvatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import ArticleIcon from "@mui/icons-material/Article";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthDispatch, logout, useAuthState } from "../../Contexts";
import {useContext} from "react"
import NewPostModal from "../Post/NewPostModal";
import { NewPostModalContext } from '../../Contexts/NewPostModalContext';
const MainProfilePage = () => {
  // const navigate = useNavigate();
  const dispatch = useAuthDispatch(); // read dispatch method from context
  const mainState = useAuthState(); //read user details from context
  const {newPostState,setNewPostState} = useContext(NewPostModalContext)
  console.log("mainstate", mainState);

  const handleLogout = () => {
    logout(dispatch);
    window.location.href = "/SignIn";
  };

  const classes = MainProfileStyles();
  return (
    <Grid container className={classes.HomeContainer}>
      <Grid item className={classes.LeftSide}>
        <div className={classes.leftSideInner}>
          <UserAvatar />
          <Typography variant="body1" className={classes.UserName}>
            {mainState.user.name} {mainState.user.surname}
          </Typography>
          <Divider />
          <Typography variant="body1" className={classes.UserUni}>
            {mainState.user.email}
          </Typography>
          <Typography variant="body1" className={classes.UserDept}>
            {mainState.user.type}
          </Typography>
          <div className={classes.LeftSideButtonWrapper}>
            <Button
              className={classes.LeftSideButton}
              startIcon={<AddCircleOutlineIcon />}
              onClick={()=>{
                setNewPostState({isOpen:true})
              }}
            >
              Yeni Gönderi
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
        {  newPostState && <NewPostModal modalState={newPostState} setModal={setNewPostState}  /> }
        <h1>Burasi Profil</h1>
        <h1>P</h1>
        <h1>P</h1>
        <h1>P</h1>
        <h1>P</h1>
        <h1>P</h1>
        <h1>P</h1>
        <h1>P</h1>
        <h1>P</h1>
        <h1>P</h1>
        <h1>P</h1>
        <h1>P</h1>
        <h1>P</h1>
        <h1>P</h1>
        <h1>P</h1>
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

export default MainProfilePage;
