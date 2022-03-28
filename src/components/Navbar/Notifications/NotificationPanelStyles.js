import { makeStyles } from "@mui/styles";

const NotificationPanelStyles = makeStyles((theme) => ({
 panel:{
     
     background:"none !important",
     position:"fixed",
     marginLeft:"60%",
     width:"30% !important",
     
     marginTop:"62px",
     
     zIndex:"1400",
     [theme.breakpoints.down("lg")]: {
        
        width:"35% !important",
      }, 
     [theme.breakpoints.down("md")]: {
        
        width:"35% !important",
      }, 
      [theme.breakpoints.down("sm")]: {
        display:"none"
      }, 
      
 },
 paper:{
     background:"#f9f9f9 !important",
        
       
        maxHeight:"500px",
        marginTop:"2px",
        overflowY:"scroll",
      
 }

}));

export default NotificationPanelStyles;
