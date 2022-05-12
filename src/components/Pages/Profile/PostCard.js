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
import PostCardStyles from "../HomePosts/PostCardStyles";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import CommentIcon from "@mui/icons-material/Comment";
import Divider from "@mui/material/Divider";
import EventArea from "../HomePosts/EventArea";
import Collapse from "@mui/material/Collapse";
import LikesModal from "../HomePosts/LikesModal/LikesModal";
import { useNavigate, useLocation } from "react-router-dom";
//import { LikePost } from "./HomePostActions";
import CardMedia from "@mui/material/CardMedia";
import NestedPostCard from "../HomePosts/NestedPostCard";
//import Comment from "../PostDetails/Comment";
import { URL_FILES } from "../../Contexts/Paths";
import { likeToggle } from "../HomePosts/PostCardActions";
import { useAuthState } from "../../Contexts";
import { useState,useContext } from "react";
import { NewPostModalContext } from "../../Contexts/NewPostModalContext";
import CommentsArea from "../HomePosts/CommentsArea/CommentsArea";
export default function PostCard(props) {
  const {  setNewPostState } = useContext(NewPostModalContext);
  const mainState = useAuthState(); //read user details from context
 // profil ve club postcardları owner olarak sayfa sahibini dogrudan alır
 // anasayfadakiler ise her post için kart için sahip bilgilerini çeker
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
    postType,
    // postType,
     sharedPostId,
    // lastModifiedAt
  } = props.post;


  
  const [isLiked,setIsLiked]=useState(likedByUser)
  const [likeCount,setLikeCount]=useState(countLike)
  const handleLike=()=>{
    likeToggle(mainState.user.id,id,isLiked,setIsLiked,likeCount,setLikeCount)
}
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
 // kart img ekle, warningi düzelt

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
              src={props?.owner?.profileImgId && URL_FILES+"/"+props?.owner?.profileImgId}
              onClick={(e) => {
                e.stopPropagation();
               
     
              }}
            >
              asd
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" sx={{ display: "none" }}>
              <MoreVertIcon />
            </IconButton>
          }
          title={props?.owner?.name+" "+(props?.owner?.surname?props?.owner?.surname:"")}
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
       
        />

        }

        <div
          onClick={(e) => {
            e.stopPropagation();
            //setFullSize({ isOpen: true, img: img });
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
          onClick={
            (e)=>{
              e.stopPropagation();
              handleShare()
            }
          }
          >
            <DoubleArrowIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <div className={classes.commentsAreaWrapper}>
            {
              <CommentsArea postId={id}/>
            }
              <Divider/>
          </div>
        </Collapse>
      </Card>
    </>
  );
}
