import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MyAnimatedNumber from "./MyAnimatedNumber";
import { useAuthState } from "../../Contexts";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import GroupsIcon from "@mui/icons-material/Groups";
import ArticleIcon from "@mui/icons-material/Article";
import {
  URL_CLUBS,
  URL_POSTS,
  URL_UNIVERSITIES,
  URL_USERS,
} from "../../Contexts/Paths";
import axios from "axios";
import AboutStyles from "./AboutStyles";
import uniplatlogo from "../../../../src/components/uniplatlogo.png";
import fsmlogo from "../../../../src/components/fsmlogo.png";
import fgundogan from "../../../../src/components/fgundogan.jpg";
import yoruc from "../../../../src/components/yoruc.jpg";
import bkiraz from "../../../../src/components/bkiraz.jpg";
import akaci from "../../../../src/components/akaci.jpg";
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000/">
        Uniplat
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


const theme = createTheme();

export default function About() {
  const classes = AboutStyles();

  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [uniCount, setUniCount] = useState(0);
  const [clubCount, setClubCount] = useState(0);
  const mainState = useAuthState(); //read user details from context
  useEffect(() => {
    axios({
      method: "GET",
      headers: { userId: mainState.user.id },
      url: URL_USERS,
    })
      .then((response) => {
        // console.log("resp data", response.data);
        setUserCount(response.data.page.totalElements);
      })
      .catch((error) => {
        console.log("get total user count error", error);
      });
      // eslint-disable-next-line
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      headers: { userId: mainState.user.id },
      url: URL_POSTS,
    })
      .then((response) => {
        // console.log("resp data", response.data);
        setPostCount(response.data.page.totalElements);
      })
      .catch((error) => {
        console.log("get total post count error", error);
      });
      // eslint-disable-next-line
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      headers: { userId: mainState.user.id },
      url: URL_UNIVERSITIES,
    })
      .then((response) => {
        // console.log("resp data", response.data);
        setUniCount(response.data.page.totalElements);
      })
      .catch((error) => {
        console.log("get total uni count error", error);
      });
      // eslint-disable-next-line
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      headers: { userId: mainState.user.id },
      url: URL_CLUBS,
    })
      .then((response) => {
         // console.log("resp data", response.data);
        setClubCount(response.data.page.totalElements);
      })
      .catch((error) => {
        console.log("get total club count error", error);
      });
      // eslint-disable-next-line
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <main style={{ boxSizing: "initial" }}>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 1,
          }}
        >
          <Container maxWidth="sm" sx={{ marginTop: "36px !important" }}>
            <div className={classes.imageWrapper}>
              <img src={uniplatlogo} alt="" className={classes.image} />
            </div>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            ></Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              This is a new platform that will increase interaction between
              universities. Let's start surfing the UniPlat.
            </Typography>
            <Stack
              sx={{ pt: 1 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            ></Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8, paddingTop: "0px !important" }} maxWidth="md">
          {
            <div className={classes.AnimatedNumbersArea}>
              <MyAnimatedNumber
                title={"Users"}
                count={userCount}
                severity="info"
                icon={<PersonIcon fontSize="inherit" />}
              />
              <MyAnimatedNumber
                title={"Universities"}
                severity="error"
                count={uniCount}
                icon={<AccountBalanceIcon fontSize="inherit" />}
              />
              <MyAnimatedNumber
                title={"Clubs"}
                count={clubCount}
                severity="success"
                icon={<GroupsIcon fontSize="inherit" />}
              />
              <MyAnimatedNumber
                title={"Posts"}
                count={postCount}
                severity="warning"
                icon={<ArticleIcon fontSize="inherit" />}
              />
            </div>
          }
          {/* End hero unit */}
          {
            <Typography
              variant="h4"
              align="center"
              color="text.secondary"
              paragraph
              sx={{marginTop:"42px !important"}}
            >
             TEAM
            </Typography>
          }
          {
                <Grid container spacing={4} sx={{marginBottom:"12px !important"}}>
                <Grid item key={0} xs={12} sm={6} md={4}>
                  
                </Grid>
                <Grid item key={1} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={
                        {
                          // 16:9
                        }
                      }
                      image={bkiraz}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Berna KİRAZ
                      </Typography>
                      <Typography>Advisor</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item key={2} xs={12} sm={6} md={4}>
                 
                </Grid>
              </Grid>
          }
          <Grid container spacing={4}>
            <Grid item key={3} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  sx={
                    {
                      // 16:9
                    }
                  }
                  image={akaci}
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Abdussamet KACI
                  </Typography>
                  <Typography>Backend Developer</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item key={1} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  sx={
                    {
                      // 16:9
                      maxHeight:"250px !important"
                    }
                  }
                  image={fgundogan}
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Furkan GÜNDOĞAN
                  </Typography>
                  <Typography>Frontend Developer</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item key={2} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  sx={
                    {
                      // 16:9
                    }
                  }
                  image={yoruc}
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    YÜŞA ORUÇ
                  </Typography>
                  <Typography>Frontend Developer</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          {
            <Typography
              variant="h4"
              align="center"
              color="text.secondary"
              paragraph
              sx={{marginTop:"42px !important"}}
            >
              SPONSOR
            </Typography>
          }
          {   <Grid container spacing={4}>
            <Grid item key={3} xs={12} sm={6} md={2}>
            </Grid>
            <Grid item key={4} xs={12} sm={6} md={8}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  sx={
                    {
                      // 16:9
                    }
                  }
                  image={fsmlogo}
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    
                  </Typography>
                  
                </CardContent>
              </Card>
            </Grid>
            <Grid item key={5} xs={12} sm={6} md={2}>
            </Grid>
          </Grid>
          
          }
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
        
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          All Rights Reserved
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
