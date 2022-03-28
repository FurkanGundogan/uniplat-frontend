import React from "react";
import Grid from "@mui/material/Grid";
import NotificationPageStyles from "./NotificationPageStyles";
import NotificationList from './NotificationList'
const NotificationPage = () => {
  // bildirimler panel(desktop) ve sayfa(mobil) olmak üzere iki şekilde gösteriliyor
  // burası sayfa kısmı
  const classes = NotificationPageStyles();
  return (
    <Grid container className={classes.HomeContainer}>
      <Grid item className={classes.LeftSide}>
      </Grid>
      <Grid item className={classes.Center}>
        <div className={classes.notAreaWrapper} >
            <div className={classes.title}>Notifications</div>
            <NotificationList/>
        </div>
      </Grid>
      <Grid item className={classes.RightSide}>
        
      </Grid>
    </Grid>
  );
};

export default NotificationPage;
