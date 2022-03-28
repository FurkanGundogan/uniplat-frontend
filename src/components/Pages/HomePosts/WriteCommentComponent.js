import React from "react";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import SendIcon from '@mui/icons-material/Send';
import PostCardStyles from './PostCardStyles'
function WriteCommentComponent() {
    
   const classes=PostCardStyles();
  return (
    <div onClick={(e)=>{
      e.stopPropagation()
    }}>
      <Box className={classes.writeCommentArea} 
      sx={{ display: "flex", alignItems: "flex-end",padding:"0px 16px 0px 16px",marginBottom:"16px"}}>
        <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5,fontSize:"48px" }} />
        <TextField label="Write Comment..." variant="standard"fullWidth />
        <SendIcon className={classes.writeCommentSendbutton}/>
      </Box>
    </div>
  );
}

export default WriteCommentComponent;
