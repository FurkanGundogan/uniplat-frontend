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
import LikesModal from "./LikesModal/LikesModal";
import { useNavigate, useLocation } from "react-router-dom";
//import { LikePost } from "./HomePostActions";
import CardMedia from "@mui/material/CardMedia";
import NestedPostCard from "./NestedPostCard";
//import Comment from "../PostDetails/Comment";
import { TYPE_CLUB, TYPE_UNI, TYPE_USER, URL_CLUBS, URL_FILES, URL_UNIVERSITIES, URL_USERS } from "../../Contexts/Paths";
import axios from "axios";
import { useState,useEffect,useContext } from "react";
import { useAuthState } from "../../Contexts";
import { likeToggle } from "./PostCardActions";
import EventArea from "./EventArea";
import { NewPostModalContext } from "../../Contexts/NewPostModalContext";
import CommentsArea from "./CommentsArea/CommentsArea";
export default function PostCard(props) {
  const { setNewPostState } = useContext(NewPostModalContext);
  const mainState = useAuthState(); //read user details from context
  
  const {
    id,
    imgId,
    createdAt,
    description,
    ownerId,
    ownerType,
    countLike,
    likedByUser,
    activityTitle,
    activityStartAt,
    activityParticipatedByUser,
    activityCountParticipant,
    activityLocationDescription,
    postType,
    sharedPostId,
    countComment,
    // lastModifiedAt
  } = props.post;


 
  const [isLiked,setIsLiked]=useState(likedByUser)
  const [likeCount,setLikeCount]=useState(countLike)
  const [commentCount,setCommentCount]=useState(countComment)
  const handleLike=()=>{
      likeToggle(mainState.user.id,id,isLiked,setIsLiked,likeCount,setLikeCount)
  }
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

 

  const handleShare = () => {
    console.log("girdi")
    setNewPostState({ type: "Post", 
    isOpen: true,
    ownerId:mainState.user.id,
    ownerType:"USER",
    sharedPostId:sharedPostId?sharedPostId:id
  })
}
 
  return (
    <>
      <LikesModal showLikes={showLikes} setShowLikes={setShowLikes} postId={id} />
      <Card
      
        className={classes.CardWrapper}
        onClick={(e) =>{
          
          navigate("/" +ownerType.toLowerCase()+"/"+ ownerId + "/posts/" + id, {
            state: { prevPath: locState.pathname, scrollY: window.pageYOffset },
          })
          
        } 
          }
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              src={owner?.profileImgId && URL_FILES+"/"+owner?.profileImgId}
              onClick={(e) => {
                e.stopPropagation();
                let target=""
                if(ownerType===TYPE_USER) target=""
                if(ownerType===TYPE_UNI) target="uni/"
                if(ownerType===TYPE_CLUB) target="clubs/"
                navigate("/" +target+ ownerId);
              }}
            >
              
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
        {
        postType === "ACTIVITY" && <EventArea
        userId={mainState.user.id}
        postId={id}
        activityTitle={activityTitle}
        activityStartAt={activityStartAt} 
        activityParticipatedByUser={activityParticipatedByUser}
        activityCountParticipant={activityCountParticipant}
        activityLocationDescription={activityLocationDescription}
        />

        }

        <div
          onClick={(e) => {
            e.stopPropagation();
            navigate("/" +ownerType.toLowerCase()+"/"+ ownerId + "/posts/" + id+"/media/"+imgId, {
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
        {
        sharedPostId!==null && (
          <div className={classes.innerPostCardWrapper}>
            <NestedPostCard
              postId={sharedPostId}
            />
          </div>
        )
        }
        <div className={classes.LCSInfoWrapper}>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowLikes(true);
            }}
            className={classes.LikeInfo}
          >
            <span className={classes.LCSInfoText}>{likeCount} Likes</span>
          </div>
          <div className={classes.CommentInfo}>
            <span className={classes.LCSInfoText}>{commentCount} Comments</span>
          </div>
          <div className={classes.ShareInfo}>
            <span className={classes.LCSInfoText}></span>
          </div>
        </div>
        <Divider />
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            className={classes.LikebuttonWrapper}
            onClick={(e) => {
              e.stopPropagation();
              handleLike()
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
          <IconButton aria-label="share" className={classes.SharebuttonWrapper}
          onClick={(e)=>{

            e.stopPropagation();
            handleShare()
          }}>
            <DoubleArrowIcon/>
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <div className={classes.commentsAreaWrapper}>
            {
              <CommentsArea postId={id} setCommentCount={setCommentCount}/>
            }
              <Divider/>
          </div>
        </Collapse>
      </Card>
    </>
  );
}
