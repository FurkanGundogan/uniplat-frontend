import { makeStyles } from "@mui/styles";

const MainHomeStyles = makeStyles((theme) => ({
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
    backgroundColor: "white",
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
  LeftSidePostButtonWrapper: {
    textAlign: "center",
    marginBottom: "8px",
  },
  LeftSidePostButton: {
    border: "1px solid black !important",
    paddingLeft: "16px !important",
    paddingRight: "16px !important",
    paddingTop: "4px !important",
    paddingBottom: "4px !important",
    borderRadius: "18px !important",
    fontFamily: "'Exo 2' !important",
    fontSize: "14px !important",
    background: "black !important",
    color: "white !important",
    letterSpacing: "1px !important",
    "&:hover": {
      background: "#2195a3 !important",
      color: "white !important",
      borderColor: "white !important",
    },
  },
  LeftSideButtonWrapper: {
    marginLeft: "12px !important",
  },
  LeftSideButton: {
    color: "black !important",
  },
  LeftSideExitButtonWrapper: {
    textAlign: "center",
    marginBottom: "8px",
    marginTop:"18px",
  },
  "@global": {
    body: {
      height: "100% !important",

      backgroundImage: "none",
    },
  },
}));

export default MainHomeStyles;
