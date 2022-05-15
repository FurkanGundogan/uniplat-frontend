import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import SearchPageStyles from "./SearchPageStyles";
import SearchList from "./SearchList";
import { useLocation, useNavigate } from "react-router-dom";
import useSearch from "../../Navbar/useSearch";
import { Avatar, Chip } from "@mui/material";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import SchoolIcon from "@mui/icons-material/School";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import {
  TYPE_CLUB,
  TYPE_POST,
  TYPE_UNI,
  TYPE_USER,
} from "../../Contexts/Paths";
const SearchPage = () => {
  const navigate=useNavigate()
  const TYPE_ALL =
    TYPE_USER + "," + TYPE_UNI + "," + TYPE_CLUB + "," + TYPE_POST;
  const classes = SearchPageStyles();
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState("");
  const [text, setText] = useState("");
  const [pageNumber,setPageNumber] = useState(0);
  const [size, setSize] = useState(10);
  function useQuery() {
    // ? ile parametreleri alabiliyoruz
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();

  useEffect(() => {
    setFilters(query.get("filters"));
    setText(query.get("text"));
    setPageNumber(query.get("page"))
    setSize(query.get("size"))
  }, [query]);

  console.log("filters:", filters);
  console.log("text:", text);
  console.log("page:", pageNumber);
  const {page} = useSearch(text, filters, pageNumber,size, setResults);
  console.log("results:", results);

  const handleFilterClick = (filter) => {
    if(filter===TYPE_ALL){
      navigate("/search?filters="+filter+"&text="+text+"&page=0&size=10")
    }else{
      navigate("/search?filters="+filter+"&text="+text+"&page=0&size=5")
    }
  };

  const handlePagination = (event,value) => {
    console.log("setpage:",value-1)

    if(filters===TYPE_ALL){
      navigate("/search?filters="+filters+"&text="+text+"&page="+(value-1)+"&size=10")
    }else{
      navigate("/search?filters="+filters+"&text="+text+"&page="+(value-1)+"&size=5")
    }

  }

  return (
    <Grid container className={classes.HomeContainer}>
      <Grid item className={classes.LeftSide}></Grid>
      <Grid item className={classes.Center}>
        <div className={classes.notAreaWrapper}>
          <div className={classes.filterTitle}>Filters</div>
          <div className={classes.filtersWrapper}>
            <Chip
              onClick={() => handleFilterClick(TYPE_ALL)}
              variant={filters === TYPE_ALL ? "filled" : "outlined"}
              icon={<ClearAllIcon />}
              label="All"
              className={classes.filter}
              color="success"
            />
            <Chip
              onClick={() => handleFilterClick(TYPE_USER)}
              variant={filters === TYPE_USER ? "filled" : "outlined"}
              label="User"
              className={classes.filter}
              icon={<SupervisedUserCircleIcon />}
              color="success"
            />
            <Chip
              onClick={() => handleFilterClick(TYPE_UNI)}
              variant={filters === TYPE_UNI ? "filled" : "outlined"}
              icon={<SchoolIcon />}
              label="University"
              className={classes.filter}
              color="success"
            />
            <Chip
              onClick={() => handleFilterClick(TYPE_CLUB)}
              variant={filters === TYPE_CLUB ? "filled" : "outlined"}
              icon={<GroupWorkIcon />}
              label="Club"
              className={classes.filter}
              color="success"
            />
            <Chip
              onClick={() => handleFilterClick(TYPE_POST)}
              variant={filters === TYPE_POST ? "filled" : "outlined"}
              icon={<ScreenShareIcon />}
              label="Post"
              className={classes.filter}
              color="success"
            />
          </div>

          <div className={classes.title}>Results</div>
          <SearchList results={results} />
          {page &&
          <Stack spacing={4}
          sx={{
            alignItems:"center !important",
            marginBottom:"60px"
          }}>
            <Pagination 
            count={page?.totalPages}
            page={(page?.number+1)}
            onChange={handlePagination} 
            color="primary"
             />
          </Stack>
          }
        </div>
      </Grid>
      <Grid item className={classes.RightSide}></Grid>
    </Grid>
  );
};

export default SearchPage;
