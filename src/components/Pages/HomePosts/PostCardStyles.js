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
  writeCommentArea:{
    
    "& .MuiInput-input.MuiInputBase-input":{
      fontSize:"14px !important",
      
    },
    "& .MuiInputBase-root.MuiInput-root":{
      "&:after": { 
        content: '""',
        borderBottom: 'none !important',
     }
    },
    "& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused":{
      color:"gray !important"
    },
    
    "& .MuiInputLabel-root.MuiInputLabel-formControl":{
      fontSize:"14px !important",
    }
  },
  writeCommentSendbutton:{
    marginLeft:"4px",
    color:"#65676b !important",
      "&:hover": { 
        
        color: '#2195a3 !important',
     }
    
  },
  LikeModalCloseIconWrapper:{
    display:"flex",
    
  },
  LikeModalCloseIcon:{
    marginLeft:"12px !important",
    alignSelf:"center",
    cursor:"pointer"
  },
  LikeModalTitle:{
    padding:"14px 8px !important"
  }
}));

export default PostCardStyles;
