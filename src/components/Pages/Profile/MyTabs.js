import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MainProfileStyles from "./MainProfileStyles";
export default function MyTabs({isUni,tab,setTab}) {
 
  const classes = MainProfileStyles();
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box className={classes.mytabs} sx={{ bgcolor: 'background.paper' }} >
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="scrollable"
        
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
      >
        <Tab label="Posts" />
        <Tab label="Contacts" />
        <Tab label="Events" />
        <Tab label="Surveys" />
        <Tab label="Likes" />
        {isUni&&<Tab label="Groups" />}
        

      </Tabs>
    </Box>
  );
}