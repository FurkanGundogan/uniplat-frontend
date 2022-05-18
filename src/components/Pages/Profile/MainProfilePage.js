import React, { useEffect, useState } from "react";
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
import Content from "./Content";
import { useLocation, useParams } from "react-router-dom";
import "react-awesome-lightbox/build/style.css";
import ProfileSettingsModal from "./ProfileSettings/ProfileSettingsModal";
import StarIcon from "@mui/icons-material/Star";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Acciordion from "./Accordion/Accordion";
import FollowsListModal from "./FollowsListModal/FollowsListModal";
import CreateClubModal from "./ProfileCreateClub/CreateClubModal";
import { NewUniPostModalContext } from "../../Contexts/NewUniPostModalContext";
import { ProfileContext } from "../Profile/ProfileContext";
import UserAvatarResponsive from "./UserAvatarResponsive";
import UniversitySettingsModal from "./UniversitySettings/UniversitySettingsModal";
import { follow, unfollow } from "./PanelActions";
import FollowersListModal from "./FollowersListModal/FollowersListModal";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {TYPE_USER,TYPE_UNI} from "../../Contexts/Paths"
import AdminChangeModal from "./AdminChangeModal";
const MainProfilePage = () => {
  // const navigate = useNavigate();
  const [tab, setTab] = React.useState(0);
  const locstate = useLocation();
  console.log("locstate",locstate)
  const mainState = useAuthState(); //read user details from context
 

  const { newPostState, setNewPostState } = useContext(NewPostModalContext);
  const { newUniPostState, setNewUniPostState } = useContext(
    NewUniPostModalContext
  );
  const { userid, uniid } = useParams();
  const {
    profileState,
    setProfileState,
    profileFollowers,
    setProfileFollowers,
    setPosts,
  } = useContext(ProfileContext);
  useEffect(()=>{
    setTab(0)
    console.log("locstate.state:",locstate.state)
    if(locstate.state===null){
      // burada yapılan aksiyon:
      // bir profil sayfasına yönlenme 2 türlü olmakta
      // 1. bir iteme doğrudan tıklayıp  yönlenme
      // 2. post detay sayfasından dönerek yönlenme
      // ikinci durumda postlar kalmalı ve mevcut konuma inme sağlanmalı
      //  ilk durumda postlar temizlenmeli. bu aksiyon ilk durum için.
      setPosts([])
    }
    // eslint-disable-next-line
  },[userid,uniid])

  // bu noktada username yerine user id ile kişi bilgileri için istek yönetimi yapılacak

  // bu follow bilgisi bilgilerle kontrol edilecek
  // const [follow, setFollow] = useState(false);
  const [settings, setSettings] = useState();
  const [settingsUni, setSettingsUni] = useState();
  const [createClubState, setCreateClubState] = useState();
  const [isAdmin, setIsAdmin] = useState(false);

  const isYourProfile = mainState.user.id === userid;
 
 



  useEffect(() => {
    setIsAdmin(profileState.userInfo.adminId === mainState.user.id);
  }, [profileState.userInfo]); //eslint-disable-line

  // buradaki durum bilgisi istekle yönetilecek
  // degisti const isFollow = profileState.isFollow;
  const isFollow = profileState.userInfo.followedByUser;


  const classes = MainProfileStyles();
  const [showAdminChange, setShowAdminChange] = React.useState(false);
  const [showFollowsList, setShowFollowsList] = React.useState(false);
  const [showFollowersList, setShowFollowersList] = React.useState(false);
  const handleFollow = async () => {
    let type=""
    if (userid) type=TYPE_USER
    if (uniid) type=TYPE_UNI

      follow(
        mainState.user.id,
        profileState.userInfo.id,
        type,
        profileState,
        setProfileState,
        profileFollowers,
        setProfileFollowers
      );
    

  };
  const handleUnfollow = () => {

      unfollow(
        mainState.user.id,
        profileState,
        setProfileState,
        profileFollowers,
        setProfileFollowers
      );
    

  };

  return (
    <Grid id={"xyz"} container className={classes.HomeContainer}>
      {showAdminChange === true && (
        <AdminChangeModal
          mainUserId={mainState.user.id}
          profileState={profileState}
          setProfileState={setProfileState}
          showAdminChange={showAdminChange}
          setShowAdminChange={setShowAdminChange}
        />
      )}
      <FollowsListModal
        showFollowsList={showFollowsList}
        setShowFollowsList={setShowFollowsList}
      />
      {
        showFollowersList===true &&
        <FollowersListModal
          showFollowersList={showFollowersList}
          setShowFollowersList={setShowFollowersList}
        />
      }
      <Grid item className={classes.LeftSide}>
        <div className={classes.leftSideInner}>
          {isYourProfile && (
            <div className={classes.editButtonWrapper}>
              <IconButton
                aria-label="delete"
                onClick={() =>
                  setSettings({ ...profileState.userInfo, isopen: true })
                }
              >
                <EditIcon />
              </IconButton>
            </div>
          )}

          {isAdmin && (
            <div className={classes.editButtonWrapper}>
              <IconButton
                aria-label="delete"
                onClick={() =>
                  setSettingsUni({ ...profileState.userInfo, isopen: true })
                }
              >
                <EditIcon />
              </IconButton>
            </div>
          )}

          <UserAvatar profileImgId={profileState.userInfo.profileImgId} />
          <Typography variant="body1" className={classes.UserName}>
            {profileState.userInfo.name} {profileState.userInfo.surname}
          </Typography>
          <Divider />
          <Typography variant="body1" className={classes.UserName}>
            {profileState.userUniInfo?.name}
          </Typography>

          <Typography variant="body1" className={classes.UserDept}>
            {profileState.userInfo.type}
          </Typography>
          <Typography variant="body1" className={classes.UserDept}>
            {profileState.userInfo.description}
          </Typography>
          <Divider />
          <div className={classes.LeftSideFollowWrapper}>
            <Typography
              variant="body2"
              className={classes.UserDept}
              onClick={() => setShowFollowsList(true)}
              sx={{ cursor: "pointer !important" }}
            >
              {userid &&
                profileState?.userInfo?.countFollow+
                  " Follows"}
            </Typography>
            <Typography
              variant="body2"
              className={classes.UserDept}
              sx={{  cursor: userid?"pointer !important":"auto" }}
              onClick={() => {
                if (userid) setShowFollowersList(true);
              }}
            >
              {  profileState?.userInfo?.countFollower + " Followers"}
            </Typography>
          </div>

          <div className={classes.LeftSideButtonWrapper}>
            {isYourProfile && (
              <Button
                className={classes.LeftSideButton}
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => {
                  setNewPostState({
                    type: "Post",
                    isOpen: true,
                    ownerId: profileState.userInfo.id,
                    ownerType: isYourProfile ? "USER" : "UNIVERSITY",
                  });
                }}
              >
                New Post
              </Button>
            )}

            {isAdmin === false &&
              isYourProfile === false &&
              (isFollow ? (
                <Button
                  className={classes.LeftSideButton}
                  onClick={handleUnfollow}
                >
                  UnFollow
                </Button>
              ) : (
                <Button
                  className={classes.LeftSideButton}
                  onClick={handleFollow}
                >
                  Follow
                </Button>
              ))}

            {uniid && 
            (
              <div className={classes.AdminAreaWrapper}>
                <Divider />
                {isAdmin &&
                <div className={classes.AdminTitleWrapper}>
                  <StarIcon className={classes.AdminStarIcon} />
                  <div className={classes.AdminText}>Admin</div>
                </div>
                }
                <List component="nav" aria-label="mailbox folders">
                  <ListItem
                    onClick={() => setCreateClubState({ isopen: true })}
                    button
                  >
                    <ListItemText primary="Create Club" />
                  </ListItem>
                  {
                    isAdmin && (
                      <ListItem
                        onClick={() => setShowAdminChange(true)}
                        button
                        divider
                      >
                        <ListItemText primary="Hand Over Management" />
                      </ListItem>
                    )
                  }
                  <Divider />
                  {/* admin list is disable
                  <ListItem
                    onClick={() => setShowAdminList(true)}
                    button
                    divider
                  >
                    <ListItemText primary="Show Admins" />
                  </ListItem>
                  <Divider />
                    */}
                  { isAdmin &&
                  <ListItem
                    onClick={() => {
                      setNewPostState({
                        type: "Post",
                        isOpen: true,
                        ownerId: profileState.userInfo.id,
                        ownerType: isYourProfile ? "USER" : "UNIVERSITY",
                      });
                    }}
                    button
                    divider
                  >
                    <ListItemText primary="New Post" />
                  </ListItem>
                  }
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
          <NewPostModal
            modalState={newUniPostState}
            setModal={setNewUniPostState}
          />
        )}
        {settings && (
          <ProfileSettingsModal
            settings={settings}
            setSettings={setSettings}
            mainState={mainState}
            profileState={profileState}
            setProfileState={setProfileState}
          />
        )}
        {settingsUni && (
          <UniversitySettingsModal
            settings={settingsUni}
            setSettings={setSettingsUni}
            profileState={profileState}
            setProfileState={setProfileState}
            mainState={mainState}
          />
        )}
        {createClubState && (
          <CreateClubModal
            settings={createClubState}
            setSettings={setCreateClubState}
            adminId={mainState.user.id}
            universityId={profileState.userInfo.id}
          />
        )}
        {
          // responsive - profile menu
        }
        <div className={classes.CenterTopUserInfoWrapper}>
          <div className={classes.CenterTopUserInfoLeftSide}>
            <div className={classes.CenterTopUserInfoLeftSideAvatarWrapper}>
              <UserAvatarResponsive
                profileImgId={profileState.userInfo.profileImgId}
              />
            </div>
            <div className={classes.CenterTopButtonWrapper}>
              {isYourProfile && (
                <Button
                  onClick={() =>
                    setSettings({ ...profileState.userInfo, isopen: true })
                  }
                  className={classes.CenterTopButton}
                  endIcon={<EditIcon className={classes.CenterTopEditIcon} />}
                >
                  Edit
                </Button>
              )}
              {isAdmin && (
                <Button
                  onClick={() =>
                    setSettingsUni({ ...profileState.userInfo, isopen: true })
                  }
                  className={classes.CenterTopButton}
                  endIcon={<EditIcon className={classes.CenterTopEditIcon} />}
                >
                  Edit
                </Button>
              )}
              {isYourProfile === false &&
                isAdmin === false &&
                (isFollow ? (
                  <Button
                    onClick={handleUnfollow}
                    className={classes.CenterTopButton}
                  >
                    UnFollow
                  </Button>
                ) : (
                  <Button
                    onClick={handleFollow}
                    className={classes.CenterTopButton}
                  >
                    Follow
                  </Button>
                ))}
            </div>
          </div>
          <div className={classes.CenterTopUserInfoRightSide}>
            <div className={classes.CenterTopUserInfoRightSideUserName}>
              {profileState.userInfo?.name} {profileState.userInfo?.surname}
            </div>
            <div className={classes.CenterTopUserInfoRightSideUniversityName}>
              {profileState.userUniInfo?.name}
            </div>

            <div className={classes.CenterTopUserInfoRightSideUserType}>
              {profileState.userInfo?.type}
            </div>

            <div className={classes.CenterTopUserInfoRightSideFollowWrapper}>
              <div
                className={classes.CenterTopUserInfoRightSideFollowInfo}
                onClick={() => setShowFollowsList(true)}
              >
                {userid &&
                 
                 profileState?.userInfo?.countFollow+
                    " Follows"}
              </div>
              <div
                className={classes.CenterTopUserInfoRightSideFollowInfo}
                onClick={() => {
                  if (userid) setShowFollowersList(true);
                }}
              >
                {
                  profileState?.userInfo?.countFollower+
                  " Followers"}
              </div>
            </div>
          </div>
        </div>
 
          {
            uniid &&      
          <Acciordion
            createClubState={createClubState}
            setCreateClubState={setCreateClubState}
            setNewPostState={setNewPostState}
            ownerId={uniid&&uniid}
            showAdminChange={showAdminChange}
            setShowAdminChange={setShowAdminChange}
            isAdmin={isAdmin}
          />
        }

        <MyTabs isUni={uniid} tab={tab} setTab={setTab} />

        <Content tab={tab} userid={userid} uniid={uniid} />
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
