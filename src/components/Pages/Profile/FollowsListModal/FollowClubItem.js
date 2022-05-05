import {
    Avatar,
    ListItemAvatar,
    ListItemText,
    Typography,
  } from "@mui/material";
  import React, { useState, useEffect } from "react";
  import { blue } from "@mui/material/colors";
  import PersonIcon from "@mui/icons-material/Person";
  import { URL_CLUBS,URL_FILES,URL_UNIVERSITIES } from "../../../Contexts/Paths";
  import axios from "axios";
  function FollowClubItem({ follow }) {
    const [clubDetails, setClubDetails] = useState();
    const [clubUni, setClubUni] = useState();
    useEffect(() => {
      const setDetails = async () => {
        await axios
          .get(URL_CLUBS + "/" + follow?.followId)
          .then((response) => {
            setClubDetails(response.data);
          })
          .catch((e) => {
            console.log("-club-detail-get-error");
          });
      };
      if (follow !== undefined) {
        setDetails();
      }
    }, [follow]); //eslint-disable-line

    useEffect(() => {
        const setClubUniDetails = async () => {
          await axios
            .get(URL_UNIVERSITIES + "/" + clubDetails?.universityId)
            .then((response) => {
                setClubUni(response.data);
            })
            .catch((e) => {
              console.log("-club-uni-detail-get-error");
            });
        };
        if (clubDetails !== undefined) {
          setClubUniDetails();
        }
      }, [clubDetails]); //eslint-disable-line
  
    return (
      <>
        <ListItemAvatar>
          <Avatar
          src={clubDetails && URL_FILES+"/"+clubDetails?.profileImgId}
          sx={{ bgcolor: blue[100], color: blue[600] }}>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={clubDetails?.name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                sx={{ display: "inline" }}
                variant="body2"
                color={"gray"}
              >
                {clubUni?.name}
              </Typography>
            </React.Fragment>
          }
        />
      </>
    );
  }
  
  export default FollowClubItem;
  