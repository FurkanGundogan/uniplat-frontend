import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { blue } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from '@mui/icons-material/Close';
import PostCardStyles from "./PostCardStyles";
import Divider from '@mui/material/Divider';
export default function LikesModal({ showLikes, setShowLikes }) {
    const classes = PostCardStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const likeUserList = ["username@gmail.com", "user02@gmail.com"];
  const handleListItemClick = (value) => {
    console.log(value);
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        open={showLikes}
        onClose={() => setShowLikes(false)}
        aria-labelledby="responsive-dialog-title"
        scroll="paper"
      >
         <div className={classes.LikeModalCloseIconWrapper}>
         <CloseIcon onClick={()=>setShowLikes(false)} className={classes.LikeModalCloseIcon}/>
         
        <DialogTitle className={classes.LikeModalTitle}  id="responsive-dialog-title">{"Likes"}</DialogTitle>
        </div>
        <Divider/>
        <DialogContent>
          <List sx={{ pt: 0 }}>
            {likeUserList.map((user,i) => (
              <ListItem
                button
                onClick={() => handleListItemClick(user)}
                key={i}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user} />
                
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
}
