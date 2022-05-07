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

function ClubPostArea() {
  const { clubID } = useParams();
  const usertype = TYPE_CLUB;
  const [owner, setOwner] = useState();
  const [pageNumber, setPageNumber] = useState(0);
 const {clubState} = useContext(ClubContext)
    const classes= MainClubStyles();
    useEffect(() => {
      setOwner(clubID);
    }, [clubID]);

  useEffect(() => {
    
    // profil degisikliginde tab yeniden render, tab indexi degismez
    // index degisikligi ile veri cekimi tetiklenmesi saglanmaktaydi
    // bu sebeple eski veriler temizlenmiyordu, bu sekilde bir cozum bulduk
    // dizi sıfırlama kısmı da profilepost area'da
setPageNumber(0);
}, [owner]);

const { posts, hasMore, loading } = useGetPost(
  owner,
  usertype,
  pageNumber
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
   
  return (
    <div className={classes.PostAreaWrapper}>
      {
        posts.map((p, index) => {
          if (posts.length === index + 1) {
            return (
              <div ref={lastPostElementRef} key={p.id} className="div">
                <PostCard
                  post={p}
                  owner={clubState.clubInfo}
                  usertype={usertype}
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