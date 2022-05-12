import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SendIcon from '@mui/icons-material/Send';
import PostCardStyles from './PostCardStyles'
import { useAuthState } from "../../Contexts";
import { URL_FILES, URL_POST_COMMENTS } from "../../Contexts/Paths";
import axios from "axios";
import { Avatar } from "@mui/material";
import { red } from "@mui/material/colors";
function WriteCommentComponent({postId,comments,setComments}) {
  const mainState = useAuthState(); //read user details from context
  const [comment,setComment]=useState("")
  const handleSendComment = () => {

    axios({
      method:"POST",
      headers:{"userId":mainState.user.id},
      url:URL_POST_COMMENTS,
      data:{
        userId:mainState.user.id,
        postId:postId,
        comment
      }
  }).then(response=>{
    console.log("res:",response)
     setComments([response.data,...comments])
      
  }).catch(error=>{
    console.log("comment send error")
  })
}

   const classes=PostCardStyles();
  return (
    <div onClick={(e)=>{
      e.stopPropagation()
    }}>
      <Box className={classes.writeCommentArea} 
      sx={{ display: "flex", alignItems: "flex-end",padding:"0px 16px 0px 16px",marginBottom:"16px"}}>
        
        <Avatar
              sx={{ bgcolor: red[500], mr: 1,
                my: 0.5,
                alignSelf: "center", }}
              aria-label="recipe"
              src={mainState.user?.profileImgId && URL_FILES+"/"+mainState.user?.profileImgId}
            >
              asd
            </Avatar>
        <TextField label="Write Comment..." variant="standard"fullWidth 
        onChange={(e)=>{
          setComment(e.target.value)
        }}
        />
        <SendIcon className={classes.writeCommentSendbutton}
        onClick={()=>{handleSendComment()}}
        />
      </Box>
    </div>
  );
}

export default WriteCommentComponent;
