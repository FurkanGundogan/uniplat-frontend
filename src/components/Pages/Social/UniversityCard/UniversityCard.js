import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getUniversityInfo,
  getUniversityUsersInfo,
} from "./UniversityCardActions";
import { URL_FILES } from "../../../Contexts/Paths";
import { useAuthState } from "../../../Contexts";
import { Chip } from "@mui/material";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
export default function RecipeReviewCard({
  universityId,
  universitiesAsAdmin,
}) {
  const navigate = useNavigate();
  const mainState = useAuthState(); //read user details from context

  const [universityInfo, setUniversityInfo] = useState();

  const [universityUsersInfo, setUniversityUsersInfo] = useState();

  useEffect(() => {
    if (universityId !== undefined) {
      getUniversityInfo(universityId, setUniversityInfo, mainState.user.id);
    }
  }, [universityId, mainState.user.id]);

  useEffect(() => {
    if (universityId !== undefined) {
      getUniversityUsersInfo(universityId, setUniversityUsersInfo);
    }
  }, [universityId]);

  return (
    <Card
      sx={{ maxWidth: 345, cursor: "pointer", background: "#ffe27fa6" }}
      onClick={() => {
        navigate("/uni/" + universityId);
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={
              universityInfo && URL_FILES + "/" + universityInfo.profileImgId
            }
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
          >
            U
          </Avatar>
        }
        action={universityInfo &&
          universitiesAsAdmin &&
          universitiesAsAdmin?.filter((e) => e.id === universityInfo?.id)
            .length > 0 ?(
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
          label="Follower"
            variant="outlined"
            color="primary"
            icon={<PersonOutlineIcon />}
          />
        </div>}
        title={universityInfo ? universityInfo.name : "Title"}
      />
      <CardContent>
        
        <Typography variant="body2" color="text.secondary">
          
          {universityUsersInfo && universityUsersInfo.length} Followers
         
        </Typography>
  
      </CardContent>
    </Card>
  );
}
