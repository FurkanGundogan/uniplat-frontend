import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import InputStyles from "./InputStyles";

export default function MySelect(props) {
  const classes = InputStyles();
  const { name, label, value, error = null, onChange, options } = props;
  /*eslint-disable */
//console.log("opt",options)
  return (
    <FormControl
      variant="outlined"
      fullWidth
      className={classes.root}
      {...(error && { error: true })}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
        {options && options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
  
} 
