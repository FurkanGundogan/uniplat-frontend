import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import MainProfileStyles from "./MainProfileStyles";
import UserAvatar from "../UserAvatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { useAuthState } from "../../Contexts";
import { useContext } from "react";
import NewPostModal from "../Post/NewPostModal";
import { NewPostModalContext } from "../../Contexts/NewPostModalContext";
import MyTabs from "./MyTabs";
import Avatar from "@mui/material/Avatar";
import Content from "./Content";
import { useParams } from "react-router-dom";
import "react-awesome-lightbox/build/style.css";
import ProfileSettingsModal from "./ProfileSettings/ProfileSettingsModal";
import StarIcon from "@mui/icons-material/Star";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Acciordion from "./Accordion/Accordion"
import AdminListModal from "./AdminListModal"
import CreateClubModal from "./ProfileCreateClub/CreateClubModal";
import { NewUniPostModalContext } from "../../Contexts/NewUniPostModalContext";
const MainProfilePage = () => {
  // const navigate = useNavigate();
  const [tab, setTab] = React.useState(0);
  const mainState = useAuthState(); //read user details from context
  const { newPostState, setNewPostState } = useContext(NewPostModalContext);
  const { newUniPostState, setNewUniPostState } = useContext(NewUniPostModalContext);
  const { username } = useParams();
  // bu noktada username yerine user id ile kişi bilgileri için istek yönetimi yapılacak
  console.log("profil sahibi:", username);
  // bu follow bilgisi bilgilerle kontrol edilecek
  const [follow, setFollow] = useState(false);
  const [settings, setSettings] = useState();
  const [createClubState, setCreateClubState] = useState();
  const isYourProfile =
    mainState.user.name + mainState.user.surname === username;

  

  const isAdmin = username==="fatihsultanmehmetvakifuniversitesi";
  const isUni = username==="fatihsultanmehmetvakifuniversitesi";
  // buradaki durum bilgisi istekle yönetilecek

  const classes = MainProfileStyles();
  const [showAdminList, setShowAdminList] = React.useState(false);
  return (
    <Grid id={"xyz"} container className={classes.HomeContainer}>
      <AdminListModal showAdminList={showAdminList} setShowAdminList={setShowAdminList} />
      <Grid item className={classes.LeftSide}>
        <div className={classes.leftSideInner}>
          { isYourProfile && (
            <div className={classes.editButtonWrapper}>
              <IconButton
                aria-label="delete"
                onClick={() => setSettings({ isopen: true })}
              >
                <EditIcon />
              </IconButton>
            </div>
          )}
          <UserAvatar
            name={mainState.user.name}
            surname={mainState.user.surname}
          />
          <Typography variant="body1" className={classes.UserName}>
            {mainState.user.name} {mainState.user.surname}
          </Typography>
          <Divider />
          <Typography variant="body1" className={classes.UserName}>
            {"Fatih Sultan Mehmet Vakıf Universitesi"}
          </Typography>
          <Typography variant="body1" className={classes.UserUni}>
            {mainState.user.email}
          </Typography>
          <Typography variant="body1" className={classes.UserDept}>
            {mainState.user.type}
          </Typography>
          <Divider />
          <div className={classes.LeftSideFollowWrapper}>
            <Typography variant="body2" className={classes.UserDept}>
              {"123 Follows"}
            </Typography>
            <Typography variant="body2" className={classes.UserDept}>
              {"200 Followers"}
            </Typography>
          </div>
          <div className={classes.LeftSideButtonWrapper}>
            {follow ? (
              <Button
                className={classes.LeftSideButton}
                onClick={() => setFollow(!follow)}
              >
                UnFollow
              </Button>
            ) : (
              <Button
                className={classes.LeftSideButton}
                onClick={() => setFollow(!follow)}
              >
                Follow
              </Button>
            )}
            {isAdmin && (
              <div className={classes.AdminAreaWrapper}>
                <Divider />
                <div className={classes.AdminTitleWrapper}>
                  <StarIcon className={classes.AdminStarIcon} />
                  <div className={classes.AdminText}>Admin</div>
                </div>
                <List component="nav" aria-label="mailbox folders">
                  <ListItem onClick={()=>setCreateClubState({ isopen: true })} button>
                    <ListItemText primary="Create Club" />
                  </ListItem>
                  <Divider />
                  <ListItem onClick={()=>setShowAdminList(true)} button divider>
                    <ListItemText primary="Show Admins" />
                  </ListItem>
                  <Divider />
                  <ListItem onClick={()=> setNewUniPostState({ type: "Post", 
                  isOpen: true,
                  from:mainState.user.email,
                  uniPost:true,
                  uniID:"1"
                  })} button divider>
                    <ListItemText primary="New Post" />
                  </ListItem>
                </List>
              </div>
            )}
          </div>
        </div>
      </Grid>
      <Grid item className={classes.Center}>
        {newPostState && (
          <NewPostModal modalState={newPostState} setModal={setNewPostState} />
        )}
         {newUniPostState && (
          <NewPostModal modalState={newUniPostState} setModal={setNewUniPostState} />
        )}
        {settings && (
          <ProfileSettingsModal settings={settings} setSettings={setSettings} />
        )}
        {createClubState && (
          <CreateClubModal settings={createClubState} setSettings={setCreateClubState} />
        )}

        <div className={classes.CenterTopUserInfoWrapper}>
          <div className={classes.CenterTopUserInfoLeftSide}>
            <div className={classes.CenterTopUserInfoLeftSideAvatarWrapper}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 64, height: 64 }}
              />
            </div>
            <div className={classes.CenterTopButtonWrapper}>
              {isYourProfile ? (
                <Button
                  onClick={() => setSettings({ isopen: true })}
                  className={classes.CenterTopButton}
                  endIcon={<EditIcon className={classes.CenterTopEditIcon} />}
                >
                  Edit
                </Button>
              ) : follow ? (
                <Button
                  className={classes.CenterTopButton}
                  onClick={() => setFollow(!follow)}
                >
                  UnFollow
                </Button>
              ) : (
                <Button
                  className={classes.CenterTopButton}
                  onClick={() => setFollow(!follow)}
                >
                  Follow
                </Button>
              )}
            </div>
          </div>
          <div className={classes.CenterTopUserInfoRightSide}>
            <div className={classes.CenterTopUserInfoRightSideUserName}>
              {mainState.user.name} {mainState.user.surname}
            </div>
            <div className={classes.CenterTopUserInfoRightSideUniversityName}>
              {"Fatih Sultan Mehmet Vakıf Universitesi"}
            </div>

            <div className={classes.CenterTopUserInfoRightSideUserType}>
              {mainState.user.type}
            </div>

            <div className={classes.CenterTopUserInfoRightSideFollowWrapper}>
              <div className={classes.CenterTopUserInfoRightSideFollowInfo}>
                {"120 Follows"}
              </div>
              <div className={classes.CenterTopUserInfoRightSideFollowInfo}>
                {"200 Followers"}
              </div>
            </div>
          </div>
        </div>
        {isAdmin && (
              <Acciordion 
              createClubState={createClubState}
              setCreateClubState={setCreateClubState}
              showAdminList={showAdminList}
              setShowAdminList={setShowAdminList}
              setNewUniPostState={setNewUniPostState}
              />
            )}
        <MyTabs isUni={isUni} tab={tab} setTab={setTab} />

        <Content tab={tab} />
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
