import * as React from "react";

import List from "@mui/material/List";

import MainProfileStyles from "../MainProfileStyles";

import CircularProgressForTabs from "../CircularProgressForTabs";

import MembershipItem from "./MembershipItem";
import { ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProfileContext } from "../ProfileContext";

function Memberships() {
  const classes = MainProfileStyles();

  const navigate = useNavigate();

  const { profileClubs} = useContext(ProfileContext);
  console.log("membershipsss:", profileClubs);



  return (
    <div className={classes.PostAreaWrapper}>
      <List sx={{ pt: 0 }}>
        {profileClubs!==null ? (
          profileClubs.map((membership, i) => (
            <ListItem button key={i}  onClick={() => {
              navigate("/clubs/" + membership?.clubId);
            }}>
              <MembershipItem
                membership={membership}
               
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

export default Memberships;
