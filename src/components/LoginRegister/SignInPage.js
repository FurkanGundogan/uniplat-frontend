import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FormHelperText, Link as UILink } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "./Copyright";
import { makeStyles } from "@mui/styles";
import { Form } from "./SignUpUseForm";
import InputStyles from "./InputStyles";
import bgImage from "./uni2.jpg";
import { useNavigate } from "react-router-dom";
import { loginUser, useAuthDispatch } from "../Contexts";
//theme için makeStyles,classess yapılarını kullanıyoruz
// globalden body'i style verdiğimiz için classess şimdilik kullanılmadı
const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundImage: `url(${bgImage})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      height: "100%",
      [theme.breakpoints.down("sm")]: {
        background: "transparent",
      },
    },
  },
  underlinedWhite: {
    color: "blue !important",
    textDecoration: "underline !important",
    [theme.breakpoints.down("sm")]: {
      color: "blue !important",
    },
  },
}));

const SignInPage = (props) => {
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const validate = () => {
    console.log("Remember me:", checked);
    let control = true;
    if (
      (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu.tr$/.test(email) === false) |
      (password.length < 6)
    ) {
      setInputError("Please enter suitable email and password");
      control = false;
    } else {
      control = true;
    }
    return control;
  };

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [inputError, setInputError] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  //theme için
  const classes = useStyles();
  const inputClasses = InputStyles();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      let payload = { email, password };
      try {
        let response = await loginUser(dispatch, payload);

        if (response === undefined) {
          console.log("Response Undefined:", response);
        } else {
          if (!response.data) {
            console.log("User Info Error:", response);
            setInputError(response.response.data.message);
          } else {
            console.log("Login Success:", response);
            setInputError("");
            navigate("/Home");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
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
          Sign in
        </Typography>
        <Box component={Form} onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            autoComplete="email"
            className={inputClasses.root}
          />
          <TextField
            fullWidth
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label="Password"
            type="password"
            id="password"
            className={inputClasses.root}
            sx={{ marginTop: "18px" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                onChange={(e) => {
                  setChecked(e.target.checked);
                }}
              />
            }
            label="Remember me"
          />
          <FormHelperText error>
            {inputError === "" ? "" : inputError}
          </FormHelperText>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <UILink
                component={Link}
                to="#"
                variant="body2"
                className={classes.underlinedWhite}
              >
                Forgot password?
              </UILink>
            </Grid>
            <Grid item>
              <UILink
                component={Link}
                to="/SignUp"
                variant="body2"
                className={classes.underlinedWhite}
              >
                {"Don't have an account? Sign Up"}
              </UILink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright cpymrg={8} />
    </Container>
  );
};
export default SignInPage;
