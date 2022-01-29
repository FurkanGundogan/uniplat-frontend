import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import NewPostModalStyles from "./NewPostModalStyles";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "18px",
  boxShadow: "1px 2px 8px 2px rgb(255 255 255)",
  p: 4,
};

export default function NewPostModal({ modalState, setModal }) {
  const handleSend = () => {
    console.log(modalState);
  };
  const classes = NewPostModalStyles();
  return (
    <div>
      <Modal
        open={modalState.isOpen}
        onClose={() => {
          setModal({ isOpen: false });
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={classes.modalBox}>
          <div className={classes.innerGlobal}>
            <IconButton 
              aria-label="back"
              onClick={() => {
                setModal({ isOpen: false });
              }}
              >
              <KeyboardBackspaceIcon />
            </IconButton>
            <div className={classes.title}>New Post</div>
            <div className={classes.middleArea}>
              <TextField
                id="multiline-static"
                multiline
                rows={5}
                autoFocus
                placeholder="What do you want to write about, İsim"
                className={classes.text}
                onChange={(e) => {
                  setModal({ ...modalState, text: e.target.value });
                }}
              />
            </div>
            <div className={classes.bottom}>
              <div className={classes.bottomLeft}></div>
              <div className={classes.bottomMid}></div>
              <div className={classes.bottomRight}>
                <Button
                  variant="contained"
                  className={classes.sendButton}
                  endIcon={<SendIcon />}
                  onClick={handleSend}
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
