import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { getClubInfos,getClubUsersInfo } from "./GroupCardActions";
import { URL_FILES } from "../../../Contexts/Paths";
import {useAuthState } from "../../../Contexts";
import { Chip } from "@mui/material";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
export default function RecipeReviewCard({clubId,clubsAsAdmin}) {
  const navigate = useNavigate();
  const mainState = useAuthState(); //read user details from context

  const [clubInfo,setClubInfo]=useState()
  const [clubUniInfo,setClubUniInfo]=useState()
  const [clubUsersInfo,setClubUsersInfo]=useState()


  useEffect(() => {
    if (clubId !== undefined) {
      getClubInfos(clubId,setClubInfo,setClubUniInfo,mainState.user.id);
    }
  }, [clubId,mainState.user.id]);

  useEffect(() => {
    if (clubId !== undefined) {
      getClubUsersInfo(clubId,setClubUsersInfo);
    }
  }, [clubId]);



  return (
    <Card
      sx={{ maxWidth: 345, cursor:"pointer",background:"#ffe27fa6" }}
      onClick={() => {
        navigate("/clubs/"+clubId);
      }}
    >
      <CardHeader
        avatar={
          <Avatar 
          src={clubInfo?.profileImgId && URL_FILES+"/"+clubInfo.profileImgId }
          sx={{ bgcolor: red[500] }} aria-label="recipe">
            C
          </Avatar>
        }
        action={clubInfo &&
          clubsAsAdmin &&
          clubsAsAdmin?.filter((e) => e.id === clubInfo?.id).length > 0 ?(
              <div className="div" style={{ color: "black" }}>
              <Chip
              label="Admin"
                variant="outlined"
                color="warning"
                icon={<StarOutlineIcon />}
              />
            </div>
          ):  <div className="div" style={{ color: "black" }}>
          <Chip
          label="Member"
            variant="outlined"
            color="primary"
            icon={<PersonOutlineIcon />}
          />
        </div>}
        title={clubInfo?clubInfo.name:"Title"}
        subheader={clubUniInfo?clubUniInfo.name:"University"}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
  
         {clubUsersInfo && clubUsersInfo.length} Members
        </Typography>

      </CardContent>
    </Card>
  );
}
