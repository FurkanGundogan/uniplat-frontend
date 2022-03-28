import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
export default function UserAvatar({name="test",surname="test"}) {
  
  // const uname=name[0]+""
  const uname=name.toString().toLowerCase()+surname.toString().toLowerCase()
  const navigate = useNavigate();
  return (
    <Stack direction="row" sx={{justifyContent:"center"}} mt={2}
      onClick={
        ()=>{
          navigate("/"+uname)
        }
      }
    >
      <Avatar
        alt="Remy Sharp"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjYWb_kZ7jZ_aCJJdFjLqxS-DBaGsJGxopg&usqp=CAU"
        sx={{ width: 100, height: 100,cursor:"pointer" }}
      />
    </Stack>
  );
}