import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import List from "@mui/material/List";
import CloseIcon from "@mui/icons-material/Close";
import PostCardStyles from "../PostCardStyles";
import Divider from "@mui/material/Divider";
import { URL_ACTIVITY_PARTICIPANTS } from "../../../Contexts/Paths";
import axios from "axios";
import { useState,useEffect } from "react";
import ParticipantUser from "./ParticipantUser";
import { ListItem } from "@mui/material";
import { useAuthState } from "../../../Contexts";
import { useNavigate } from "react-router-dom";
export default function EventParticipantsModel({ showParticipants, setShowParticipants, postId }) {
  const mainState = useAuthState(); //read user details from context
  const classes = PostCardStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [participantUserList, setParticipantUserList] = useState();

  const navigate = useNavigate();
  useEffect(()=>{
    axios({
      method: "GET",
      url: URL_ACTIVITY_PARTICIPANTS,
      params: {
        postId: postId,
      },
    })
      .then((response) => {
        setParticipantUserList(response.data.content);
      })
      .catch((error) => {
        console.log("get participants user list error");
      });
  },[postId,showParticipants])

 

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        open={showParticipants}
        onClose={(e) =>{
          e.stopPropagation()
          setShowParticipants(false)
        }}
        aria-labelledby="responsive-dialog-title"
        scroll="paper"
      >
        <div className={classes.LikeModalCloseIconWrapper}>
          <CloseIcon
            onClick={(e) =>{
              e.stopPropagation()
             
              setShowParticipants(false)
            }}
            className={classes.LikeModalCloseIcon}
          />

          <DialogTitle
            className={classes.LikeModalTitle}
            id="responsive-dialog-title"
          >
            {"Participants"}
          </DialogTitle>
        </div>
        <Divider />
        <DialogContent>
          <List sx={{ pt: 0 }}>
            {participantUserList &&
              participantUserList.map((p, i) => (
                <ListItem button 
                onClick={(e) =>{
                  e.stopPropagation()
                  navigate("/"+ p.userId)
                }
                }
                key={i}>
                  <ParticipantUser participant={p} mainUserId={mainState.user.id}/>
                </ListItem>
              ))}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
}
