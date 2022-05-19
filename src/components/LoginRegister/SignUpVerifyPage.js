import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link as UILink } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "./Copyright";
import { makeStyles } from "@mui/styles";
import bgImage from "./uni2.jpg";
//theme için makeStyles,classess yapılarını kullanıyoruz
// globalden body'i style verdiğimiz için classess şimdilik kullanılmadı
const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundImage: `url(${bgImage})`,
      height: "100%",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      [theme.breakpoints.down("sm")]: {
        background: "transparent",
      },
    },
  },
  underlinedWhite: {
    color: "white !important",
    textDecoration: "underline !important",
    [theme.breakpoints.down("sm")]: {
      color: "blue !important",
    },
  },
}));

const SignInPage = () => {
  //theme için
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            type="email"
          />

          <Button
            component={Link}
            to="/SignUp"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Verify
          </Button>
          <Grid container>
            <Grid item>
              <UILink
                component={Link}
                to="/SignIn"
                variant="body2"
                className={classes.underlinedWhite}
              >
                {"Already an account? Sign In"}
              </UILink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};
export default SignInPage;
