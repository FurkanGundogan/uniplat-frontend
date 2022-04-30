import {
    Avatar,
    ListItemAvatar,
    ListItemText,
    Typography,
  } from "@mui/material";
  import React, { useState, useEffect } from "react";
  import { blue } from "@mui/material/colors";
  import PersonIcon from "@mui/icons-material/Person";
  import { URL_UNIVERSITIES,URL_FILES } from "../../../Contexts/Paths";
  import axios from "axios";
  function FolowUniItem({ follow }) {
    const [uniDetails, setUniDetails] = useState();
    useEffect(() => {
      const setDetails = async () => {
        await axios
          .get(URL_UNIVERSITIES + "/" + follow?.universityId)
          .then((response) => {
            setUniDetails(response.data);
          })
          .catch((e) => {
            console.log("-uni-detail-get-error");
          });
      };
      if (follow !== undefined) {
        setDetails();
      }
    }, [follow]); //eslint-disable-line
  
    return (
      <>
        <ListItemAvatar>
          <Avatar
          src={uniDetails && URL_FILES+"/"+uniDetails?.profileImgId}
          sx={{ bgcolor: blue[100], color: blue[600] }}>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={uniDetails?.name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                sx={{ display: "inline" }}
                variant="body2"
                color={"gray"}
              >
                {uniDetails?.description}
              </Typography>
            </React.Fragment>
          }
        />
      </>
    );
  }
  
  export default FolowUniItem;
  