import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from "@mui/material/IconButton";
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import {useState} from 'react'
export default function ClubSettingsAlert(props) {

  const [state] = useState({
    open: true,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal } = state;
  const { alertState,setAlert } = props;


  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={()=>setAlert(false)}
      >
        <CloseTwoToneIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={alertState.isOpen}
        onClose={()=>setAlert(false)}
        message={alertState.msg}
        key={vertical + horizontal}
        action={action}
      />

  );
}