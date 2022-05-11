import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useGetActivityParticipant from "./useGetActivityParticipant";
import { useState, useRef, useCallback } from "react";
import CircularProgressForTabs from "../CircularProgressForTabs";
import EndOfPosts from "../EndOfPosts";
import ParticipatedEvent from "./ParticipatedEvent"

function ParticipatedEvents() {
 
  const { userid, uniid } = useParams();
  const [owner, setOwner] = useState();
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    setOwner(userid ? userid : uniid);
  }, [userid, uniid]);

  useEffect(() => {
    setPageNumber(0);
  }, [owner]);

  const { activityParticipants, hasMore, loading } = useGetActivityParticipant(
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
    [userid, loading, hasMore] //eslint-disable-line
  );
 
console.log("pagenumber:",pageNumber)
  

  return (

      <>
      {activityParticipants.map((p, index) => {
        if (activityParticipants.length === index + 1) {
          return (
            <div ref={lastPostElementRef} key={p.id} className="div">
                <ParticipatedEvent postid={p.postId}/>
            </div>
          );
        } else {
          return (
            <ParticipatedEvent postid={p.postId} key={p.id}/>
          );
        }
      })}
      {loading && <CircularProgressForTabs />}
      {!loading && !hasMore && <EndOfPosts />}
      </>
    

    
    
  );
}

export default ParticipatedEvents;
