import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import { blankavatarurl,URL_FILES } from '../../Contexts/Paths';
export default function UserAvatar({id="id",profileImgId}) {
  

  const navigate = useNavigate();
  
  const imgUrl=profileImgId?URL_FILES+"/"+profileImgId:blankavatarurl
  return (
    <Stack direction="row" sx={{justifyContent:"center"}}
      onClick={
        
        ()=>{
          if(id!=="id")
            navigate("/"+id)
        }
      }
    >
      <Avatar
        alt="Remy Sharp"
        src={imgUrl}
        sx={{ width: 64, height: 64,cursor:"pointer" }}
      />
    </Stack>
  );
}