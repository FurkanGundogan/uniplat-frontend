import * as React from 'react';
import { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MyAnimatedNumber from "./MyAnimatedNumber"
import { useAuthState } from "../../Contexts";
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GroupsIcon from '@mui/icons-material/Groups';
import ArticleIcon from '@mui/icons-material/Article';
import {
  URL_CLUBS,
  URL_POSTS,
  URL_UNIVERSITIES,
  URL_USERS,
} from "../../Contexts/Paths";
import axios from 'axios';
import AboutStyles from "./AboutStyles"
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
        Uniplat
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3];

const theme = createTheme();

export default function About() {

  const classes= AboutStyles()

  
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
      console.log("resp data", response.data);
      setUserCount(response.data.page.totalElements);
    })
    .catch((error) => {
      console.log("get total user count error", error);
    });
}, []);

useEffect(() => {
  axios({
    method: "GET",
    headers: { userId: mainState.user.id },
    url: URL_POSTS,
  })
    .then((response) => {
      console.log("resp data", response.data);
      setPostCount(response.data.page.totalElements);
    })
    .catch((error) => {
      console.log("get total post count error", error);
    });
}, []);

useEffect(() => {
  axios({
    method: "GET",
    headers: { userId: mainState.user.id },
    url: URL_UNIVERSITIES,
  })
    .then((response) => {
      console.log("resp data", response.data);
      setUniCount(response.data.page.totalElements);
    })
    .catch((error) => {
      console.log("get total uni count error", error);
    });
}, []);

useEffect(() => {
  axios({
    method: "GET",
    headers: { userId: mainState.user.id },
    url: URL_CLUBS,
  })
    .then((response) => {
      console.log("resp data", response.data);
      setClubCount(response.data.page.totalElements);
    })
    .catch((error) => {
      console.log("get total club count error", error);
    });
}, []);

  return (
    <ThemeProvider theme={theme}>
     
      <main style={{boxSizing:"initial"}}>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm" sx={{marginTop:"36px !important" }}>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
             UNIPLAT
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8}} maxWidth="md">
          {
            <div className={classes.AnimatedNumbersArea}>
            <MyAnimatedNumber  title={"Users"} count={userCount} severity="info" icon={<PersonIcon fontSize="inherit" />}/>
            <MyAnimatedNumber  title={"Universities"} severity="error" count={uniCount} icon={<AccountBalanceIcon fontSize="inherit" />}/>
            <MyAnimatedNumber  title={"Clubs"} count={clubCount} severity="success" icon={<GroupsIcon fontSize="inherit" />}/>
            <MyAnimatedNumber  title={"Posts"} count={postCount} severity="warning" icon={<ArticleIcon fontSize="inherit" />}/>
            </div>
          }
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                    
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                 
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}