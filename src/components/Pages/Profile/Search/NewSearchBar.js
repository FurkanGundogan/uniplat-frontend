import React, { useState,useEffect, useRef, useCallback } from "react";
import "./NewSearchBarForAdminChange.css";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useSearch from "./useSearch";
import { TYPE_POST, URL_FILES,TYPE_TEACHER } from "../../../Contexts/Paths";


function NewSearchBar({ placeholder, data,setSelected }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const navigate=useNavigate()
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
/*
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
*/
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };



  useEffect(() => {
    // setResults([])
    const timer = setTimeout(() => {
      
      setText(wordEntered)
      setPageNumber(0)
      
    }, 500)

    return () => clearTimeout(timer)
  }, [wordEntered])



  const [results,setResults]=useState([])
  
  const [pageNumber,setPageNumber]=useState(0)
  const [size] = useState(3);
  const [text,setText]=useState("")

  useEffect(() => {
    // her yeni textte aramalar temizlenmekte
    setResults([])
    // console.log("text set oldu sonuclar:",results)
    // eslint-disable-next-line
  }, [text])
  
  const [filters]=useState(TYPE_TEACHER)
  
  const goToSearch = () => {
    // console.log("search with:",wordEntered)
    navigate("/search?filters="+filters+","+TYPE_POST+"&text="+wordEntered+"&page="+pageNumber+"&size=10")
    clearInput()
   };

  const { hasMore, loading } = useSearch(text,filters,pageNumber,size,setResults);
  
  const observer = useRef();
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
  
  

  return (
    <div className="search searchForAdmin">
      <div className="searchInputs searchInputsForAdmin">
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
        <div className="dataResult dataResultForAdmin">
          {results.map((result, key) => {
            if (results.length === key + 1) {
              return (
                <div className="dataItem" ref={lastPostElementRef} key={key} onClick={(e) => {
                  e.stopPropagation();
                  clearInput()
                  setSelected(result)
                 
                }}>
                <Avatar
                sx={{ bgcolor: "#aaa3a2",marginLeft:"8px" }}
                aria-label="recipe"
                src={result?.profileImgId && URL_FILES+"/"+result?.profileImgId}
              >
                
              </Avatar>
                  <p className="name">{result?.name} </p>
                </div>
              );
            }else{
              return (
                <div className="dataItem" key={key} onClick={(e) => {
                  e.stopPropagation();
                  clearInput()

                  setSelected(result)
                 
                }}>
                <Avatar
                sx={{ bgcolor: "#aaa3a2",marginLeft:"8px" }}
                aria-label="recipe"
                src={result?.profileImgId && URL_FILES+"/"+result?.profileImgId}
              >
                
              </Avatar>
                  <p className="name">{result?.name} </p>
                
                </div>
              );
            }
           
          })}

        </div>
      )}
    </div>
  );
}

export default NewSearchBar;