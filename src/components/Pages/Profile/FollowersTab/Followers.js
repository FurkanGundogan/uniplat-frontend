import * as React from "react";

import List from "@mui/material/List";

import MainProfileStyles from "../MainProfileStyles";

import CircularProgressForTabs from "../CircularProgressForTabs";


import Follower from "./Follower";
import { ListItem } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useContext,useCallback,useState,useEffect,useRef } from "react";
import { ProfileContext } from "../ProfileContext";
import UseGetFollowers from "./UseGetFollowers";

function Followers() {
  const classes = MainProfileStyles();
  const navigate = useNavigate();
  const { profileFollowers} = useContext(ProfileContext);
  console.log("FLWS:", profileFollowers);
  const { userid, uniid,clubID } = useParams();
  const [pageNumber, setPageNumber] = useState(0);
  const [owner, setOwner] = useState();
  useEffect(() => {
    setOwner(clubID?clubID:(userid ? userid : uniid));
  }, [userid, uniid,clubID]);

  const { followers, hasMore, loading } = UseGetFollowers(
    owner,
    pageNumber,
  );
   
  const observer = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [userid, uniid,clubID, loading, hasMore] //eslint-disable-line
  );


  console.log("followerssss:",followers)
  return (
    <div className={classes.PostAreaWrapper}>
      <List sx={{ pt: 0 }}>
        {(followers!==null && followers!==undefined) ? (
          followers.map((follower, i) => {
            if (followers.length === i + 1) {
              return <ListItem 
              ref={lastPostElementRef}
              button 
              key={i}  
              onClick={() => {
                navigate("/" + follower?.userId);
              }}>
                <Follower
                  follower={follower}
                />
              </ListItem>
            }else{
              return <ListItem button
              key={i}
              onClick={() => {
                navigate("/" + follower?.userId);
              }}>
                <Follower
                  follower={follower}
                />
              </ListItem>
            }
           
            })
        ) : (
          <CircularProgressForTabs />
        )}
      </List>
    </div>
  );
}

export default Followers;
