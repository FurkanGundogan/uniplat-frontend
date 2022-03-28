import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostCardStyles from "./PostCardStyles";
import EventArea from "./EventArea";
import LikesModal from "./LikesModal";
import { useNavigate, useLocation } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";

export default function PostCard(props) {
  const {
    id,
    owner,
    owner_name,
    createdAt,
    img,
    text,
    type,
    eventDetails,
  } = props.post;



  const classes = PostCardStyles();

  const [showLikes, setShowLikes] = React.useState(false);
  const navigate = useNavigate();
  const locState = useLocation();

  return (
    <>
      <LikesModal showLikes={showLikes} setShowLikes={setShowLikes} />
      <Card
        className={classes.CardWrapper +" "+classes.nestedCardWrapper}
        onClick={(e) =>
          {
              e.stopPropagation()
          navigate("/" + owner + "/posts/" + id, {
            state: { prevPath: locState.pathname, scrollY: window.pageYOffset },
          })}
        }
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/" + owner);
              }}
            >
              {owner[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" sx={{ display: "none" }}>
              <MoreVertIcon />
            </IconButton>
          }
          title={owner_name}
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
            navigate("/" + owner + "/posts/" + id + "/media", {
              state: { ...locState, backgroundLocation: locState },
            });
          }}
        >
          <CardMedia component="img" image={img} alt="" />
        </div>

        <CardContent
         
        >
          {" "}
          <Typography variant="body2" color="black">
            {text}
          </Typography>
        </CardContent>        
      </Card>
    </>
  );
}
