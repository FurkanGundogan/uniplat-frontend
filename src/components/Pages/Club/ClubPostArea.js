import React from 'react'
import MainClubStyles from './MainClubStyles'
// import {ClubContext} from "./ClubContext"
// import {useContext} from "react"
//import { useLocation } from "react-router-dom";
// statik post verileri, postdetailaction'da bir tanesi seçilip kullanılıyor

function ClubPostArea() {
  
  // const {clubState,setClubState} = useContext(ClubContext)
    const classes= MainClubStyles();
   // const locstate = useLocation();
  //  const owner=locstate.pathname.split('/')[1]
   
   
  return (
    <div className={classes.PostAreaWrapper}>
      {/*
        clubState.posts.filter(p=>p.owner===owner).map((p,i) => 

        <PostCard clubState={clubState} setClubState={setClubState} key={i} post={p}/>
        
        )
        */
      }
    </div>
  )
}

export default ClubPostArea