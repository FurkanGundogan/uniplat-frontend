import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import MainProfileStyles from "../MainProfileStyles";

export default function EventListRadioButton({setListTypeValue, listTypeValue}) {
    const classes = MainProfileStyles();
  const handleChange = (event) => {
    setListTypeValue(event.target.value);
  };

  return (
    <FormControl sx={{width:"100%",padding:"4px"}}>
      {
        //<FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
      }
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={listTypeValue}
        onChange={handleChange}
        className={classes.RadioButtonArea}
      >
        <FormControlLabel value="Created" control={<Radio />} label="Created" />
        <FormControlLabel
          value="Participant"
          control={<Radio />}
          label="Participant"
        />
      </RadioGroup>
    </FormControl>
  );
}
