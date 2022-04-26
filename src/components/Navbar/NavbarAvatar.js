import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../Contexts";
import {useContext} from "react"
import { UserExtraInfoContext } from "../Contexts/UserExtraInfoContext";
export default function NavbarAvatar() {

  const mainState = useAuthState(); //read user details from context

  const userid=mainState.user.id
  const blankavatarurl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjYWb_kZ7jZ_aCJJdFjLqxS-DBaGsJGxopg&usqp=CAU"
  const { userImg } = useContext(UserExtraInfoContext);
  const navigate = useNavigate();
  return (
    <Stack direction="row" sx={{justifyContent:"center"}}
      onClick={
        ()=>{
          navigate("/"+userid)
        }
      }
    >
      <Avatar
        src={userImg?userImg:blankavatarurl}
        sx={{ width: 35, height: 35,cursor:"pointer" }}
      />
    </Stack>
  );
}