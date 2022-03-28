import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import { useAuthState } from "../../../Contexts";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import MainProfileStyles from "../MainProfileStyles";
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions({setShowAdminList,setCreateClubState,setNewUniPostState}) {
  const [expanded, setExpanded] = React.useState(false);
  const mainState = useAuthState(); 
  const handleChange =()=> {
    setExpanded(!expanded);
  };
  const classes = MainProfileStyles();
  return (
    <div className={classes.responsiveAdminArea}>
      <Accordion
        expanded={expanded}
        onChange={handleChange}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography component="span">Admin</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{padding:"0px !important"}}>
          <List sx={{padding:"0px !important"}} component="nav" aria-label="mailbox folders">
            <ListItem button>
              <ListItemText onClick={()=>setCreateClubState({isopen:true})} primary="Create Club" />
            </ListItem>
            <Divider />
            <ListItem onClick={()=>setShowAdminList(true)} button>
              <ListItemText primary="Show Admins" />
            </ListItem>
            <Divider />
            <ListItem onClick={()=> setNewUniPostState({ type: "Post", 
                  isOpen: true,
                  from:mainState.user.email,
                  uniPost:true,
                  uniID:"1"
                  })} button>
              <ListItemText primary="New Post" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
