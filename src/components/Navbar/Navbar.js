import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import SearchBar from './SearchBar';
import GroupsIcon from '@mui/icons-material/Groups';
import NavbarStyles from './NavbarStyles';
import AppleIcon from '@mui/icons-material/Apple';
import { useNavigate } from "react-router-dom";
import NavbarAvatar from './NavbarAvatar';
export default function Navbar() {
    const navigate = useNavigate();
    // farklı dosyadan(navbarstyles) stilleri alıyoruz 
    const classes = NavbarStyles();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">

                <Toolbar>
                    <div className={classes.NavbarLeft}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={()=>{
                                navigate("/Home")}}
                            className={classes.NavbarLogo}
                        >
                            <AppleIcon fontSize='medium'/>
                        </IconButton>
                        <div className={classes.NavbarAvatarWrap}>
                            <NavbarAvatar />
                        </div>
                        <SearchBar/>
                    </div>
                    <Box className={classes.NavbarMid}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={()=>{navigate("/Home")}}
                        >
                            <HomeIcon fontSize='large' />
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <GroupsIcon fontSize='large' />
                        </IconButton>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon fontSize='large' />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon fontSize='large' />
                            </Badge>
                        </IconButton>


                    </Box>
                    <Box className={classes.NavbarRight}>
                        Right
                    </Box>

                </Toolbar>
            </AppBar>

        </Box>
    );
}