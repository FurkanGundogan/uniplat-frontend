import React from 'react'
import PostCard from './PostCard'
import PostAreaStyles from './PostAreaStyles'
import {PostsContext} from "./PostsContext"
import {useContext} from "react"
// statik post verileri, postdetailaction'da bir tanesi seçilip kullanılıyor

function PostArea() {
  const {postsState,setpostsState} = useContext(PostsContext)
    const classes= PostAreaStyles();
    
  return (
    <div className={classes.PostAreaWrapper}>
      {
        postsState.posts.map((p,i) => <PostCard 
        postsState={postsState} 
        setpostsState={setpostsState} key={i} post={p}/>
        
        )
      }
    </div>
  )
}

export default PostArea