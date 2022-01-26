import React from "react";
import { TextField } from "@mui/material";
import InputStyles from "./InputStyles";

function Input(props) {
  const classes = InputStyles();
  const { name, label, value, error = null, onChange, type } = props;
  return (
    <TextField
      name={name}
      fullWidth
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      className={classes.root}
      {...(error && { error: true, helperText: error })}
    />
  );
}

export default Input;
