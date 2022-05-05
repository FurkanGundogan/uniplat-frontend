import { makeStyles } from "@mui/styles";

const NewPostModalStyles = makeStyles((theme) => ({
  modalBox: {
    overflowY: "auto",
    height: "75%",
    "& .MuiSnackbar-root.MuiSnackbar-anchorOriginTopCenter": {
      position:"sticky",
      height:"0",
      marginLeft:"50%"

    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      height: "100%",
      overflowX: "hidden",
      overflowY: "scroll",
      "& .MuiSnackbar-root.MuiSnackbar-anchorOriginTopCenter": {
        alignSelf: "center",
        top: "48px !important",
        left: "95px",
        right: "95px",
        textAlign: "center",
        marginLeft:"0px"
      },
    },
    "&:focus": {
      outline: "none !important",
    },
  },
  innerGlobal: {
    [theme.breakpoints.down("sm")]: {
      margin: "32px 18px 0px 18px",
    },
  },
  title: {
    fontSize: "32px",
    textAlign: "center",
    fontFamily: "'Exo 2'",
    marginBottom: "24px",
  },
  middleArea: {
    width: "100%",
    marginBottom: "24px",
  },
  text: {
    width: "100%",

    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "gray",
      borderRadius: "8px !important",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "gray",
      borderRadius: "8px !important",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid  gray",
      borderRadius: "8px !important",
    },
    "& .MuiOutlinedInput-input": {
      color: "black",
      fontFamily: "'Exo 2'",
      fontSize: "large",
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "black",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "black",
    },
    "& .MuiInputLabel-outlined": {
      color: "white",
    },
    "&:hover .MuiInputLabel-outlined": {
      color: "white",
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "black ",
    },
    [theme.breakpoints.down("sm")]: {},
  },
  mediaArea: {
    marginTop: "8px",
  },
  media: {
    maxWidth: "100%",
    borderRadius:"16px",
  },
  mediaClear: {
    position: "absolute",
    color: "white",
    cursor: "pointer",
    padding:"8px"
  },
  mediaEdit: {
    position: "absolute",
    color: "red",
    cursor: "pointer",
    padding:"8px"
  },
  bottom: {
    width: "100%",
    display: "flex",
  },
  bottomLeft: {
    width: "40%",
    "& .MuiToggleButton-root.MuiToggleButton-root": {
      color: "#8b8a8a",
      background: "white",
      border: "1px solid gray",
    },
    "& .MuiToggleButton-root.Mui-selected": {
      color: "white",
      background: "#218311",
    },
    "& .MuiToggleButton-root.Mui-selected:hover": {
      color: "white",
      background: "#218311",
    },
  },
  bottomMid: {
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "35%",
    },
  },
  bottomRight: {
    width: "20%",
    [theme.breakpoints.down("sm")]: {
      width: "25%",
    },
  },
  sendButton: {
    width: "100%",
    height: "40px",
    backgroundColor: "#0b3f3d !important",
    [theme.breakpoints.down("sm")]: {},
  },
  surveyArea: {
    marginTop: "12px",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      height: "200px",
      overflowX: "hidden",
      overflowY: "scroll",
    },
  },
  surveyTitle: {
    fontSize: "18px",
    fontFamily: "'Exo 2'",
    marginBottom: "8px",
    textAlign: "center",
  },
  optionIndexText: {
    fontSize: "16px !important",
    fontFamily: "Exo 2",
  },
  surveyOptionArea: {
    width: "100%",
    display: "flex",
    marginTop: "16px",
  },
  surveyOptionAreaLeft: {
    textAlign: "center",
    width: "10%",
    alignSelf: "center",
    marginTop: "4px",
  },
  surveyOptionAreaMid: {
    width: "68%",
    "& .MuiInput-input": {
      fontSize: "16px !important",
    },
    [theme.breakpoints.down("sm")]: {
      width: "60%",
    },
  },
  surveyOptionAreaRight: {
    alignSelf: "center",
    width: "12%",
    "& .MuiButtonBase-root.MuiIconButton-root": {
      padding: "0px",
      marginLeft: "8px",
      marginTop: "4px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "20%",
    },
  },
  surveyOptionAreaLeftGap: {
    width: "9%",
    [theme.breakpoints.down("sm")]: {
      width: "8%",
    },
  },
  surveyOptionAreaRightGap: {
    width: "9%",
    [theme.breakpoints.down("sm")]: {
      width: "2%",
    },
  },
  eventDetailsWrapper: {
    marginTop: "24px",
    width: "100%",
    display: "flex",
    "& .MuiOutlinedInput-input": {
      textAlign: "center",
    },
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  eventDetailsdateWrapper: {
    marginBottom: "24px",
    width: "48%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  eventDetailsGap: {
    marginBottom: "24px",
    width: "4%",
    [theme.breakpoints.down("sm")]: {
      width: "0%",
    },
  },
  eventDetailslocWrapper: {
    width: "48%",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  dateAndLocationTitle: {
    fontFamily: "'Exo 2'",
    fontSize: "18px",
  },
  dateAndLocationTitleWrapper: {
    textAlign: "center",
    marginBottom: "12px",
  },
  titleAreaWrapper:{
    maxWidth:"50%",
    marginLeft:"25%",
    [theme.breakpoints.down("sm")]: {
      maxWidth:"100%",
    marginLeft:"0%",
    },
  }
}));

export default NewPostModalStyles;
