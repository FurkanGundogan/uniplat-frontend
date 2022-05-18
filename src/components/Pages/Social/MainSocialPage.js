import React, { useState, useEffect } from "react";
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
import UniversityCard from "./UniversityCard/UniversityCard";
import { blankavatar } from "../../Contexts/Paths";

import {
  getUserClubs,
  getUserUniversities,
  getUserUniversitiesAsAdmin,
  getUserClubsAsAdmin,
} from "./SocialInfoActions";
const MainSocialPage = () => {
  const mainState = useAuthState(); //read user details from context

  const [clubs, setClubs] = useState();
  const [clubsAsAdmin, setClubsAsAdmin] = useState();
  const [universities, setUniversities] = useState();
  const [universitiesAsAdmin, setUniversitiesAsAdmin] = useState();

  useEffect(() => {
    getUserClubs(mainState.user.id, setClubs);
    getUserUniversities(mainState.user.id, setUniversities);
    getUserUniversitiesAsAdmin(mainState.user.id, setUniversitiesAsAdmin);
    getUserClubsAsAdmin(mainState.user.id, setClubsAsAdmin);
  }, [mainState.user.id]);

  const [createUniState, setCreateUniState] = useState();
  const [createClubState, setCreateClubState] = useState();
  const [isTeacher] = useState(mainState.user.type === "TEACHER");
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
          <List component="nav" aria-label="mailbox folders">
            {isTeacher && (
              <>
              <ListItem
                onClick={() => setCreateUniState({ isopen: true })}
                button
              >
                <ListItemText primary="Create University" />
              </ListItem>
              <Divider />
              </>
            )}
            
            <ListItem
              onClick={() => setCreateClubState({ isopen: true })}
              button
            >
              <ListItemText primary="Create Club" />
            </ListItem>
          </List>
        </div>
      </Grid>

      <Grid item className={classes.Center}>
        {(
          <Acciordion
            setCreateUniState={setCreateUniState}
            setCreateClubState={setCreateClubState}
            isTeacher={isTeacher}
          />
        )}
        {createUniState && (
          <CreateUniModal
            settings={createUniState}
            setSettings={setCreateUniState}
            adminId={mainState.user.id}
          />
        )}
        {createClubState && (
          <CreateClubModal
            settings={createClubState}
            setSettings={setCreateClubState}
            adminId={mainState.user.id}
            profileImgId={blankavatar}
          />
        )}
        <div className={classes.SocialCenterInner}>
          <Typography
            variant="h5"
            sx={{ padding: "14px" }}
            color="text.primary"
          >
            UNIVERSITIES
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container className={classes.mygridcontainer} spacing={3}>
              {universities !== undefined &&
                universities.map((userUni, index) => (
                  <Grid key={index} item xs={6} className={classes.mygrid}>
                    <UniversityCard
                      universityId={userUni.followId}
                      universitiesAsAdmin={universitiesAsAdmin}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>

          <Typography
            variant="h5"
            sx={{ padding: "14px" }}
            color="text.primary"
          >
            CLUBS
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container className={classes.mygridcontainer} spacing={3}>
              {clubs !== undefined &&
                clubs.map((userClub, index) => (
                  <Grid key={index} item xs={6} className={classes.mygrid}>
                    <GroupCard
                      clubId={userClub.followId}
                      clubsAsAdmin={clubsAsAdmin}
                    />
                  </Grid>
                ))}
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
