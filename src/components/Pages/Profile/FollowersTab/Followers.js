import * as React from "react";

import List from "@mui/material/List";

import MainProfileStyles from "../MainProfileStyles";

import CircularProgressForTabs from "../CircularProgressForTabs";


import Follower from "./Follower";
import { ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProfileContext } from "../ProfileContext";

function Followers() {
  const classes = MainProfileStyles();
  const navigate = useNavigate();
  const { profileFollowers} = useContext(ProfileContext);
  console.log("FLWS:", profileFollowers);



  return (
    <div className={classes.PostAreaWrapper}>
      <List sx={{ pt: 0 }}>
        {profileFollowers!==null ? (
          profileFollowers.map((follower, i) => (
            <ListItem button key={i}  onClick={() => {
              navigate("/" + follower?.userId);
            }}>
              <Follower
                follower={follower}
               
              />
            </ListItem>
          ))
        ) : (
          <CircularProgressForTabs />
        )}
      </List>
    </div>
  );
}

export default Followers;
