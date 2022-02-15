import { makeStyles } from "@mui/styles";

const PostAreaStyles = makeStyles((theme) => ({
  PostAreaWrapper: {
    [theme.breakpoints.up("lg")]: {
      paddingLeft: "72px",
      paddingRight: "72px",
    },
  },
}));

export default PostAreaStyles;
