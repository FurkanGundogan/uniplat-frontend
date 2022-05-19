import { makeStyles } from "@mui/styles";

const NavbarStyles = makeStyles((theme) => ({
  NavbarLeft: {
    width: "25%",
    display: "flex",
    [theme.breakpoints.down("md")]: {
      width: "40%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    "& .MuiInputBase-root": {
      width: "100%",
    }
  },
  NavbarMid: {
    width: "50%",
    display: "flex",
    justifyContent: "space-around",
    marginLeft: "0px",
    [theme.breakpoints.down("md")]: {
      width: "60%",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  NavbarRight: {
    width: "25%",
    display: "flex",
    justifyContent: "space-around",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  NavbarBottom: {
    position: "fixed",
    bottom: "0",
    width: "100% !important",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  NavbarLogo: {
    [theme.breakpoints.down("sm")]: {
      display: "none !important",
    },
  },
  NavbarAvatarWrap: {
    marginRight:"16px !important",
    display:"flex",
    alignItems:"center",
    [theme.breakpoints.up("sm")]: {
      display: "none !important",
     
    },
  },
  NavbarLogoutWrap: {
    alignSelf:"center",
    marginLeft:"14px",
    color:"#c16160",
    [theme.breakpoints.up("sm")]: {
      display: "none !important",
     
    },
  },
  uplogo:{
    width:"39px",
    height:"39px",
    border:"1px solid white",
    borderRadius:"4px"
  }

}));

export default NavbarStyles;
