import React from 'react'
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
function UserItem({user,i}) {
  return (
    <div>
       <div key={i}>
          <ListItem key={i} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp">{""}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {user.description}
                  </Typography>
                  {" — İçerik kısa bilgisi..."}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider key={i+1} variant="inset" component="li" />
        </div>
    </div>
  )
}

export default UserItem