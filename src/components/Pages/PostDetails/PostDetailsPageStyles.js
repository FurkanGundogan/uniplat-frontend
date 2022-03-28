import { makeStyles } from "@mui/styles";

const PostDetailsPageStyles = makeStyles((theme) => ({
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
    [theme.breakpoints.up("lg")]: {
      paddingLeft: "72px",
      paddingRight: "72px",
    },
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
    marginLeft: "12px !important",
  },
  LeftSideButton: {
    color: "black !important",
  },
  "@global": {
    body: {
      height: "100% !important",

      backgroundImage: "none",
    },
  },

}));

export default PostDetailsPageStyles;
