import { makeStyles } from "@mui/styles";

const SearchPageStyles = makeStyles((theme) => ({
  HomeContainer: {
    padding: theme.spacing(12, 0, 0, 0),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(8, 0, 8, 0),
    },
  },
  LeftSide: {
    position: "fixed",
    width: "25%",
    [theme.breakpoints.down("lg")]: {
        width: "10%",
    },
    [theme.breakpoints.down("md")]: {
        display: "none",
    },
  },
  Center: {
    width: "50%",
    backgroundColor: "#f4f4f4",
    marginLeft: "25% !important",
    height: "100%",
    [theme.breakpoints.down("lg")]: {
        marginLeft:"10% !important",
          width: "80%",
    },
    [theme.breakpoints.down("md")]: {
    marginLeft: "0 !important",
      width: "100%",
    },
    borderRadius: "16px",
  },
  RightSide: {
    position: "fixed",
    width: "25%",
    marginLeft: "75% !important",
    justifyContent: "space-around",
    [theme.breakpoints.down("lg")]: {
        width: "10%",
     },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    borderRadius: "16px",
  },
  notAreaWrapper:{
      marginTop:"4px"
  },
  title:{
     marginTop:"12px",
    marginBottom:"12px",
    textAlign:"center",
    fontFamily:"'Exo 2'",
    fontSize:"22px"
  },
  filterTitle:{
    marginTop:"12px",
    marginBottom:"12px",
    textAlign:"center",
    fontFamily:"'Exo 2'",
    fontSize:"22px"
  },
  filtersWrapper:{
    textAlign:"center",
    display:"block",
    justifyContent:"space-evenly",
    marginBottom:"12px",
  },
  filter:{
    cursor:"pointer !important",
    '&:hover': {
      background: "#2e7d32 !important",
      color:"white"
   },
  },
  searchItemListItem:{
    cursor:"pointer !important"
  },
  searchItemBottom:{
    display:"flex",
    [theme.breakpoints.down("lg")]: {
      display:"block",
   },
  },
  searchItemInner:{
    display:"flex", 
  },
  searchItemBottomFollowing:{
    marginLeft:"4px",
    display:"flex"
  },
  searchPostItemCardWrapper:{
    [theme.breakpoints.up("sm")]: {
      maxWidth:"50% !important",
      marginLeft:"25% !important"
   },
  },
  filtersWrapperGrid:{
    marginBottom:"12px !important",
  },
  "@global": {
    body: {
      height: "100% !important",

      backgroundImage: "none",
    },
  },
}));

export default SearchPageStyles;
