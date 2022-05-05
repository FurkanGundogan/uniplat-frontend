import * as React from "react";

import List from "@mui/material/List";

import MainProfileStyles from "../MainProfileStyles";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CircularProgressForTabs from "../CircularProgressForTabs";
import {
  URL_CLUBS_BY_UNIVERSITYID,

} from "../../../Contexts/Paths";
import axios from "axios";
import ClubItem from "./ClubItem";
import { ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Clubs() {
  const classes = MainProfileStyles();
  const { uniid } = useParams();
  const navigate = useNavigate();
  const [uniClubs, setUniClubs] = useState();

  console.log("buradakiClubs:", uniClubs);
  useEffect(() => {
    const setClubs = async () => {
      await axios
        .get(URL_CLUBS_BY_UNIVERSITYID + uniid)
        .then((response) => {
          setUniClubs(response.data.content);
        })
        .catch((e) => {
          console.log("profile-uni-clubs-get-error");
        });
    };
    if (uniid !== undefined) {
      setClubs();
    }
  }, [uniid]); //eslint-disable-line

  return (
    <div className={classes.PostAreaWrapper}>
      <List sx={{ pt: 0 }}>
        {uniClubs ? (
          uniClubs.map((club, i) => (
            <ListItem button key={i}  onClick={() => {
              navigate("/clubs/" + club.id);
            }}>
              <ClubItem
                club={club}
               
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

export default Clubs;
