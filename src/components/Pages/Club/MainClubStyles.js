import { makeStyles } from "@mui/styles";

const MainClubStyles = makeStyles((theme) => ({
  HomeContainer: {
    padding: theme.spacing(12, 0, 0, 0),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(8, 0, 8, 0),
    },
  },
  LeftSide: {
    position: "fixed",
    width: "25%",

    [theme.breakpoints.down("md")]: {
      width: "30%",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  Center: {
    width: "50%",

    marginLeft: "25% !important",
    height: "100%",
    [theme.breakpoints.down("md")]: {
      width: "70%",
      marginLeft: "30% !important",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0 !important",
      width: "100%",
    },
    borderRadius: "16px",
  },
  RightSide: {
    position: "fixed",
    width: "25%",
    marginLeft: "75% !important",
    justifyContent: "space-around",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    borderRadius: "16px",
  },
  leftSideInner: {
    margin: theme.spacing(0, 4, 0, 12),
    border: "1px solid",
    borderRadius: "12px",
    [theme.breakpoints.down("lg")]: {
      margin: theme.spacing(0, 4, 0, 4),
    },
  },
  rightSideInner: {
    margin: theme.spacing(0, 12, 0, 4),
    border: "1px solid",
    borderRadius: "12px",
    [theme.breakpoints.down("lg")]: {
      margin: theme.spacing(0, 4, 0, 4),
    },
  },
  UserAvatar: {
    justifyContent: "center",
  },
  UserName: {
    margin: theme.spacing(1) + "!important",
    textAlign: "center",
  },
  UserUni: {
    margin: theme.spacing(1) + "!important",
    textAlign: "center",
  },
  UserDept: {
    margin: theme.spacing(1) + "!important",
    textAlign: "center",
  },
  LeftSideButtonWrapper: {
    display:"block",
    textAlign: "-webkit-center",
    marginBottom: "8px",
    marginTop:"8px",
  },
  LeftSideButton: {
    border: "1px solid black !important",
    paddingLeft: "16px !important",
    display:"block !important",
    paddingRight: "16px !important",
    paddingTop: "4px !important",
    paddingBottom: "4px !important",
    borderRadius: "18px !important",
    fontFamily: "'Exo 2' !important",
    fontSize: "14px !important",
    background: "black !important",
    color: "white !important",
    letterSpacing: "1px !important",
    marginBottom:"4px !important",
    "&:hover": {
      background: "#2195a3 !important",
      color: "white !important",
      borderColor: "white !important",
    },
  },
  LeftSideFollowWrapper: {

    justifyContent: "space-between",
  },
  mytabs: {
    [theme.breakpoints.up("lg")]: {
      paddingLeft: "72px",
      paddingRight: "72px",
    },
    "& .MuiTabs-flexContainer": {
      justifyContent: "space-between !important",
    },
  },
  CenterTopUserInfoWrapper: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    display: "flex",
    padding: "12px 6px 8px 6px",
    background: "#444c43",
  },
  CenterTopUserInfoLeftSide: {
    width: "25%",
  },
  CenterTopUserInfoRightSide: {
    width: "75%",
    paddingLeft: "8px",
  },
  CenterTopUserInfoLeftSideAvatarWrapper: {
    textAlign: "-webkit-center",
    marginBottom: "4px",
  },
  CenterTopUserInfoRightSideUserName: {
    paddingRight: "8px",
    fontFamily: "'Rubik'",
    color: "white",
  },
  CenterTopUserInfoRightSideUniversityName: {
    paddingTop: "8px",
    paddingRight: "8px",
    fontFamily: "'Exo 2'",
    fontSize: "14px",
    color: "white",
  },
  CenterTopUserInfoRightSideUserType: {
    paddingTop: "8px",
    paddingRight: "8px",
    fontFamily: "'Exo 2'",
    fontSize: "14px",
    color: "white",
  },
  CenterTopUserInfoRightSideFollowWrapper: {
    padding: "8px 8px 3px 0px",
    display: "flex",
    justifyContent: "flex-end",
  },
  CenterTopUserInfoRightSideFollowInfo: {
    fontFamily: "'Exo 2'",
    fontSize: "14px",
    color: "white",
    paddingLeft: "8px",
  },
  CenterTopUserInfoRightSideRequstButtonWrapper: {
    textAlign:"right !important"
  },
  CenterTopButtonWrapper: {
    textAlign: "center",
    paddingTop: "4px",

    "& span.MuiButton-endIcon": {
      marginLeft: "4px !important",
    },
  },
  CenterTopButton: {
    border: "1px solid black !important",
    paddingLeft: "16px !important",
    paddingRight: "16px !important",
    paddingTop: "4px !important",
    paddingBottom: "4px !important",
    borderRadius: "18px !important",
    fontFamily: "'Exo 2' !important",
    fontSize: "10px !important",
    background: "black !important",
    color: "white !important",
    letterSpacing: "1px !important",
    "&:hover": {
      background: "#2195a3 !important",
      color: "white !important",
      borderColor: "white !important",
    },
  },
  PostAreaWrapper: {
    [theme.breakpoints.up("lg")]: {
      paddingLeft: "72px",
      paddingRight: "72px",
    },
  },
  editButtonWrapper: {
    position: "absolute",
    margin: "0px 32px 0px 32px",
    right: "0",
  },

  CenterTopEditIcon: {
    fontSize: "12px !important",
  },
  AdminAreaWrapper: {
    marginTop: "12px",
    [theme.breakpoints.down("sm")]: {
      background:"#444c43",
      color:"white"
    },
  },
  AdminTitleWrapper: {
    marginTop: "8px",
    [theme.breakpoints.down("sm")]: {
      justifyContent:"center",
      display:"flex"
    },
  },
  AdminStarIcon: {
    color: "#2fbed3 !important",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px !important",
    },
  },
  AdminText: {
    fontFamily: "'Rubik'",
    fontSize: "16px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  
  },
  
  ListItem:{
    "& span.MuiTypography-root":{
    [theme.breakpoints.down("sm")]: {
      fontFamily: "'Exo 2'",
      fontSize: "14px !important",
    },
  }
  },
  responsiveAdminArea:{
    [theme.breakpoints.up("sm")]: {
     display:"none !important"
    },
  },
  AdminListModalCloseIconWrapper: {
    display: "flex",
  },
  AdminListModalCloseIcon: {
    marginLeft: "12px !important",
    alignSelf: "center",
    cursor: "pointer",
  },
  AdminListModalTitle: {
    padding: "14px 8px !important",
  },

  "@global": {
    body: {
      height: "100% !important",

      backgroundImage: "none",
    },
  },
}));

export default MainClubStyles;
