import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MainGroupStyles from "./MainClubStyles";
import { ClubContext } from './ClubContext';
export default function MyTabs({tab,setTab}) {
  const {setPostsAtClub, setPageNumberAtClub,setClick} = React.useContext(ClubContext)

  const classes = MainGroupStyles();
  const handleChange = (event, newValue) => {
    if(newValue===0){
      // ilk taba geçiş yapıldığında postlar refresh edilir ve tekrar getirilir
      setPostsAtClub([])
      setPageNumberAtClub(0)
    }
    setTab(newValue);
  };

  const handleClick = () => {
    if(tab===0){
      // ilk taba tıklandığında postlar refresh edilir ve tekrar getirilir
      setPostsAtClub([])
      setPageNumberAtClub(0)
      setClick(p=>p+1)
    }
   
  }

  return (
    <Box className={classes.mytabs} sx={{ bgcolor: 'background.paper' }} >
      <Tabs
        value={tab}
        onChange={handleChange}
        onClick={handleClick}
        variant="scrollable"
        
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
      >
        <Tab label="Posts" />
        <Tab label="Events" />
        <Tab label="Members" />

      </Tabs>
    </Box>
  );
}