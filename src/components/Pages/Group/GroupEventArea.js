import React from 'react'
import PostCard from '../HomePosts/PostCard'
import MainGroupStyles from './MainGroupStyles'
import {GroupContext} from "./GroupContext"
import {useContext} from "react"

import { useLocation } from "react-router-dom";
// statik post verileri, postdetailaction'da bir tanesi seçilip kullanılıyor

function GroupEventArea() {
  
  const {groupState,setGroupState} = useContext(GroupContext)
    const classes= MainGroupStyles();
    const locstate = useLocation();
    const owner=locstate.pathname.split('/')[1]
   
   
  return (
    <div className={classes.PostAreaWrapper}>
      {
        groupState.posts.filter(p=>p.owner===owner && p.type==="Event").map((p,i) => 

        <PostCard groupState={groupState} setGroupState={setGroupState} key={i} post={p}/>
        
        )
      }
    </div>
  )
}

export default GroupEventArea