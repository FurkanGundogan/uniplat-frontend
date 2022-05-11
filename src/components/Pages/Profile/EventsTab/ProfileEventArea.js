import React from "react";
import PostCard from "../PostCard";
import MainProfileStyles from "../MainProfileStyles";
import { ProfileContext } from "../ProfileContext";
import { useContext,useEffect } from "react";
import { useParams } from "react-router-dom";
import { TYPE_USER, TYPE_UNI } from "../../../Contexts/Paths";
import useGetEventPosts from "./useGetEventPosts";
import { useState, useRef, useCallback } from "react";
import CircularProgressForTabs from "../CircularProgressForTabs";
import EndOfPosts from "../EndOfPosts";
import EventListRadioButton from "./EventListRadioButton";
import ParticipatedEvents from "./ParticipatedEvents"
// statik post verileri, postdetailaction'da bir tanesi seçilip kullanılıyor

function ProfileEventArea() {
 
  const { profileState } = useContext(ProfileContext);
  //
  const { userid, uniid,clubID } = useParams();
  const usertype =clubID?clubID:(userid ? TYPE_USER : TYPE_UNI);

  const [owner, setOwner] = useState();

  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    setOwner(userid ? userid : uniid);
  }, [userid, uniid,clubID]);

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
    [userid, loading, hasMore] //eslint-disable-line
  );

  const [listTypeValue, setListTypeValue] = useState("Created");

  useEffect(() => {
    
    setListTypeValue("Created");
  }, [owner]);

  console.log("val:",listTypeValue)
  const classes = MainProfileStyles();

  return (
    <div className={classes.PostAreaWrapper}>
      {
        usertype===TYPE_USER &&
        <EventListRadioButton setListTypeValue={setListTypeValue} listTypeValue={listTypeValue}/>
        }
      {listTypeValue==="Created"&&
      <>
      {posts.map((p, index) => {
        if (posts.length === index + 1) {
          return (
            <div ref={lastPostElementRef} key={p.id} className="div">
              <PostCard
                post={p}
                owner={profileState.userInfo}
                usertype={usertype}
              />
            </div>
          );
        } else {
          return (
            <PostCard
              key={p.id}
              post={p}
              owner={profileState.userInfo}
              usertype={usertype}
            />
          );
        }
      })}
      {loading && <CircularProgressForTabs />}
      {!loading && !hasMore && <EndOfPosts />}
      </>
    }
    {
      listTypeValue==="Participant" && 
      <ParticipatedEvents/>
    }
    </div>
    
  );
}

export default ProfileEventArea;
