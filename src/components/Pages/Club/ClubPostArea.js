import React from 'react'
import { TYPE_CLUB } from '../../Contexts/Paths';
import MainClubStyles from './MainClubStyles'
import PostCard from "../Profile/PostCard";
import { useContext,useEffect } from "react";
import { useParams } from "react-router-dom";
import useGetPost from "./useGetPost";
import { useState, useRef, useCallback } from "react";
import CircularProgressForTabs from "./CircularProgressForTabs";
import EndOfPosts from "../Profile/EndOfPosts";
import {ClubContext} from "./ClubContext"

function ClubPostArea({isAdmin}) {
  const { clubID } = useParams();
  const usertype = TYPE_CLUB;
  const [owner, setOwner] = useState();
 
 const {clubState,postsAtClub,setPostsAtClub,pageNumberAtClub, setPageNumberAtClub,click} = useContext(ClubContext)

 const classes= MainClubStyles();
    useEffect(() => {
      
      setOwner(clubID);
    }, [clubID]);

  useEffect(() => {
   
    
    setPageNumberAtClub(0);
    // eslint-disable-next-line
}, [owner]);

const { hasMore, loading } = useGetPost(
  owner,
  usertype,
  pageNumberAtClub,
  setPostsAtClub,
  click,
);

const observer = useRef();
const lastPostElementRef = useCallback(
  (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumberAtClub((prevPageNumber) => prevPageNumber + 1);
      }
    });
    if (node) observer.current.observe(node);
  },
  [clubID, loading, hasMore] //eslint-disable-line
);
   
  return (
    <div className={classes.PostAreaWrapper}>
      {
        postsAtClub.map((p, index) => {
          if (postsAtClub.length === index + 1) {
            return (
              <div ref={lastPostElementRef} key={index} className="div">
                <PostCard
                  post={p}
                  owner={clubState.clubInfo}
                  usertype={usertype}
                  isAdmin={isAdmin}
                />
              </div>
            );
          } else {
            return (
              <PostCard
                key={index}
                post={p}
                owner={clubState.clubInfo}
                usertype={usertype}
                isAdmin={isAdmin}
              />
            );
          }
        })}
        {loading && <CircularProgressForTabs />}
        {!loading && !hasMore && <EndOfPosts />}
      
    </div>
  )
}

export default ClubPostArea