import React from "react";
import Grid from "@mui/material/Grid";
import SearchPageStyles from "./SearchPageStyles";
import SearchList from './SearchList'
const SearchPage = () => {
  // bildirimler panel(desktop) ve sayfa(mobil) olmak üzere iki şekilde gösteriliyor
  // burası sayfa kısmı
  const classes = SearchPageStyles();
  return (
    <Grid container className={classes.HomeContainer}>
      <Grid item className={classes.LeftSide}>
      </Grid>
      <Grid item className={classes.Center}>
        <div className={classes.notAreaWrapper} >
            <div className={classes.title}>Results</div>
            <SearchList/>
        </div>
      </Grid>
      <Grid item className={classes.RightSide}>
        
      </Grid>
    </Grid>
  );
};

export default SearchPage;
