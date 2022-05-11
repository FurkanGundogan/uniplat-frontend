import { makeStyles } from "@mui/styles";

const EventAreaStyles = makeStyles((theme) => ({
 eventAreaWrapper:{
width:"100%",
marginBottom:"4px"
 },
 eventIconWrapper:{
     textAlign:"center",
 },
 eventDateText:{
    fontWeight:"bold",
    textAlign:"center",
    fontFamily:"monospace",
    fontSize:"14px",
 },
 eventTimeText:{
    fontWeight:"bold",
    textAlign:"center",
    fontFamily:"monospace",
    fontSize:"14px"
 },
 LocationWrapper:{
    textAlign:"center",
    marginBottom:"4px"
},
 eventLocationText:{
    fontWeight:"bold",
    textAlign:"center",
    fontFamily:"monospace",
    fontSize:"14px"
 },
 locationIcon:{
     fontSize:"14px !important",
     color:"red !important"
 },
 participantWrapper:{
     display:"flex",
     justifyContent:"center",
     marginBottom:"8px",
     
 },
 participantIcon:{
    fontSize:"16px !important",
    marginRight:"4px",
    color:"blue !important"
 },
 eventparticipantCountText:{
    fontWeight:"bold",
    textAlign:"center",
    fontFamily:"monospace",
    fontSize:"14px"
 },
 eventJoinButtonWrapper:{
     textAlign:"center",
     marginBottom:"8px",
 },
 eventJoinButton:{
     color:"gray !important",
     padding:"1px 48px !important",
     border:"1px solid gray !important",
     fontFamily:"cursive !important",
 },
 eventTitleText:{
    fontWeight:"bold",
    textAlign:"center",
    fontFamily:"monospace",
    fontSize:"16px",
    marginBottom:"8px",
 },
 
 
}));

export default EventAreaStyles;
