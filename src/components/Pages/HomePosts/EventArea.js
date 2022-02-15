import React from "react";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import EventAreaStyles from "./EventAreaStyles";
import GroupIcon from '@mui/icons-material/Group';
function EventArea({ eventDetails }) {
    const classes=EventAreaStyles();
  const { eventDate, participantCount, eventAddress } = eventDetails;
  return (
    <div className={classes.eventAreaWrapper}>
      <div className={classes.eventIconWrapper}>
        <EventIcon />
      </div>

      <div className={classes.eventDateText}>
        {new Date(eventDate).toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "2-digit",
        })}
      </div>
      <div className={classes.eventTimeText}>
        {new Date(eventDate).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
      
      <div className={classes.LocationWrapper}>
        <LocationOnIcon className={classes.locationIcon}/>
        <span className={classes.eventLocationText}>{eventAddress}</span>
      </div>
      
      <div>
        <div className={classes.participantWrapper}>
        <GroupIcon className={classes.participantIcon}/>
        <div className={classes.eventparticipantCountText}>{participantCount} Participans</div>
        </div>
        <div className={classes.eventJoinButtonWrapper}>
        <Button variant="outlined" startIcon={<LocalActivityIcon />} className={classes.eventJoinButton}>
          Join
        </Button>
        </div>
      </div>
    </div>
  );
}

export default EventArea;
