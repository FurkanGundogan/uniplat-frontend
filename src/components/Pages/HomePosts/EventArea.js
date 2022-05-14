import React, { useState } from "react";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import EventAreaStyles from "./EventAreaStyles";
import GroupIcon from "@mui/icons-material/Group";
import { activityJoinToggle } from "./PostCardActions";
import EventParticipantsModel from "./EventParticipantsModel/EventParticipantsModel";
function EventArea({
  userId,
  postId,
  activityParticipatedByUser,
  activityCountParticipant,
  activityTitle,
  activityStartAt,
  activityLocationDescription,
}) {
  const classes = EventAreaStyles();
  const [done,setDone]=useState(new Date()>new Date(activityStartAt))


  const [isJoin, setIsJoin] = useState(activityParticipatedByUser);
  const [participantsCounts, setParticipantsCount] = useState(
    activityCountParticipant
  );

  const handleJoin = () => {

    if(new Date()>new Date(activityStartAt)){
      // tıklanıldığı sırada süresi sona erdiyse 
      // buton adı done olacak ve done true olarak set edilecek
      setDone(true)
    }else{
      activityJoinToggle(
        userId,
        postId,
        isJoin,
        setIsJoin,
        participantsCounts,
        setParticipantsCount,
      );
    }

   
  };
  const [showParticipants, setShowParticipants] = useState(false);
  return (
    <div className={classes.eventAreaWrapper}>
      <EventParticipantsModel
        showParticipants={showParticipants}
        setShowParticipants={setShowParticipants}
        postId={postId}
      />
      <div className={classes.eventTitleText}>{activityTitle} </div>
      <div className={classes.eventIconWrapper}>
        <EventIcon />
      </div>

      <div className={classes.eventDateText}>
        {new Date(activityStartAt).toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "2-digit",
        })}
      </div>
      <div className={classes.eventTimeText}>
        {new Date(activityStartAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>

      <div className={classes.LocationWrapper}>
        <LocationOnIcon className={classes.locationIcon} />
        <span className={classes.eventLocationText}>{activityLocationDescription}</span>
      </div>

      <div>
        <div 
         onClick={(e) => {
          e.stopPropagation();
          setShowParticipants(true);
        }}
        className={classes.participantWrapper}>
          <GroupIcon className={classes.participantIcon} />
          <div
            className={classes.eventparticipantCountText}>
            {participantsCounts} Participants
          </div>
        </div>
        <div className={classes.eventJoinButtonWrapper}>
          <Button
            variant="outlined"
            startIcon={<LocalActivityIcon />}
            className={classes.eventJoinButton}
            onClick={(e) => {
              e.stopPropagation();
              if(done===false){
              handleJoin();
              }
            }}
          >
            {done?"Done":(isJoin ? "Leave" : "Join")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EventArea;
