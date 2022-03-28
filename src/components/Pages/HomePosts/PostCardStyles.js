import { makeStyles } from "@mui/styles";

const PostCardStyles = makeStyles((theme) => ({
  CardWrapper: {
    marginBottom: "8px",
    cursor: "pointer",
    "& .MuiButtonBase-root.MuiIconButton-root:hover": {
      color: "#2195a3 !important",
    },
  },
  LikebuttonWrapper: {
    color: "#65676b !important",
  },
  CommentbuttonWrapper: {
    color: "#65676b !important",
    marginLeft: "auto !important",
  },
  SharebuttonWrapper: {
    marginLeft: "auto !important",
    color: "#65676b !important",
  },
  ShareText: {
    fontSize: "18px",
    marginLeft: "2px",
    fontFamily: "monospace",
    fontWeight: "bold",
  },
  LCSInfoWrapper: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "2px",
  },
  LikeInfo: {
    marginLeft: "8px",
  },
  ShareInfo: {
    marginRight: "8px",
  },
  CommentInfo: {},
  LCSInfoText: {
    color: "#65676b",
    fontSize: "12px",
    fontFamily: "cursive",
  },
  writeCommentArea: {
    alignItems: "stretch !important",
    "& .MuiInput-input.MuiInputBase-input": {
      fontSize: "14px !important",
    },
    "& .MuiInputBase-root.MuiInput-root": {
      "&:after": {
        content: '""',
        borderBottom: "none !important",
      },
    },
    "& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused": {
      color: "gray !important",
    },

    "& .MuiInputLabel-root.MuiInputLabel-formControl": {
      fontSize: "14px !important",
    },
  },
  writeCommentSendbutton: {
    alignSelf: "center !important",
    marginLeft: "4px",
    color: "#65676b !important",
    "&:hover": {
      color: "#2195a3 !important",
    },
  },
  LikeModalCloseIconWrapper: {
    display: "flex",
  },
  LikeModalCloseIcon: {
    marginLeft: "12px !important",
    alignSelf: "center",
    cursor: "pointer",
  },
  LikeModalTitle: {
    padding: "14px 8px !important",
  },
  CardSectionTitleWrapper: {
    background: "#e0e0e06b",
    width: "100%",
    display: "flex",
    paddingLeft: "8px",
    paddingTop: "8px",
    paddingBottom: "8px",
  },
  CardSectionTitleText: {
    fontSize: "18px",
    marginLeft: "6px",
    padding: "4px",
    fontFamily: "'Exo 2'",
  },
  CardSectionBackButton: {
    color: "white",
    borderRadius: "16px",
    padding: "4px",
    background: "#00a8ff",
    "&:hover": {
      color: "#00a8ff",
      background: "white",
    },
  },
  commentUserNameWrapper: {
    width: "100%",
    marginBottom: "2px",
  },
  commentUserName: {
    fontSize: "16px",
    fontFamily: "'Rubik'",
    fontWeight: "700",
  },
  commentTextWrapper: {
    width: "100%",
    marginBottom: "2px",
  },
  commentText: {
    color: "black",
    fontSize: "16px",
    fontFamily: "'Rubik'",
    fontWeight: "300",
  },
  commentTimeWrapper: {
    width: "100%",
    marginBottom: "0px",
  },
  commentTimeText: {
    color: "gray",
    fontSize: "12px",
  },
  commentsAreaWrapper: {
    marginTop: "32px",
  },
  innerPostCardWrapper: {
    padding: "4px 16px 16px 16px !important",
  },
  nestedCardWrapper: {
    borderRadius: "8px !important",
    boxShadow:
      "-1px -1px 0px 0px rgb(0 0 0 / 32%), 0px 1px 1px 0px rgb(255 255 255 / 92%), 0px 1px 3px 0px rgb(27 27 27) !important",
  },
}));

export default PostCardStyles;
