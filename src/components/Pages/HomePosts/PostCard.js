import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostCardStyles from "./PostCardStyles";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import CommentIcon from "@mui/icons-material/Comment";
import Divider from "@mui/material/Divider";
//import EventArea from "./EventArea";
import Collapse from "@mui/material/Collapse";
import WriteCommentComponent from "./WriteCommentComponent";
import LikesModal from "./LikesModal";
import { useNavigate, useLocation } from "react-router-dom";
//import { LikePost } from "./HomePostActions";
import CardMedia from "@mui/material/CardMedia";
//import NestedPostCard from "./NestedPostCard";
//import Comment from "../PostDetails/Comment";
import Chip from "@mui/material/Chip";
import { TYPE_CLUB, TYPE_UNI, TYPE_USER, URL_CLUBS, URL_FILES, URL_UNIVERSITIES, URL_USERS } from "../../Contexts/Paths";
import axios from "axios";
import { useState,useEffect } from "react";
import { useAuthState } from "../../Contexts";
export default function PostCard(props) {
  const mainState = useAuthState(); //read user details from context
  const {
    id,
    imgId,
    createdAt,
    description,
    likeCounter,
    ownerId,
    ownerType,
    // postType,
    // sharedPostId,
    // lastModifiedAt
  } = props.post;

  const [owner,setOwner]=useState()
    useEffect(() =>{
    let target="";
    if(ownerType===TYPE_USER) target=URL_USERS
    if(ownerType===TYPE_CLUB) target=URL_CLUBS
    if(ownerType===TYPE_UNI) target=URL_UNIVERSITIES

    axios.get(target + "/" + ownerId,{ headers:{"userId":mainState.user.id} } )
    .then((response) => {
      setOwner(response.data);
    })
    .catch((e) => {
      console.log("card-postowner-info-get-error");
    });

  },[ownerId,ownerType,mainState.user.id])
 
  const isLiked=false

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = (e) => {
    // parent onClick calismasin diye alttaki fonksiyon kullanilir
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const classes = PostCardStyles();

  const [showLikes, setShowLikes] = React.useState(false);
  const navigate = useNavigate();
  const locState = useLocation();
 
  return (
    <>
      <LikesModal showLikes={showLikes} setShowLikes={setShowLikes} />
      <Card
        className={classes.CardWrapper}
        onClick={() =>
          navigate("/" +ownerType.toLowerCase()+"/"+ ownerId + "/posts/" + id, {
            state: { prevPath: locState.pathname, scrollY: window.pageYOffset },
          })
        }
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
             
              onClick={(e) => {
                e.stopPropagation();
                let target=""
                if(ownerType===TYPE_USER) target=""
                if(ownerType===TYPE_UNI) target="uni/"
                if(ownerType===TYPE_CLUB) target="clubs/"
                navigate("/" +target+ ownerId);
              }}
            >
              F
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" sx={{ display: "none" }}>
              <MoreVertIcon />
            </IconButton>
          }
          title={owner?.name+" "+(owner?.surname?owner?.surname:"")}
          subheader={
            new Date(createdAt).toLocaleDateString() +
            " - " +
            new Date(createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          }
        />
        {/*
        type === "Event" && <EventArea eventDetails={eventDetails} />
        */
        }

        <div
          onClick={(e) => {
            e.stopPropagation();
            //setFullSize({ isOpen: true, img: img });
            navigate("/" +ownerId + "/posts/" + id + "/media", {
              state: { ...locState, backgroundLocation: locState },
            });
          }}
        >
          <CardMedia component="img" image={""} alt=""  src={imgId && URL_FILES+"/"+imgId} />
        </div>

        <CardContent
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {" "}
          <Typography variant="body2" color="black">
            {description}
          </Typography>
        </CardContent>
        {/*
        sharedPostId!==null && (
          <div className={classes.innerPostCardWrapper}>
            <NestedPostCard
              postsState={postsState}
              setpostsState={setpostsState}
              post={props.post.innerPost}
            />
          </div>
        )*/
        }
        <div className={classes.LCSInfoWrapper}>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowLikes(true);
            }}
            className={classes.LikeInfo}
          >
            <span className={classes.LCSInfoText}>{likeCounter} Likes</span>
          </div>
          <div className={classes.CommentInfo}>
            <span className={classes.LCSInfoText}>{0} Comments</span>
          </div>
          <div className={classes.ShareInfo}>
            <span className={classes.LCSInfoText}>{0} Shares</span>
          </div>
        </div>
        <Divider />
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            className={classes.LikebuttonWrapper}
            onClick={(e) => {
              e.stopPropagation();
              /*
              LikePost(postsState, setpostsState, id);
              */
            }}
          >
            <ThumbUpAltIcon
              sx={{
                ":hover": { color: "#2195a3" },
                color: isLiked ? "#2195a3" : "#65676b",
              }}
            />
          </IconButton>
          <IconButton
            onClick={handleExpandClick}
            aria-label="add to favorites"
            className={classes.CommentbuttonWrapper}
          >
            <CommentIcon />
          </IconButton>
          <IconButton aria-label="share" className={classes.SharebuttonWrapper}>
            <DoubleArrowIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <WriteCommentComponent />
          <div className={classes.commentsAreaWrapper}>
          <Divider sx={{marginBottom:"8px !important"}}>
            <Chip label="Top Comments" />
          </Divider>
            {/*
            comments.length > 0 &&
              comments.map((comment, i) => (
                <Comment key={i} comment={comment} />
              ))
              */}
              <Divider/>
          </div>
        </Collapse>
      </Card>
    </>
  );
}
