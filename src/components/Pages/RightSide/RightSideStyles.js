import { makeStyles } from "@mui/styles";

const RightSideStyles = makeStyles((mytheme) => ({
  imageWrapper: {
    marginTop: "32px",
    textAlign: "center",
  },
  image: {
    width: "80%",
    borderRadius: "12px",
  },
  uplogo: {
    width: "20px",
    height: "20px",
    border: "1px solid white",
    padding: "4px",
    borderRadius: "8px",
  },
  bottom: {
    marginTop: "12px",
    padding: "4px !important",
    display: "flex !important",
    justifyContent: "center",
    marginBottom: "8px",
  },
  copyright: {
    padding: "4px !important",
  },
  element: {
    alignItems: "center !important",
    display: "flex",
    fontSize: "10px",
    fontFamily: "system-ui",
    padding: "4px",
    color: "gray",
    cursor: "pointer",
    "&:hover": {
      color: "blue !important",
      background: "none !important",
      textDecoration: "underline",
    },
    [mytheme.breakpoints.up("xl")]: {
      fontSize: "14px !important",
    },
    [mytheme.breakpoints.down("xl")]: {
      fontSize: "11px !important",
    },
    [mytheme.breakpoints.down("lg")]: {
      fontSize: "9px !important",
    },
  },
  elementArea: {
    paddingLeft: "32px",
    paddingRight: "32px",
    paddingTop: "8px",
  },
  icon: {
    fontSize: "14px !important",
    [mytheme.breakpoints.up("xl")]: {
      fontSize: "22px !important",
    },
    [mytheme.breakpoints.down("xl")]: {
      fontSize: "14px !important",
    },
    [mytheme.breakpoints.down("lg")]: {
      fontSize: "12px !important",
    },
  },
}));

export default RightSideStyles;
