import { makeStyles } from "@mui/styles";

const NewPostModalStyles = makeStyles((theme) => ({

  modalBox: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      height: "100%",
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
      fontSize:"large",
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
  bottom: {
    width: "100%",
    display: "flex",
  },
  bottomLeft: {
    width: "20%",
  },
  bottomMid: {
    width: "60%",
    [theme.breakpoints.down("sm")]: {
      width: "55%",
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
    
    [theme.breakpoints.down("sm")]: {},
  },
}));

export default NewPostModalStyles;
