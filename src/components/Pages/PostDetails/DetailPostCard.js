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
import EventArea from "../HomePosts/EventArea";
import Collapse from "@mui/material/Collapse";
import WriteCommentComponent from "../HomePosts/WriteCommentComponent";
import LikesModal from "../HomePosts/LikesModal";
import PostCardStyles from "../HomePosts/PostCardStyles";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate, useLocation } from "react-router-dom";
import Comment from "./Comment";
import Chip from "@mui/material/Chip";
import { LikePost } from "../HomePosts/HomePostActions";
import CardMedia from "@mui/material/CardMedia";
import NestedPostCard from "../HomePosts/NestedPostCard"
export default function DetailPostCard(props) {
  const {
    id,
    owner,
    createdAt,
    img,
    text,
    type,
    likeCount,
    commentCount,
    shareCount,
    eventDetails,
    comments,
    isLiked
  } = props.post;
 const {postsState,setpostsState}=props
  const classes = PostCardStyles();

  const [showLikes, setShowLikes] = React.useState(false);
  const navigate = useNavigate();
  const locstate = useLocation();
 
  return (
    <>
      <LikesModal showLikes={showLikes} setShowLikes={setShowLikes} />

      <Card className={classes.CardWrapper}>
        <div className={classes.CardSectionTitleWrapper}>
          <KeyboardBackspaceIcon
          className={classes.CardSectionBackButton}
            onClick={(e) => {
              // geri gitmeden önce eski scroll pozisyonu atanıyor
              // ScrollToTop'da düzenleniyor
              
              if (locstate.state != null) {
                
                
               /* navigate(locstate.state.prevPath, {
                  state: { prevScrollY: locstate.state.scrollY },
                });*/
                // path yerine -1 girince detaydan profile dönüşteki scroll sorunu düzeldi
                navigate(-1, {
                  state: { prevScrollY: locstate.state.scrollY },
                });
              } else {
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
            onClick={
              (e)=>{
                e.stopPropagation()
                navigate("/"+owner)
              }
            }
            >
              {owner[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" sx={{ display: "none" }}>
              <MoreVertIcon />
            </IconButton>
          }
          title={owner}
          subheader={
            new Date(createdAt).toLocaleDateString() +
            " - " +
            new Date(createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          }
        />
        {type === "Event" && <EventArea eventDetails={eventDetails} />}
        <div
          onClick={(e) => {
          e.stopPropagation();
          //setFullSize({ isOpen: true, img: img });
          navigate("/" + owner + "/posts/" + id+"/media", {
            state: { ...locstate,backgroundLocation:locstate },
          })
        }}
        >
        <CardMedia
          component="img"
          image={img}
          alt=""
        />
        </div>
        <CardContent>
          <Typography variant="body2" color="black">
            {text}
          </Typography>
        </CardContent>
        {props.post.innerPost && (
          <div className={classes.innerPostCardWrapper}>
            <NestedPostCard
              postsState={postsState}
              setpostsState={setpostsState}
              post={props.post.innerPost}
            />
          </div>
        )}
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
              
              LikePost(postsState,setpostsState,id)
              
            }}
          >
            <ThumbUpAltIcon sx={{":hover":{color:"#2195a3"},color:(isLiked?"#2195a3":"#65676b")}} />
          </IconButton>
          <IconButton
            aria-label="add to favorites"
            className={classes.CommentbuttonWrapper}
          >
            <CommentIcon />
          </IconButton>
          <IconButton aria-label="share" className={classes.SharebuttonWrapper}>
            <DoubleArrowIcon />
          </IconButton>
        </CardActions>
        <Collapse in={true} timeout="auto" unmountOnExit>
          <WriteCommentComponent />
          
          <div className={classes.commentsAreaWrapper}>
          <Divider>
            <Chip label="Comments" />
          </Divider>
            {comments.length > 0 &&
              comments.map((comment, i) => (
                <Comment key={i} comment={comment} />
              ))}
              <Divider/>
          </div>
          
            
          
        </Collapse>
      </Card>
    </>
  );
}
