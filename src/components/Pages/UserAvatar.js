import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import { UserExtraInfoContext } from "../Contexts/UserExtraInfoContext";
import { useContext } from 'react';
export default function UserAvatar({id="id"}) {
  
  // const uname=name[0]+""
 // const uname=name.toString().toLowerCase()+surname.toString().toLowerCase()
 const { userImg } = useContext(UserExtraInfoContext);
  const navigate = useNavigate();
  return (
    <Stack direction="row" sx={{justifyContent:"center"}} mt={2}
      onClick={
        
        ()=>{
          if(id!=="id")
            navigate("/"+id)
        }
      }
    >
      <Avatar
        alt="Remy Sharp"
        src={userImg?userImg:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjYWb_kZ7jZ_aCJJdFjLqxS-DBaGsJGxopg&usqp=CAU"}
        sx={{ width: 100, height: 100,cursor:"pointer" }}
      />
    </Stack>
  );
}