import React from 'react'
import PostCard from '../HomePosts/PostCard'
import MainProfileStyles from './MainProfileStyles'
import {ProfileContext} from "./ProfileContext"
import {useContext} from "react"

import { useLocation } from "react-router-dom";
// statik post verileri, postdetailaction'da bir tanesi seçilip kullanılıyor

function ProfileEventArea() {
  
  const {profileState,setProfileState} = useContext(ProfileContext)
    const classes= MainProfileStyles();
    const locstate = useLocation();
    const owner=locstate.pathname.split('/')[1]
   
   
  return (
    <div className={classes.PostAreaWrapper}>
      {
        profileState.posts.filter(p=>p.owner===owner && p.type==="Event").map((p,i) => 

        <PostCard postsState={profileState} setpostsState={setProfileState} key={i} post={p}/>
        
        )
      }
    </div>
  )
}

export default ProfileEventArea