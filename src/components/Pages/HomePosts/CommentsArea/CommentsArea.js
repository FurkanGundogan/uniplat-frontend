import { Chip, Divider } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "../../../Contexts";
import { URL_POST_COMMENTS } from "../../../Contexts/Paths";
import WriteCommentComponent from "../WriteCommentComponent";
import Comment from "./Comment";
import ShowMore from "./ShowMore"
function CommentsArea({ postId }) {
    const mainState = useAuthState(); //read user details from context
  const [comments, setComments] = useState();
  const [showMore, setShowMore] = useState(false);
  console.log("show more?",showMore)
  useEffect(()=>{
    axios({
        method:"GET",
        url:URL_POST_COMMENTS,
        params:{
            postId:postId,
            page:0,
            size:5,
        },
        
    }).then(response=>{
        console.log("res:",response)
        if(response.data.page.totalElements>5)setShowMore(true)
        setComments(response.data.content)
        
    }).catch(error=>{
        console.log("get top coments error:",error)
    })


  },[postId])


  return (
    <>
    { 
    <WriteCommentComponent postId={postId}
    comments={comments}
    setComments={setComments}
    />}
    {
      <Divider sx={{marginBottom:"8px !important"}}>
        <Chip label="Top Comments" />
      </Divider>
    }
      {comments && comments.map((comment, i) => (
        <Comment key={i} comment={comment} mainUserId={mainState.user.id} />
      ))}
      {
          showMore && <ShowMore/>
      }
    </>
  );
}

export default CommentsArea;
