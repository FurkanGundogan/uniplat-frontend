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
    textAlign:"center"
  },
  filterTitle:{
    marginTop:"12px",
    marginBottom:"12px",
    textAlign:"center",
    fontFamily:"'Exo 2'",
    fontSize:"22px"
  },
  filtersWrapper:{
    display:"flex",
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
  "@global": {
    body: {
      height: "100% !important",

      backgroundImage: "none",
    },
  },
}));

export default SearchPageStyles;
