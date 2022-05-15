import React, { useState,useEffect } from "react";
import "./NewSearchBar.css";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useSearch from "./useSearch";
import { TYPE_CLUB, TYPE_UNI, TYPE_USER,TYPE_POST, URL_FILES } from "../Contexts/Paths";


function NewSeachBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const navigate=useNavigate()
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



  useEffect(() => {
    const timer = setTimeout(() => {
      setText(wordEntered)
   
    }, 500)

    return () => clearTimeout(timer)
  }, [wordEntered])



  const [results,setResults]=useState([])
  
  const [pageNumber]=useState(0)
  const [text,setText]=useState("")

  useEffect(() => {
    console.log("text set oldu sonuclar:",results)
    // eslint-disable-next-line
  }, [text])
  
  const [filters]=useState(TYPE_USER+","+TYPE_UNI+","+TYPE_CLUB)
  
  const goToSearch = () => {
    console.log("search with:",wordEntered)
    navigate("/search?filters="+filters+","+TYPE_POST+"&text="+wordEntered)
    clearInput()
   };

  useSearch(text,filters,pageNumber,setResults);
  // const observer = useRef();
  /*
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore] //eslint-disable-line

    );
  */

  

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
            <SearchIcon onClick={goToSearch} sx={{cursor:"pointer !important"}}/>
          ) : (
            <CloseIcon id="clearBtn" onClick={()=>{
              clearInput()
              setText("")
            }} />
          )}
        </div>
      </div>
      {results.length !== 0 && (
        <div className="dataResult">
          {results.map((result, key) => {
            return (
              <div className="dataItem" key={key} onClick={(e) => {
                e.stopPropagation();
                clearInput()
                let target=""
                if(result.searchType===TYPE_USER) target=""
                if(result.searchType===TYPE_UNI) target="uni/"
                if(result.searchType===TYPE_CLUB) target="clubs/"
                navigate("/" +target+ result.id);
              }}>
              <Avatar
              sx={{ bgcolor: "#aaa3a2",marginLeft:"8px" }}
              aria-label="recipe"
              src={result?.profileImgId && URL_FILES+"/"+result?.profileImgId}
            >
              
            </Avatar>
                <p className="name">{result?.name} </p>
                <p className="type">{result?.searchType} </p>
              </div>
            );
          })}
          {
              <Button variant="text" fullWidth
              startIcon={<SearchIcon />}
              sx={{marginBottom:"6px !important"}}
              onClick={(e)=>{
                  e.stopPropagation()
                  console.log("Search all")
                  goToSearch()
              }}
              >See All Results</Button>
          }
        </div>
      )}
    </div>
  );
}

export default NewSeachBar;