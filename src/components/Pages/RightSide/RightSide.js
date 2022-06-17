import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import uniplatlogo from "../../../../src/components/uniplatlogo.png";
import RightSideStyles from "./RightSideStyles";
import { ReactComponent as UpLogo } from '../../logosmall.svg';
import GitHubIcon from '@mui/icons-material/GitHub';
import Grid from '@mui/material/Grid';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import InfoIcon from '@mui/icons-material/Info';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
function Copyright() {
    const classes=RightSideStyles()
    return (
      <Typography variant="body2" color="text.secondary" align="center" className={classes.copyright}>
        {" Uniplat © "}
        {new Date().getFullYear()}
        {""}
      </Typography>
    );
  }


const RightSide = () => {
    const classes=RightSideStyles()
    const navigate=useNavigate()
  return (
    <div className="div">
      <div className={classes.imageWrapper}>
        <img src={uniplatlogo} alt="" className={classes.image} />
      </div>
      <div className={classes.elementArea}>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid item xs={6}>
            <div className={classes.element}>
            <AccountBalanceIcon className={classes.icon}/>
        <a href="https://www.fsm.edu.tr/" rel="noreferrer" target="_blank" className={classes.element}>FSMVU</a>
        </div>
        </Grid>
        <Grid item xs={6} >
            <div className={classes.element}>
        <InfoIcon className={classes.icon}/>
        <div onClick={()=>navigate("/About")}  className={classes.element}>About</div>
        </div>
        </Grid>
        <Grid item xs={6}>
        <div className={classes.element}>
        {
        <GitHubIcon className={classes.icon}/>
        }
      <a href="https://github.com/FurkanGundogan/uniplat-frontend" rel="noreferrer" target="_blank" className={classes.element}>Github</a>
      </div>
        </Grid>
        <Grid item xs={6}>
        <div className={classes.element}>
        {
        <MarkEmailUnreadIcon className={classes.icon}/>
        }
      <a href="mailto: uniplat1010@gmail.com" rel="noreferrer" target="_blank" className={classes.element}>Contact</a>
      </div>
        </Grid>

      </Grid>
    </Box>
      </div>
      <Box sx={{ bgcolor: "background.paper", p: 6 }} className={classes.bottom} component="footer">
        <UpLogo className={classes.uplogo}/>
        <Copyright />
      </Box>
    </div>
  );
};

export default RightSide;
