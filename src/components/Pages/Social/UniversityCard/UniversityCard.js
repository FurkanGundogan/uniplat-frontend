import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { getUniversityInfo,getUniversityUsersInfo } from "./UniversityCardActions";
import { URL_FILES } from "../../../Contexts/Paths";
import {useAuthState } from "../../../Contexts";
export default function RecipeReviewCard({universityId}) {
  const navigate = useNavigate();
  const mainState = useAuthState(); //read user details from context
  console.log("uniid",universityId)
  const [universityInfo,setUniversityInfo]=useState()
  console.log("uni info:",universityInfo)
  const [universityUsersInfo,setUniversityUsersInfo]=useState()

  useEffect(() => {
    if (universityId !== undefined) {
      getUniversityInfo(universityId,setUniversityInfo,mainState.user.id);
    }
  }, [universityId,mainState.user.id]);

  useEffect(() => {
    if (universityId !== undefined) {
      getUniversityUsersInfo(universityId,setUniversityUsersInfo);
    }
  }, [universityId]);



  return (
    <Card
      sx={{ maxWidth: 345, cursor:"pointer",background:"#ffe27fa6" }}
      onClick={() => {
        navigate("/uni/"+universityId);
      }}
    >
      <CardHeader
        avatar={
          <Avatar 
          src={universityInfo && URL_FILES+"/"+universityInfo.profileImgId}
          sx={{ bgcolor: red[500] }} aria-label="recipe">
            U
          </Avatar>
        }
  
        title={universityInfo?universityInfo.name:"Title"}
        
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
  
         {universityUsersInfo && universityUsersInfo.length} Members
        </Typography>

      </CardContent>
    </Card>
  );
}
