import React from "react";
import PostCard from "./PostCard";
import MainProfileStyles from "./MainProfileStyles";
import { ProfileContext } from "./ProfileContext";
import { useContext,useEffect } from "react";
import { useParams } from "react-router-dom";
import { TYPE_USER, TYPE_UNI } from "../../Contexts/Paths";
import useGetPost from "./useGetPost";
import { useState, useRef, useCallback } from "react";
import CircularProgressForTabs from "./CircularProgressForTabs";
import EndOfPosts from "./EndOfPosts";

// statik post verileri, postdetailaction'da bir tanesi seçilip kullanılıyor

function ProfilePostArea() {
 
  const { profileState,posts,setPosts,pageNumber, setPageNumber,click } = useContext(ProfileContext);
  //
  const { userid, uniid } = useParams();
  const usertype = userid ? TYPE_USER : TYPE_UNI;

  const [owner, setOwner] = useState();

  //const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    setOwner(userid ? userid : uniid);
  }, [userid, uniid]);

  useEffect(() => {
    
        // profil degisikliginde tab yeniden render, tab indexi degismez
        // index degisikligi ile veri cekimi tetiklenmesi saglanmaktaydi
        // bu sebeple eski veriler temizlenmiyordu, bu sekilde bir cozum bulduk
        // dizi sıfırlama kısmı da profilepost area'da
    setPageNumber(0);
    // eslint-disable-next-line
  }, [owner]);

  const { //posts,
     hasMore, loading } = useGetPost(
    owner,
    usertype,
    pageNumber,
    setPosts,
    click
 
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

  
  const classes = MainProfileStyles();

  return (
    <div className={classes.PostAreaWrapper}>
      {posts.map((p, index) => {
        if (posts.length === index + 1) {
          return (
            <div ref={lastPostElementRef} key={index} className="div">
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
              key={index}
              post={p}
              owner={profileState.userInfo}
              usertype={usertype}
            />
          );
        }
      })}
      {loading && <CircularProgressForTabs />}
      {!loading && !hasMore && <EndOfPosts />}
    </div>
  );
}

export default ProfilePostArea;
