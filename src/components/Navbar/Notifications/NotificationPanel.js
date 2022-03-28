import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';

import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import NotificationPanelStyles from './NotificationPanelStyles'
import NotificationList from "../../Pages/Notifications/NotificationList"

export default function NotificationPanel({notificationState,setNotificationState}) {

  // bildirimler panel(desktop) ve sayfa(mobil) olmak üzere iki şekilde gösteriliyor
  // burası panel kısmı

  const classes = NotificationPanelStyles();
  const handleClose = (event) => {
    setNotificationState({...notificationState,isOpen:false});
  };

  return (
    notificationState.isOpen &&
    <Stack direction="row" spacing={2}>
      <div id='abc'className={classes.panel}>
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                   autoFocusItem={notificationState.isOpen}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                  >
                    <NotificationList/>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
      </div>
    </Stack>
  );
}