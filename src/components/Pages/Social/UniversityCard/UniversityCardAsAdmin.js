import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { URL_FILES } from "../../../Contexts/Paths";
export default function UniversityCardAsAdmin({uni}) {
  const navigate = useNavigate();


  return (
    <Card
      sx={{ maxWidth: 345, cursor:"pointer",background:"#ffe27fa6" }}
      onClick={() => {
        navigate("/uni/"+uni.id);
      }}
    >
      <CardHeader
        avatar={
          <Avatar 
          src={uni && URL_FILES+"/"+uni?.profileImgId}
          sx={{ bgcolor: red[500] }} aria-label="recipe">
            U
          </Avatar>
        }
  
        title={uni?.name?uni?.name:"Title"}
        
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
  
         {uni && uni?.countFollower} Members
        </Typography>

      </CardContent>
    </Card>
  );
}
