import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { URL_POST_COMMENTS } from '../../../Contexts/Paths';
import axios from 'axios';
export default function CommentActionPopupMenu({comment,setComments,setCommentCount}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCommentDelete = () => {
  


    axios({
      method: "DELETE",
      url: URL_POST_COMMENTS+"/"+comment.id,
    })
      .then((response) => {
        setComments(prev=>{
          console.log("prev",prev)
          return prev.filter(c=>c.id!==comment.id)
        })
        setCommentCount(prev=>(prev-1))

      })
      .catch((error) => {
        console.log("comment delete error",error);
      });

    handleClose()
  };

  return (
    <div>
      <MoreVertIcon  onClick={handleClick}/>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={()=>{
          
          handleCommentDelete()
          }}>Delete</MenuItem>

      </Menu>
    </div>
  );
}