import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MainGroupStyles from "./MainGroupStyles";
export default function MyTabs({tab,setTab}) {
 
  const classes = MainGroupStyles();
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
        <Tab label="Events" />
        <Tab label="Surveys" />
        <Tab label="Members" />

      </Tabs>
    </Box>
  );
}