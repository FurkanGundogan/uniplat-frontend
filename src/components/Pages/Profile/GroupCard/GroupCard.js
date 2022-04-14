import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
export default function RecipeReviewCard({group}) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{marginBottom:"8px", cursor:"pointer"}}
      onClick={() => {
        navigate("/groups/"+group.id);
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
    
        title={group.name?group.name: "Club Name"}
        subheader={group.uni?group.uni: "University"}
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
