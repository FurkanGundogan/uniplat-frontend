import React, { useContext } from "react";
import PostCard from "./PostCard";
import PostAreaStyles from "./PostAreaStyles";

import {  useRef, useCallback } from "react";
import CircularProgressForTabs from "./CircularProgressForTabs";
import EndOfPosts from "./EndOfPosts";
import NoPosts from "./NoPosts";
import { useAuthState } from "../../Contexts";
import useGetPostFlow from "./useGetPostFlow";
import {PostsContext} from "./PostsContext"
// statik post verileri, postdetailaction'da bir tanesi seçilip kullanılıyor

function PostArea() {
  //const {postsState,setpostsState} = useContext(PostsContext)
  const classes = PostAreaStyles();
  const mainState = useAuthState(); //read user details from context
  const {posts,setPosts,pageNumber, setPageNumber,click}=useContext(PostsContext)
  const userid = mainState.user.id;
  // console.log("page:",pageNumber)

  //const [posts,setPosts]=useState([])
  const { hasMore, loading } = useGetPostFlow(userid, pageNumber,setPosts,click);
 
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
  return (
    <div className={classes.PostAreaWrapper}>
      {posts.map((p, index) => {
        if (posts.length === index + 1) {
          return (
            <div ref={lastPostElementRef} key={index} className="div">
              <PostCard
                post={p}
                owner={mainState.user}
                usertype={mainState.user.type}
              />
            </div>
          );
        } else {
          return (
            <PostCard
              key={index}
              post={p}
              owner={mainState.user}
              usertype={mainState.user.type}
            />
          );
        }
      })}
      {loading && <CircularProgressForTabs />}
      {!loading && !hasMore && posts.length===0 && <NoPosts />}
      {!loading && !hasMore && posts.length>0 && <EndOfPosts />}
    </div>
  );
}

export default PostArea;
