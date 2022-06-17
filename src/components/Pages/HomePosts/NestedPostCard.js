import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { useAuthState } from "../../Contexts";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostCardStyles from "./PostCardStyles";
import EventArea from "./EventArea";
import { useNavigate, useLocation } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import { TYPE_CLUB, TYPE_UNI, TYPE_USER, URL_POSTS, URL_USERS,URL_FILES, URL_UNIVERSITIES, URL_CLUBS } from "../../Contexts/Paths";
import { useState,useEffect } from "react";
import axios from "axios";

export default function PostCard({ postId }) {
  const mainState = useAuthState(); //read user details from context
  const [post, setPost] = useState();



  useEffect(() => {
    axios
      .get(URL_POSTS + "/" + postId, { headers: { "userId": mainState.user.id } })
      .then((response) => {
        setPost(response.data);
      })
      .catch((e) => {
        console.log("shared card-post details-get-error");
      });
  }, [postId, mainState.user.id]);


  const [owner, setOwner] = useState();
 
  useEffect(() => {
    if(post!==undefined && post !==null){

      let target = "";
      if (post?.ownerType === TYPE_USER) target = URL_USERS;
      if (post?.ownerType === TYPE_CLUB) target = URL_CLUBS;
      if (post?.ownerType === TYPE_UNI) target =URL_UNIVERSITIES;

      axios({
        method:"GET",
        headers:{"userId":mainState.user.id},
        url:target + "/" + post?.ownerId})
      .then((response) => {
        setOwner(response.data);
      })
      .catch((e) => {
        console.log("shared card-post details-get-error");
      });
    }
  }, [post,mainState.user.id]);
  



  const classes = PostCardStyles();

  const navigate = useNavigate();
  const locState = useLocation();

  return (
    <>
    {
      post ? 
      <Card
        className={classes.CardWrapper + " " + classes.nestedCardWrapper}
        onClick={(e) => {
          e.stopPropagation();
          navigate(
            "/" + post?.ownerType.toLowerCase() + "/" + post?.ownerId + "/posts/" + post?.id,
            {
              state: {
                prevPath: locState.pathname,
                scrollY: window.pageYOffset,
              },
            }
          );
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"
            src={owner?.profileImgId && URL_FILES+"/"+owner?.profileImgId}
            >
              A
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" sx={{ display: "none" }}>
              <MoreVertIcon />
            </IconButton>
          }
          title={owner?.name+" "+(owner?.surname?owner?.surname:"")}
          subheader={
            new Date(post?.createdAt).toLocaleDateString() +
            " - " +
            new Date(post?.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          }
        />
        {post?.postType === "ACTIVITY" && (
          <EventArea
            userId={mainState.user.id}
            postId={post?.id}
            activityTitle={post?.activityTitle}
            activityStartAt={post?.activityStartAt}
            activityParticipatedByUser={post?.activityParticipatedByUser}
            activityCountParticipant={post?.activityCountParticipant}
            activityLocationDescription={post?.activityLocationDescription}
          />
        )}
        <div
          onClick={(e) => {
            e.stopPropagation();

            navigate(
              "/" +
              post?.ownerType.toLowerCase() +
                "/" +
                post?.ownerId +
                "/posts/" +
                post?.id +
                "/media/" +
                post?.imgId,
              {
                state: { ...locState, backgroundLocation: locState },
              }
            );
          }}
        >
          <CardMedia
            component="img"
            image={""}
            alt=""
            src={post?.imgId && URL_FILES + "/" + post?.imgId}
          />
        </div>

        <CardContent>
          {" "}
          <Typography variant="body2" color="black">
            {post?.description}
          </Typography>
        </CardContent>
      </Card>
      : 
      <Card
        className={classes.CardWrapper + " " + classes.nestedCardWrapper}
      >
        <CardHeader
          title={"..."}
        />
 
        <CardContent>
          {" This post is no longer accessible "}
          <Typography variant="body2" color="black">
        
          </Typography>
        </CardContent>
      </Card>
    }
      
    </>
  );
}
