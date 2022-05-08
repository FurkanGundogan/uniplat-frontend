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
//import EventArea from "./EventArea";
import Collapse from "@mui/material/Collapse";
import WriteCommentComponent from "../HomePosts/WriteCommentComponent";
import LikesModal from "../HomePosts/LikesModal";
import { useNavigate, useLocation } from "react-router-dom";
//import { LikePost } from "./HomePostActions";
import CardMedia from "@mui/material/CardMedia";
//import NestedPostCard from "./NestedPostCard";
//import Comment from "../PostDetails/Comment";
import Chip from "@mui/material/Chip";
import { URL_FILES } from "../../Contexts/Paths";
export default function PostCard(props) {
 // profil ve club postcardları owner olarak sayfa sahibini dogrudan alır
 // anasayfadakiler ise her post için kart için sahip bilgilerini çeker
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
 // kart img ekle, warningi düzelt
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
        {/*
        type === "Event" && <EventArea eventDetails={eventDetails} />
        */
        }

        <div
          onClick={(e) => {
            e.stopPropagation();
            //setFullSize({ isOpen: true, img: img });
            navigate("/" + ownerId + "/posts/" + id + "/media", {
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
