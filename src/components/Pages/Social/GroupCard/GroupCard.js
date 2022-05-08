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
export default function RecipeReviewCard({clubId}) {
  const navigate = useNavigate();
  const mainState = useAuthState(); //read user details from context

  const [clubInfo,setClubInfo]=useState()
  const [clubUniInfo,setClubUniInfo]=useState()
  const [clubUsersInfo,setClubUsersInfo]=useState()
console.log("ci:",clubUsersInfo)
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
          src={clubInfo && URL_FILES+"/"+clubInfo.profileImgId }
          sx={{ bgcolor: red[500] }} aria-label="recipe">
            C
          </Avatar>
        }
  
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
