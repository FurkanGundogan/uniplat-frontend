import * as React from "react";

import List from "@mui/material/List";

import MainClubStyles from "../MainClubStyles";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CircularProgressForTabs from "../../Profile/CircularProgressForTabs";
import {
  URL_USER_CLUBS_BY_CLUBID,
} from "../../../Contexts/Paths";
import axios from "axios";
import MemberItem from "./MemberItem";
import { ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Members() {
  const classes = MainClubStyles();
  const { clubID } = useParams();
  const navigate = useNavigate();
  const [clubMembers, setClubMembers] = useState();

  console.log("buradaki Members:", clubID, clubMembers);
  useEffect(() => {
    const setMembers = async () => {
      await axios
        .get(URL_USER_CLUBS_BY_CLUBID + clubID)
        .then((response) => {
          setClubMembers(response.data.content);
        })
        .catch((e) => {
          console.log("club-members-get-error");
        });
    };
    if (clubID !== undefined) {
      setMembers();
    }
  }, [clubID]); //eslint-disable-line

 
  return (
    <div className={classes.PostAreaWrapper}>
      <List sx={{ pt: 0 }}>
        {clubMembers ? (
          clubMembers.map((member, i) => (
            <ListItem button key={i}  onClick={() => {
              navigate("/" + member.userId);
            }}>
              <MemberItem
                member={member}
               
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

export default Members;
