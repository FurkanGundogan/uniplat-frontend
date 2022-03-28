import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import MainSocialPageStyles from "./MainSocialPageStyles";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { List, ListItem, ListItemText } from "@mui/material";
import { useAuthState } from "../../Contexts";

import "react-awesome-lightbox/build/style.css";
import CreateUniModal from "./SocialCreateUni/CreateUniModal";

import Box from "@mui/material/Box";
import GroupCard from "./GroupCard/GroupCard";


const MainSocialPage = () => {
  const mainState = useAuthState(); //read user details from context

  console.log(mainState.user);
  const [createUniState, setCreateUniState] = useState();
  const classes = MainSocialPageStyles();
  return (
    <Grid container className={classes.HomeContainer}>
      <Grid item className={classes.LeftSide}>
        <div className={classes.leftSideInner}>
          <Divider />
          <List component="nav" aria-label="mailbox folders">
            <ListItem
              onClick={() => setCreateUniState({ isopen: true })}
              button
            >
              <ListItemText primary="Create University" />
            </ListItem>
            <Divider />
          </List>
        </div>
      </Grid>
      <Grid item className={classes.Center}>
        {createUniState && (
          <CreateUniModal
            settings={createUniState}
            setSettings={setCreateUniState}
          />
        )}
        <div className={classes.SocialCenterInner}>
         
        <Typography variant="h5" sx={{padding:"14px"}} color="text.primary">
          CLUBS
        </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container className={classes.mygridcontainer} spacing={3}>
              <Grid item xs={6} className={classes.mygrid}>
                <GroupCard />
              </Grid>
              <Grid item xs={6} className={classes.mygrid}>
                <GroupCard />
              </Grid>
              <Grid item xs={6} className={classes.mygrid}>
                <GroupCard />
              </Grid>
            </Grid>
          </Box>
          <Typography variant="h5" sx={{padding:"14px"}} color="text.primary">
          YOUR JOIN REQUESTS
        </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container className={classes.mygridcontainer} spacing={3}>
              <Grid item xs={6} className={classes.mygrid}>
                <GroupCard />
              </Grid>
              <Grid item xs={6} className={classes.mygrid}>
                <GroupCard />
              </Grid>
              <Grid item xs={6} className={classes.mygrid}>
                <GroupCard />
              </Grid>
            </Grid>
          </Box>
        </div>
      </Grid>
      <Grid item className={classes.RightSide}>
        <div className={classes.rightSideInner}>
          <Typography variant="body1" className={classes.UserDept}>
            Right Side
          </Typography>
          <Typography variant="body1" className={classes.UserDept}>
            Right Side
          </Typography>
          <Typography variant="body1" className={classes.UserDept}>
            Right Side
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default MainSocialPage;
