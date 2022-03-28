import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const nots = [
  {
    id: "0",
    from: "Mehmet Ak",
    content: "Yeni bir etkinlik başlattı.",
  },
  {
    id: "1",
    from: "Furkan Gündoğan",
    content: "Fotoğrafına yorum yaptı.",
  },
  {
    id: "2",
    from: "Ayşe Sarı",
    content: "Gönderini beğendi.",
  },
  {
    id: "3",
    from: "Fatih Sultan Mehmet Vakıf Üniversitesi",
    content: "Yeni bir gönderi paylaştı.",
  },
  {
    id: "4",
    from: "Fatih Sultan Mehmet Vakıf Üniversitesi",
    content: "Yeni bir gönderi paylaştı.",
  },
  {
    id: "5",
    from: "İstanbul Üniversitesi",
    content: "Yeni bir gönderi paylaştı.",
  },
  {
    id: "6",
    from: "Furkan Gündoğan",
    content: "Fotoğrafına yorum yaptı.",
  },
  {
    id: "7",
    from: "Ayşe Sarı",
    content: "Gönderini beğendi.",
  },
];

export default function NotificationList() {
  return (
    <List sx={{ width: "100%", bgcolor: "none" }}>
      {nots &&
        nots.map((notification, i) => 
          <div key={i}>
            <ListItem key={i} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp">{notification.from[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={notification.from}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {notification.content}
                    </Typography>
                    {" — İçerik kısa bilgisi..."}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider key={i+1} variant="inset" component="li" />
          </div>
        )}
    </List>
  );
}
