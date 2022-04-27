import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import MainClubStyles from "./MainClubStyles";
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
import Content from "./Content";
import "react-awesome-lightbox/build/style.css";
import ClubSettingsModal from "./ClubSettings/ClubSettingsModal";
import StarIcon from "@mui/icons-material/Star";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Acciordion from "./Accordion/Accordion";
import AdminListModal from "./AdminListModal";
import RequestListModal from "./RequestListModal";
import { NewClubPostModalContext } from "../../Contexts/NewClubPostModalContext";
import { ClubContext } from "./ClubContext";
import { join,leave } from "./PanelActions";
import UserAvatarResponsive from "./UserAvatarResponsive"
const MainClubPage = () => {
  // const navigate = useNavigate();
  const [tab, setTab] = React.useState(0);
  const mainState = useAuthState(); //read user details from context
  const { clubState, setClubState } = useContext(ClubContext);
  const { newPostState, setNewPostState } = useContext(NewPostModalContext);
  const { newClubPostState, setNewClubPostState } = useContext(NewClubPostModalContext);


  const [settings, setSettings] = useState();

  const isAdmin = mainState.user.id === clubState.clubInfo.adminId;
  const isMember = clubState.isMember
  console.log("Club Admin?: ",isAdmin)
  console.log("Club Member?: ",isMember,clubState.memberShip)
  // const isMember = clubID === "2";
  // const [joinReq, setJoinReq] = useState(false);
  const classes = MainClubStyles();
  const [showAdminList, setShowAdminList] = React.useState(false);
  const [showJoinReqList, setJoinReqList] = React.useState(false);

  const handleJoin = async () => {
   join(mainState.user.id,clubState.clubInfo.id,clubState,setClubState)
  
  }
  const handleLeave = () => {
     // join(mainState.user.id,clubState.clubInfo.id)
     leave(clubState.memberShip,clubState,setClubState)
  }


  console.log("state:",clubState)
  return (
    <Grid id={"xyz"} container className={classes.HomeContainer}>
      <AdminListModal
        showAdminList={showAdminList}
        setShowAdminList={setShowAdminList}
      />
      <RequestListModal
        showJoinReqList={showJoinReqList}
        setJoinReqList={setJoinReqList}
      />
      <Grid item className={classes.LeftSide}>
        <div className={classes.leftSideInner}>
          {isAdmin && (
            <div className={classes.editButtonWrapper}>
              <IconButton
                aria-label="delete"
                onClick={() => setSettings({  ...clubState.clubInfo,isopen: true })}
              >
                <EditIcon />
              </IconButton>
            </div>
          )}
          <UserAvatar
            profileImgId={clubState.clubInfo?.profileImgId}
          />
          <Typography variant="body1" className={classes.UserName}>
            {clubState.clubInfo?.name}
          </Typography>
          <Divider />
          <Typography variant="body1" className={classes.UserName}>
          {clubState.clubUniInfo?.name}
          </Typography>
          <Divider />
          <div className={classes.LeftSideFollowWrapper}>
            <Typography variant="body2" className={classes.UserDept}>
            </Typography>
            <Typography variant="body2" className={classes.UserDept}>
              {clubState.clubUsers?.length + " Members"}
            </Typography>
            <Divider />
          </div>
          <div className={classes.LeftSideButtonWrapper}>
            {
              (isAdmin===false && isMember===true) && <Typography variant="body2" className={classes.UserDept}>
              {"Member"}
            </Typography>
            }

            {isAdmin === false  && isMember === false && (
              <Button
                className={classes.LeftSideButton}
                onClick={handleJoin}
              >
                Join
              </Button>
            )}
            {isAdmin === false  && isMember === true && (
              <Button
                className={classes.LeftSideButton}
                onClick={handleLeave}
              >
                Leave
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
                  <Divider />
                  {
                    /**
                     * Show admins disabled
                  <ListItem onClick={() => setShowAdminList(true)} button>
                    <ListItemText primary="Show Admins" />
                  </ListItem>
                  <Divider />
                     */
                  }
                 
  
                  <ListItem onClick={()=> setNewClubPostState({ type: "Post", 
                  isOpen: true,
                  from:mainState.user.email,
                  clubPost:true,
                  clubID:"1"
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
        {newClubPostState && (
          <NewPostModal modalState={newClubPostState} setModal={setNewClubPostState} />
        )}
        {settings && (
          <ClubSettingsModal 
          settings={settings}
          setSettings={setSettings}
          clubState={clubState}
          setClubState={setClubState} 
          />
        )}

          {/**
           responsive club menu
           */}
        <div className={classes.CenterTopUserInfoWrapper}>
          <div className={classes.CenterTopUserInfoLeftSide}>
            <div className={classes.CenterTopUserInfoLeftSideAvatarWrapper}>
              <UserAvatarResponsive profileImgId={clubState.clubInfo?.profileImgId}/>
            </div>
            <div className={classes.CenterTopButtonWrapper}>
              {isAdmin && (
                <Button
                  onClick={() => setSettings({  ...clubState.clubInfo,isopen: true })}
                  className={classes.CenterTopButton}
                  endIcon={<EditIcon className={classes.CenterTopEditIcon} />}
                >
                  Edit
                </Button>
              )}

              {isAdmin === false  && isMember === false && (
                <Button
                  className={classes.CenterTopButton}
                  onClick={handleJoin}
                >
                  Join
                </Button>
              )}
              {isAdmin === false  && isMember === true && (
                <Button
                  className={classes.CenterTopButton}
                  onClick={handleLeave}
                >
                  Leave
                </Button>
              )}
              {
                /*
              isAdmin === false && isMember === true && (
                <Button color="error" onClick={() => console.log("leave club")}>
                  Leave
                </Button>
              )
              */
              }
            </div>
          </div>
          
          <div className={classes.CenterTopUserInfoRightSide}>
            <div className={classes.CenterTopUserInfoRightSideUserName}>
              {clubState.clubInfo?.name}
            </div>
            <div className={classes.CenterTopUserInfoRightSideUniversityName}>
              {clubState.clubUniInfo?.name}
            </div>

            <div className={classes.CenterTopUserInfoRightSideFollowWrapper}>
              <div className={classes.CenterTopUserInfoRightSideFollowInfo}>
              {clubState.clubUsers?.length + " Members"}
              </div>
            </div>
            {/*
            isAdmin === false && isMember === false && (
              <div className={classes.CenterTopUserInfoRightSideRequstButtonWrapper}>
                <Button
                  className={classes.CenterTopButton}
                  onClick={() => setJoinReq(!joinReq)}
                >
                  {joinReq ? "Send Join Request" : "Waiting..."}
                </Button>
                </div>
              )
              */
              }
          </div>
        </div>
        {isAdmin && (
          <Acciordion
            showAdminList={showAdminList}
            setShowAdminList={setShowAdminList}
            showJoinReqList={showJoinReqList}
            setJoinReqList={setJoinReqList}
            setNewClubPostState={setNewClubPostState}
          />
        )}
        <MyTabs tab={tab} setTab={setTab} />

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

export default MainClubPage;