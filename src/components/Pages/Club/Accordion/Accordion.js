import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import MainGroupStyles from "../MainClubStyles";
import { TYPE_CLUB } from "../../../Contexts/Paths";

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

export default function CustomizedAccordions({
  setShowAdminChange,
  setJoinReqList,
  setNewPostState,
  ownerId,
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };
  const classes = MainGroupStyles();
  return (
    <div className={classes.responsiveAdminArea}>
      <Accordion expanded={expanded} onChange={handleChange}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography component="span">Admin</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "0px !important" }}>
          <List
            sx={{ padding: "0px !important" }}
            component="nav"
            aria-label="mailbox folders"
          >
            {/*
            <ListItem button>
              <ListItemText onClick={()=>setJoinReqList(true)} primary="Show Join Requests" />
            </ListItem>
            */}
            <Divider />
            {
              /**
               * Admin list disabled
               <ListItem onClick={() => setShowAdminList(true)} button>
                  <ListItemText primary="Show Admins" />
                </ListItem>
            <Divider />
               */
            }
           
            <ListItem
              onClick={() => {
                setNewPostState({
                  type: "Post",
                  isOpen: true,
                  ownerId: ownerId,
                  ownerType: TYPE_CLUB,
                });
              }}
              button
            >
              <ListItemText primary="New Post" />
            </ListItem>
            
            <ListItem
              onClick={() => {
                setShowAdminChange(true);
              }}
              button
            >
              <ListItemText primary="Hand Over Management" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
