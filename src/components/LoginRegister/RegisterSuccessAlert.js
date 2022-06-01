import * as React from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function RegisterSuccessAlert(props) {
  return (
    <Alert
      severity={props.type}
      sx={{ width: "100%", marginTop: "12px", fontSize: "16px" }}
      action={
        <Button
          size="medium"
          sx={{
            textAlign:"center",
            backgroundColor: "green",
            color: "white",
            display: props.type === "success" ? "inherit" : "none",
          }}
          component={Link}
          to="/SignIn"
        >
          LOGIN
        </Button>
      }
    >
      {props.alertMsg}
    </Alert>
  );
}
