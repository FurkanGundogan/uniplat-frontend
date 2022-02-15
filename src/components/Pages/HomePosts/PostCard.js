import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
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
import EventArea from "./EventArea";
import Collapse from "@mui/material/Collapse";
import ExpandComment from "./ExpandComment";
import LikesModal from "./LikesModal"
export default function PostCard(props) {
  const {
    owner,
    createdAt,
    img,
    text,
    type,
    likeCount,
    commentCount,
    shareCount,
    eventDetails,
  } = props.post;
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const classes = PostCardStyles();

  const [showLikes,setShowLikes]=React.useState(false);

  return (
    <>
    <LikesModal showLikes={showLikes} setShowLikes={setShowLikes} />
    <Card className={classes.CardWrapper}>
      
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
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
      <CardMedia component="img" height="auto" image={img} />
      <CardContent>
        <Typography variant="body2" color="black">
          {text}
        </Typography>
      </CardContent>
      <div className={classes.LCSInfoWrapper}>
        <div onClick={()=>setShowLikes(true)} className={classes.LikeInfo}>
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
        >
          <ThumbUpAltIcon />
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
        <ExpandComment />
      </Collapse>
    </Card>
    </>
  );
}
