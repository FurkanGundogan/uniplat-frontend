import * as React from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { blue } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton, Typography } from "@mui/material";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import MainGroupStyles from './MainClubStyles'
import { useParams } from "react-router-dom";

function Members() {
  const classes= MainGroupStyles();
  const { groupID } = useParams();
  const isAdmin = groupID === "1";
    const memmbers = ["username@gmail.com", "user02@gmail.com"];
    const handleListItemClick = (value) => {
        console.log(value);
      };
  return (
    <div className={classes.PostAreaWrapper}>
    <List sx={{ pt: 0 }}>
            {memmbers.map((user,i) => (
              <ListItem
                button
                key={i}
                secondaryAction={
                  (isAdmin&&
                    <IconButton onClick={() => handleListItemClick(user)} edge="end" aria-label="delete">
                      <PersonRemoveIcon />
                    </IconButton>
                  )
                  }
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                primary={"Ahmet Ak"}  
                secondary={
                    <React.Fragment>
                      <Typography
                      component="span"
                        sx={{ display: 'inline' }}
                        variant="body2"
                        color={"gray"}
                      >
                         {user}
                      </Typography>
                     
                    </React.Fragment>
                  }
                />
                
              </ListItem>
            ))}
          </List>
          </div>
  )
}

export default Members