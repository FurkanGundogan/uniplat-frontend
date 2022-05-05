import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import GroupsIcon from '@mui/icons-material/Groups';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NavbarStyles from './NavbarStyles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useContext} from "react"
import { NewPostModalContext } from '../Contexts/NewPostModalContext';
import { useNavigate,useLocation } from "react-router-dom";
import { useAuthState } from '../Contexts';

export default function NavbarBottom() {
  const navigate = useNavigate();
  const classes=NavbarStyles();
  const mainState = useAuthState(); //read user details from context
  const {setNewPostState} = useContext(NewPostModalContext)
  const location=useLocation()
  const index=location.state?location.state.bottomindex:0
  const [value, setValue] = React.useState(index);


  return (
    <Box sx={{ width: 500 }} className={classes.NavbarBottom}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction 
        icon={<HomeIcon fontSize='large'/>} 
        onClick={()=>{
          window.scrollTo(0,0)
          navigate("/Home",{state:{...location.state,bottomindex:0}});
        }}
        />

        <BottomNavigationAction icon={<MailIcon fontSize='large'/>} />
        <BottomNavigationAction 
        icon={<AddCircleOutlineIcon fontSize='large'/>}
        onClick={()=>{
          setNewPostState({ type: "Post", isOpen: true,ownerId:mainState.user.id,ownerType:"USER"});
        }}
        />
        <BottomNavigationAction 
        onClick={()=>navigate("/social",{state:{...location.state,bottomindex:3}})}
        icon={<GroupsIcon fontSize='large'/>} />

        <BottomNavigationAction icon={<NotificationsIcon 
        onClick={()=>navigate("/notifications",{state:{...location.state,bottomindex:4}})} fontSize='large'/>} />
      </BottomNavigation>
    </Box>
  );
}