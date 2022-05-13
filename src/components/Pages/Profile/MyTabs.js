import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MainProfileStyles from "./MainProfileStyles";
import { ProfileContext } from './ProfileContext';

export default function MyTabs({isUni,tab,setTab}) {
  
  const {setPosts, setPageNumber,setClick} = React.useContext(ProfileContext)

  const classes = MainProfileStyles();
  const handleChange = (event, newValue) => {
    if(newValue===0){
      // ilk taba geçiş yapıldığında postlar refresh edilir ve tekrar getirilir
      setPosts([])
      setPageNumber(0)
    }
    setTab(newValue);
  };

  const handleClick = () => {
    if(tab===0){
      // ilk taba tıklandığında postlar refresh edilir ve tekrar getirilir
      setPosts([])
      setPageNumber(0)
      setClick(p=>p+1)
    }
   
  }

  return (
    <Box className={classes.mytabs} sx={{ bgcolor: 'background.paper' }} >
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="scrollable"
        onClick={handleClick}
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
      >
        <Tab label="Posts" />
        {isUni!==undefined&&<Tab label="Followers" />}
        <Tab label="Events" />
        <Tab label="Surveys" />
        {isUni!==undefined&&<Tab label="Clubs" />}
        {isUni===undefined&&<Tab label="Memberships" />}

      </Tabs>
    </Box>
  );
}