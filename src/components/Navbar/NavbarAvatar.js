import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../Contexts";
export default function NavbarAvatar() {

  const mainState = useAuthState(); //read user details from context

  const uname=mainState.user.name+mainState.user.surname
  const navigate = useNavigate();
  return (
    <Stack direction="row" sx={{justifyContent:"center"}}
      onClick={
        ()=>{
          navigate("/"+uname)
        }
      }
    >
      <Avatar
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjYWb_kZ7jZ_aCJJdFjLqxS-DBaGsJGxopg&usqp=CAU"
        sx={{ width: 35, height: 35,cursor:"pointer" }}
      />
    </Stack>
  );
}