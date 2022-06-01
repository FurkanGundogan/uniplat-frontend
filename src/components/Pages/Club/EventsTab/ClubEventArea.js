import React from "react";
import PostCard from "../../Profile/PostCard";
import MainProfileStyles from "../../Profile/MainProfileStyles";
import { useContext,useEffect } from "react";
import { useParams } from "react-router-dom";
import { TYPE_CLUB } from "../../../Contexts/Paths";
import useGetEventPosts from "./useGetEventPosts";
import { useState, useRef, useCallback } from "react";
import CircularProgressForTabs from "../CircularProgressForTabs";
import EndOfPosts from "../../Profile/EndOfPosts";
import {ClubContext} from "../ClubContext"
// statik post verileri, postdetailaction'da bir tanesi seçilip kullanılıyor

function ClubEventArea({isAdmin}) {
 
  const { clubState } = useContext(ClubContext);
  //
  const {clubID } = useParams();
  const usertype =TYPE_CLUB

  const [owner, setOwner] = useState();

  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    setOwner(clubID);
  }, [clubID]);

  useEffect(() => {
    setPageNumber(0);
  }, [owner]);

  const { posts, hasMore, loading } = useGetEventPosts(
    owner,
    usertype,
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
    [clubID, loading, hasMore] //eslint-disable-line
  );

  


  const classes = MainProfileStyles();

  return (
    <div className={classes.PostAreaWrapper}>

     
      <>
      {posts.map((p, index) => {
        if (posts.length === index + 1) {
          return (
            <div ref={lastPostElementRef} key={p.id} className="div">
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
              key={p.id}
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
      </>
    

    </div>
    
  );
}

export default ClubEventArea;
