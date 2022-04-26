import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { getClubInfos } from "./GroupCardActions";
export default function RecipeReviewCard({clubId}) {
  const navigate = useNavigate();


  const [clubInfo,setClubInfo]=useState()
  const [clubUniInfo,setClubUniInfo]=useState()

  useEffect(() => {
    if (clubId !== undefined) {
      getClubInfos(clubId,setClubInfo,setClubUniInfo);
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
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
  
        title={clubInfo?clubInfo.name:"Title"}
        subheader={clubUniInfo?clubUniInfo.name:"University"}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          18 Members
        </Typography>
        <Typography variant="body2" color="text.secondary">
          200 Followers
        </Typography>
      </CardContent>
    </Card>
  );
}
