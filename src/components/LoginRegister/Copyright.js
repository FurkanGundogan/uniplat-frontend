import Typography from "@mui/material/Typography";
import { Link as UILink } from "@mui/material";
import { Link } from "react-router-dom";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      mt={props.cpymrg}
    >
      {"Copyright © "}
      <UILink component={Link} color="inherit" to="/">
        UniPlat Socail Media
      </UILink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
