import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { URL_POSTS } from '../../Contexts/Paths';

export default function DeletePostConfirmAlert({id,deleteAlert,setDeleteAlert}) {
 
    const handleClose=()=>{
        setDeleteAlert(false)

    }
    const handleDelete=()=>{
      axios({
        method: "DELETE",
        url: URL_POSTS+"/"+id,
      })
        .then((response) => {
            console.log("post delete succes");
            window.location.href="/Home"
            setDeleteAlert(false)
        })
        .catch((error) => {
          console.log("post delete error",error);
        });
      
      

  }
  return (
    <div>

      <Dialog
        open={deleteAlert}
        onClose={()=>setDeleteAlert(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Post"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}