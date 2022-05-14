import React, { useState } from "react";
import "./NewSearchBar.css";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
function NewSeachBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const goToSearch = () => {
   console.log("search with:",wordEntered)
  };


  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon onClick={goToSearch} />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 20).map((value, key) => {
            return (
              <a className="dataItem" target="_blank">
                <p>{value.title} </p>
              </a>
            );
          })}
          {
              <Button variant="text" fullWidth
              startIcon={<SearchIcon />}
              sx={{marginBottom:"6px !important"}}
              onClick={(e)=>{
                  e.stopPropagation()
                  console.log("Search all")
              }}
              >See All Results</Button>
          }
        </div>
      )}
    </div>
  );
}

export default NewSeachBar;