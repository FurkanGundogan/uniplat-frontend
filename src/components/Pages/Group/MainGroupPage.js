import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import MainGroupStyles from "./MainGroupStyles";
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
import GroupSettingsModal from "./GroupSettings/GroupSettingsModal";
import StarIcon from "@mui/icons-material/Star";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Acciordion from "./Accordion/Accordion";
import AdminListModal from "./AdminListModal";
import RequestListModal from "./RequestListModal";
import { NewClubPostModalContext } from "../../Contexts/NewClubPostModalContext";
const MainGroupPage = () => {
  // const navigate = useNavigate();
  const [tab, setTab] = React.useState(0);
  const mainState = useAuthState(); //read user details from context
  const { newPostState, setNewPostState } = useContext(NewPostModalContext);
  const { newClubPostState, setNewClubPostState } = useContext(NewClubPostModalContext);
  const { groupID } = useParams();

  console.log("groupid:", groupID);
  // bu follow bilgisi bilgilerle kontrol edilecek
  const [follow, setFollow] = useState(false);
  const [settings, setSettings] = useState();

  const isAdmin = groupID === "1";
  // const isMember = groupID === "2";
  // const [joinReq, setJoinReq] = useState(false);
  const classes = MainGroupStyles();
  const [showAdminList, setShowAdminList] = React.useState(false);
  const [showJoinReqList, setJoinReqList] = React.useState(false);
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
            {"Club Title"}
          </Typography>
          <Divider />
          <Typography variant="body1" className={classes.UserName}>
            {"Related Uni Name"}
          </Typography>
          <Divider />
          <div className={classes.LeftSideFollowWrapper}>
            <Typography variant="body2" className={classes.UserDept}>
              {"2 Members"}
            </Typography>
            <Typography variant="body2" className={classes.UserDept}>
              {"44 Followers"}
            </Typography>
          </div>
          <div className={classes.LeftSideButtonWrapper}>
            {/*
            isAdmin === false && isMember === false && (
              <Button
                className={classes.LeftSideButton}
                onClick={() => setJoinReq(!joinReq)}
              >
                {joinReq ? "Send Join Request" : "Waiting..."}
              </Button>
            )
            */
            }
            {isAdmin === false  && follow === false && (
              <Button
                className={classes.LeftSideButton}
                onClick={() => setFollow(!follow)}
              >
                Join
              </Button>
            )}
            {isAdmin === false  && follow === true && (
              <Button
                className={classes.LeftSideButton}
                onClick={() => setFollow(!follow)}
              >
                Leave
              </Button>
            )}
            {/*
            isAdmin === false && isMember === true && (
              <Button color="error" onClick={() => console.log("leave group")}>
                Leave
              </Button>
            )
            */
          }

            {isAdmin && (
              <div className={classes.AdminAreaWrapper}>
                <Divider />
                <div className={classes.AdminTitleWrapper}>
                  <StarIcon className={classes.AdminStarIcon} />
                  <div className={classes.AdminText}>Admin</div>
                </div>
                <List component="nav" aria-label="mailbox folders">
                  <Divider />
                  <ListItem onClick={() => setShowAdminList(true)} button>
                    <ListItemText primary="Show Admins" />
                  </ListItem>
                  <Divider />
                  {
                    /*
                  <ListItem onClick={() => setJoinReqList(true)} button>
                    <ListItemText primary="Show Join Requests" />
                  </ListItem>
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
          <GroupSettingsModal settings={settings} setSettings={setSettings} />
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
              {isAdmin && (
                <Button
                  onClick={() => setSettings({ isopen: true })}
                  className={classes.CenterTopButton}
                  endIcon={<EditIcon className={classes.CenterTopEditIcon} />}
                >
                  Edit
                </Button>
              )}

              {isAdmin === false && follow === false && (
                <Button
                  className={classes.CenterTopButton}
                  onClick={() => setFollow(!follow)}
                >
                  Join
                </Button>
              )}
              {isAdmin === false  && follow === true && (
                <Button
                  className={classes.CenterTopButton}
                  onClick={() => setFollow(!follow)}
                >
                  Leave
                </Button>
              )}
              {
                /*
              isAdmin === false && isMember === true && (
                <Button color="error" onClick={() => console.log("leave group")}>
                  Leave
                </Button>
              )
              */
              }
            </div>
          </div>
          <div className={classes.CenterTopUserInfoRightSide}>
            <div className={classes.CenterTopUserInfoRightSideUserName}>
              {"Club Title"}
            </div>
            <div className={classes.CenterTopUserInfoRightSideUniversityName}>
              {"Related Uni Name"}
            </div>

            <div className={classes.CenterTopUserInfoRightSideFollowWrapper}>
              <div className={classes.CenterTopUserInfoRightSideFollowInfo}>
                {"2 Members"}
              </div>
              <div className={classes.CenterTopUserInfoRightSideFollowInfo}>
                {"44 Followers"}
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

export default MainGroupPage;
