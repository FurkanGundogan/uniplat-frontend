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
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import CommentIcon from "@mui/icons-material/Comment";
import Divider from "@mui/material/Divider";
// import EventArea from "../HomePosts/EventArea";
import Collapse from "@mui/material/Collapse";
import LikesModal from "../HomePosts/LikesModal/LikesModal";
import PostCardStyles from "../HomePosts/PostCardStyles";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useLocation } from "react-router-dom";
// import Comment from "./Comment";
import CardMedia from "@mui/material/CardMedia";
// import NestedPostCard from "../HomePosts/NestedPostCard";
import {
  TYPE_CLUB,
  TYPE_UNI,
  TYPE_USER,
  URL_CLUBS,
  URL_FILES,
  URL_UNIVERSITIES,
  URL_USERS,
} from "../../Contexts/Paths";
import { useState, useEffect,useContext } from "react";
import axios from "axios";
import { useAuthState } from "../../Contexts";
import { likeToggle } from "../HomePosts/PostCardActions";
import EventArea from "../HomePosts/EventArea";
import { NewPostModalContext } from "../../Contexts/NewPostModalContext";
import NestedPostCard from "../HomePosts/NestedPostCard"
import CommentsArea from "./CommentsArea/CommentsArea"
import { PostsContext } from "../HomePosts/PostsContext";


export default function DetailPostCard(props) {
  const {  setNewPostState } = useContext(NewPostModalContext);
  const {pageNumber,setPageNumber}=useContext(PostsContext)



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
    // lastModifiedAt,
  } = props.post;
 
  const [isLiked, setIsLiked] = useState(likedByUser);
  const [likeCount, setLikeCount] = useState(countLike);
  const [commentCount, setCommentCount] = useState(countComment);
  const handleLike = () => {
    likeToggle(
      mainState.user.id,
      id,
      isLiked,
      setIsLiked,
      likeCount,
      setLikeCount
    );
  };


  let shareCount = 0;
  const [owner, setOwner] = useState();
  useEffect(() => {
    let target = "";
    if (ownerType === TYPE_USER) target = URL_USERS;
    if (ownerType === TYPE_CLUB) target = URL_CLUBS;
    if (ownerType === TYPE_UNI) target = URL_UNIVERSITIES;

    axios
      .get(target + "/" + ownerId, { headers: { userId: mainState.user.id } })
      .then((response) => {
        setOwner(response.data);
      })
      .catch((e) => {
        console.log("card-postowner-info-get-error");
      });
  }, [ownerId, ownerType, mainState.user.id]);

  const classes = PostCardStyles();

  const [showLikes, setShowLikes] = React.useState(false);
  const navigate = useNavigate();
  const locstate = useLocation();
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
      <LikesModal
        showLikes={showLikes}
        setShowLikes={setShowLikes}
        postId={id}
      />

      <Card className={classes.CardWrapper}>
        <div className={classes.CardSectionTitleWrapper}>
          <KeyboardBackspaceIcon
            className={classes.CardSectionBackButton}
            onClick={(e) => {
              // geri gitmeden önce eski scroll pozisyonu atanıyor
              // ScrollToTop'da düzenleniyor

              if (
                locstate.state !== null &&
                locstate.state?.prevPath !== undefined &&
                locstate.state?.prevPath !== null
              ) {
                console.log({ prevScrollY: locstate.state.scrollY })
                setPageNumber(pageNumber+1)
                
               
                 navigate(locstate.state.prevPath, {
                  state: { prevScrollY: locstate.state.scrollY },
                });
                // path yerine -1 girince detaydan profile dönüşteki scroll sorunu düzeldi
  
              } else {
                console.log("direk home")
                navigate("/Home");
              }
            }}
          />
          <span className={classes.CardSectionTitleText}>Post</span>
        </div>
        <Divider />
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              src={owner?.profileImgId && URL_FILES + "/" + owner?.profileImgId}
              onClick={(e) => {
                e.stopPropagation();
                let target = "";
                if (ownerType === TYPE_USER) target = "";
                if (ownerType === TYPE_UNI) target = "uni/";
                if (ownerType === TYPE_CLUB) target = "clubs/";
                navigate("/" + target + ownerId);
              }}
            >
              {owner?.name[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" sx={{ display: "none" }}>
              <MoreVertIcon />
            </IconButton>
          }
          title={owner?.name + " " + (owner?.surname ? owner?.surname : "")}
          subheader={
            new Date(createdAt).toLocaleDateString() +
            " - " +
            new Date(createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          }
        />
        {postType === "ACTIVITY" && (
          <EventArea
            userId={mainState.user.id}
            postId={id}
            activityTitle={activityTitle}
            activityStartAt={activityStartAt}
            activityParticipatedByUser={activityParticipatedByUser}
            activityCountParticipant={activityCountParticipant}
            activityLocationDescription={activityLocationDescription}
          />
        )}
        <div
          onClick={(e) => {
            e.stopPropagation();
            //setFullSize({ isOpen: true, img: img });
            navigate(
              "/" +
                ownerType.toLowerCase() +
                "/" +
                ownerId +
                "/posts/" +
                id +
                "/media/" +
                imgId,
              {
                state: {
                  ...locstate,
                  prevPath: locstate.state?.prevPath,
                  backgroundLocation: locstate,
                },
              }
            );
          }}
        >
          <CardMedia
            component="img"
            image={imgId && URL_FILES + "/" + imgId}
            alt=""
          />
        </div>
        <CardContent>
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
          <div onClick={() => setShowLikes(true)} className={classes.LikeInfo}>
            <span className={classes.LCSInfoText}>{likeCount} Likes</span>
          </div>
          <div className={classes.CommentInfo}>
            <span className={classes.LCSInfoText}>{commentCount} Comments</span>
          </div>
          <div className={classes.ShareInfo}>
            <span className={classes.LCSInfoText}>{shareCount} Shares</span>
          </div>
        </div>
        <Divider />
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            className={classes.LikebuttonWrapper}
            onClick={(e) => {
              e.stopPropagation();
              handleLike();
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
        <Collapse in={true} timeout="auto" unmountOnExit>
          <div className={classes.commentsAreaWrapper}>
            {
              <CommentsArea postId={id} setCommentCount={setCommentCount}/>
            }
            <Divider />
          </div>
        </Collapse>
      </Card>
    </>
  );
}
