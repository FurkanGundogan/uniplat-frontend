import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';

  
export default function ShowMore({ownerType,ownerId,postId}) {
  const navigate = useNavigate();
  const locState = useLocation();
    return (
      <Stack spacing={2} mb={1} sx={{ padding: '10px' }}>
        <Button variant="outlined" size="medium"
        sx={{
            border:"1px solid rgb(79 83 87 / 50%)",
            color:"#6b6e72"
        }}
        onClick={(e) =>{

          navigate("/" +ownerType.toLowerCase()+"/"+ ownerId + "/posts/" + postId, {
            state: { prevPath: locState.pathname, scrollY: window.pageYOffset },
          })
          
        } 
          }
        >
          SHOW MORE
        </Button>
      </Stack>
    );
  }
