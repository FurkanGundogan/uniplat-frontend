import React from 'react'
import MainProfileStyles from './MainProfileStyles'
import {ProfileContext} from "./ProfileContext"
import {useContext} from "react"
import GroupCard from "./GroupCard/GroupCard"
import { useLocation } from "react-router-dom";
// statik post verileri, postdetailaction'da bir tanesi seçilip kullanılıyor

function GroupArea() {
  
  const {profileState,setProfileState} = useContext(ProfileContext)
    const classes= MainProfileStyles();
    const locstate = useLocation();
    const owner=locstate.pathname.split('/')[1]
   
   
  return (
    <div className={classes.GroupAreaWrapper}>
      {
        profileState.groups.filter(p=>p.uni===owner).map((p,i) => 

        <GroupCard key={i} group={p}/>
        
        )
      }
    </div>
  )
}

export default GroupArea