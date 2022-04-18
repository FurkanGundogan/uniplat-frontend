import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import MainSocialPageStyles from "./MainSocialPageStyles";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { List, ListItem, ListItemText } from "@mui/material";
import { useAuthState } from "../../Contexts";
import CreateClubModal from "./SocialCreateClub/CreateClubModal";
import "react-awesome-lightbox/build/style.css";
import CreateUniModal from "./SocialCreateUni/CreateUniModal";
import Acciordion from "./Accordion/Accordion";
import Box from "@mui/material/Box";
import GroupCard from "./GroupCard/GroupCard";

const MainSocialPage = () => {
  const mainState = useAuthState(); //read user details from context

  console.log(mainState.user);
  const [createUniState, setCreateUniState] = useState();
  const [createClubState, setCreateClubState] = useState();
  const [isTeacher, setTeacher] = useState(mainState.user.type==="TEACHER");
  const classes = MainSocialPageStyles();
  return (
    <Grid container className={classes.HomeContainer}>
      <Grid item className={classes.LeftSide}>
        <div className={classes.leftSideInner}>
          <Divider />
          <ListItem sx={{ justifyContent: "center" }}>
            <Typography variant="subtitle1" gutterBottom component="div">
              SOCIAL
            </Typography>
          </ListItem>

          <Divider />
          {isTeacher && (
            <List component="nav" aria-label="mailbox folders">
              <ListItem
                onClick={() => setCreateUniState({ isopen: true })}
                button
              >
                <ListItemText primary="Create University" />
              </ListItem>
              <Divider />
              <ListItem
                onClick={() => setCreateClubState({ isopen: true })}
                button
              >
                <ListItemText primary="Create Club" />
              </ListItem>
            </List>
          )}
        </div>
      </Grid>
      
      <Grid item className={classes.Center}>
      {isTeacher && (
          <Acciordion
          
            setCreateUniState={setCreateUniState}
            setCreateClubState={setCreateClubState}
          />
        )}
        {createUniState && (
          <CreateUniModal
            user={mainState.user}
            settings={createUniState}
            setSettings={setCreateUniState}
          />
        )}
        {createClubState && (
          <CreateClubModal
            settings={createClubState}
            setSettings={setCreateClubState}
          />
        )}
        <div className={classes.SocialCenterInner}>
          <Typography
            variant="h5"
            sx={{ padding: "14px" }}
            color="text.primary"
          >
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
