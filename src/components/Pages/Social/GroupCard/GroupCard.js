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
export default function RecipeReviewCard() {
  const navigate = useNavigate();

  return (
    <Card
      sx={{ maxWidth: 345 }}
      onClick={() => {
        navigate("/groups/1");
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Club Name"
        subheader="University"
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
