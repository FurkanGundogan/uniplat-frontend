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
import MainProfileStyles from "../../Profile/MainProfileStyles";
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
  setCreateUniState,
  setCreateClubState,
  isTeacher,
}) {
  const [expanded, setExpanded] = React.useState(false);
  // import { useAuthState } from "../../../Contexts"; const mainState = useAuthState();
  const handleChange = () => {
    setExpanded(!expanded);
  };
  const classes = MainProfileStyles();
  return (
    <div className={classes.responsiveAdminArea}>
      <Accordion
        sx={{ marginRight: "8px" }}
        expanded={expanded}
        onChange={handleChange}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography component="span">Panel</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "0px !important" }}>
          <List
            sx={{ padding: "0px !important" }}
            component="nav"
            aria-label="mailbox folders"
          >
            <ListItem button>
              <ListItemText
                onClick={() => setCreateClubState({ isopen: true })}
                primary="Create Club"
              />
            </ListItem>
            <Divider />
            {isTeacher === true && (
              <>
                <ListItem
                  onClick={() => setCreateUniState({ isopen: true })}
                  button
                >
                  <ListItemText primary="Create University" />
                </ListItem>
                <Divider />
              </>
            )}
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
