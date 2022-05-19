import List from "@mui/material/List";

import MainProfileStyles from "../MainProfileStyles";

import CircularProgressForTabs from "../CircularProgressForTabs";

import MembershipItem from "./MembershipItem";
import { ListItem } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { ProfileContext } from "../ProfileContext";
import {SIZE, TYPE_CLUB, URL_USERFOLLOWS} from "../../../Contexts/Paths"
import axios from "axios";
import { useEffect } from "react";
function Memberships() {
  const classes = MainProfileStyles();

  const navigate = useNavigate();
  const { userid } = useParams();
  const { profileState } = useContext(ProfileContext);
 
  const [memberShips,setMemberShips]=useState()
  // console.log("ms:",userid,memberShips)
  useEffect(() => {
    const setUserMemberships = async () => {
        await axios({
          method: "GET",
          url: URL_USERFOLLOWS,
          params: {
            userId: profileState.userInfo.id,
            followType:TYPE_CLUB,
            size:SIZE,
          },
        })
        .then((response) => {
          setMemberShips(response.data.content);
        })
        .catch((e) => {
          console.log("clubs-get-error");
        });
    };
    if (userid !== undefined) {
      setUserMemberships();
    }
  }, [userid]); //eslint-disable-line
  return (
    <div className={classes.PostAreaWrapper}>
      <List sx={{ pt: 0 }}>
        {(memberShips!==null && memberShips!==undefined) ? (
          memberShips.map((membership, i) => (
            <ListItem button key={i}  onClick={() => {
              navigate("/clubs/" + membership?.followId);
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
