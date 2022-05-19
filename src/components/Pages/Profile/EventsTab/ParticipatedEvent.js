import axios from "axios";
import React, {  useEffect, useState } from "react";
import { useAuthState } from "../../../Contexts";
import { TYPE_CLUB, TYPE_UNI, TYPE_USER, URL_CLUBS, URL_POSTS, URL_UNIVERSITIES, URL_USERS } from "../../../Contexts/Paths";
import PostCard from "../PostCard";


function ParticipatedEvent({ postid }) {

const mainState = useAuthState(); //read user details from context
const [post,setPost]=useState();
useEffect(()=>{
    axios({
        method:"GET",
        url:URL_POSTS+"/"+postid,
        headers:{"userId":mainState.user.id},

    }).then(response=>{
        setPost(response.data)
        
    }).catch(error=>{
        console.log("set post error on profile event tab")
    })
},[mainState.user.id,postid])


const [postOwner,setPostOwner]=useState()

useEffect(()=>{
    if(post!==undefined){
        let target=""
            if(post.ownerType===TYPE_USER) target=URL_USERS
            if(post.ownerType===TYPE_UNI) target=URL_UNIVERSITIES
            if(post.ownerType===TYPE_CLUB) target=URL_CLUBS
        axios({
            method:"GET",
            headers:{"userId":mainState.user.id},
            url:target+"/"+post.ownerId,
            
        }).then(response=>{
            setPostOwner(response.data)
            
        }).catch(error=>{
            console.log("set post owner error on profile event tab")
        })
    }
   
},[post,mainState.user.id])
//console.log("owner:",postOwner)
  return (
    <div>
      {(post && postOwner) && 
          <PostCard post={post} owner={postOwner} usertype={post.ownerType} />
        }
    </div>
  );
}

export default ParticipatedEvent;
