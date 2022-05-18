import { makeStyles } from "@mui/styles";

const AboutStyles = makeStyles((theme) => ({
  AnimatedNumbersArea: {
    display:"flex",
    justifyContent:"space-evenly",
    marginBottom:"12px",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      width:"40%",
      marginLeft:"30%",
    },
  },
  NumberItem:{
    marginBottom:"8px",
    width:"18%",
    [theme.breakpoints.down("sm")]: {
      width:"100%",
    },
  },
  Alert:{
    display:"block !important",
    fontSize:"48px !important",
    "& .animated-container":{
      justifyContent:"center !important"
    },
    "& .MuiAlert-icon":{
      marginRight:"0px !important",
      justifyContent:"center !important",
      fontSize:"32px !important",
    }
  },
  Title:{
    fontSize:"20px !important",
    textAlign:"center"
  },

}));

export default AboutStyles;
