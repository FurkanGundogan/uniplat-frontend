import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from "@mui/icons-material/Home";
import SearchBar from "./SearchBar";
import GroupsIcon from "@mui/icons-material/Groups";
import NavbarStyles from "./NavbarStyles";
import { useNavigate } from "react-router-dom";
import NavbarAvatar from "./NavbarAvatar";
import NotificationPanel from "./Notifications/NotificationPanel";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAuthDispatch, logout } from "../Contexts";
import { useState } from "react";
import { PostsContext } from "../Pages/HomePosts/PostsContext";
import InfoIcon from '@mui/icons-material/Info';
import { ReactComponent as UpLogo } from '../logosmall.svg';
export default function Navbar() {
  const [notificationState, setNotificationState] = useState({ isOpen: false });
  const {setPageNumber,setPosts,setClick}=React.useContext(PostsContext)
  const dispatch = useAuthDispatch(); // read dispatch method from context
  const handleLogout = () => {
    
    logout(dispatch);
    window.location.href = "/SignIn";
    
  };

  const handleHomeClick = () => {
    // setPageNumber(1)
    setClick(p=>p+1)
  }

  const navigate = useNavigate();
  // farklı dosyadan(navbarstyles) stilleri alıyoruz
  const classes = NavbarStyles();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{background:"#0f2943 !important"}}>
        <Toolbar>
          <div className={classes.NavbarLeft}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              
              onClick={(e) => {
                handleHomeClick()
                setPosts([])
                setPageNumber(0)
                navigate("/Home");
              }}
              className={classes.NavbarLogo}
            >
              
              
              {
              
                <UpLogo className={classes.uplogo}/>
                
              }
             
            </IconButton>
            <div className={classes.NavbarAvatarWrap}>
              <NavbarAvatar />
            </div>
            <SearchBar />
            <div className={classes.NavbarLogoutWrap}>
              <ExitToAppIcon onClick={handleLogout} />
            </div>
          </div>
          <Box className={classes.NavbarMid}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              onClick={() => {
                window.scrollTo(0,0)
                handleHomeClick()
                  setPosts([])
                  setPageNumber(0)

                navigate("/Home");
              }}
            >
              <HomeIcon fontSize="large" />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              onClick={(e) => {
                
                navigate("/Social");
              }}
            >
              <GroupsIcon fontSize="large" />
            </IconButton>
            <IconButton
              size="large"
              aria-label="about"
              color="inherit"
              onClick={(e) => {
                
                navigate("/About");
              }}
              
            >
                <InfoIcon fontSize="large" />
            </IconButton>
            <IconButton
              sx={{display:"none"}}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              
              onClick={() =>{
                setNotificationState({
                  ...notificationState,
                  isOpen: !notificationState.isOpen,
                })
                
              }
              }
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon
                  
                  fontSize="large"
                  
                />
              </Badge>
            </IconButton>
          </Box>
          <Box className={classes.NavbarRight}></Box>
        </Toolbar>
      </AppBar>
      <NotificationPanel
        notificationState={notificationState}
        setNotificationState={setNotificationState}
        
      />
    </Box>
  );
}
