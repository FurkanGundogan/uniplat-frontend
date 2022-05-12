import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import NewPostModalStyles from "./NewPostModalStyles";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ToggleButton from "@mui/material/ToggleButton";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import ListIcon from "@mui/icons-material/List";
import NewSurvey from "./NewSurvey";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ClearIcon from "@mui/icons-material/Clear";
import CropRotateIcon from "@mui/icons-material/CropRotate";
import {
  validateMessage,
  validateSurvey,
  validateISODate,
  validateEventLocation,
  validateFileSize,
  validateFileExtension,
  validateEventTitle,
} from "./ValidationFunctions";
import NewPostAlert from "./NewPostAlert";
import { useState } from "react";
import NewEventDetails from "./NewEventDetails";

import moment from "moment";
import { send } from "./actions";

import CropEasy from "./crop/CropEasy";
const style = {
  position: "absolute",

  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "18px",
  p: 4,
};

export default function NewPostModal({ modalState, setModal,owner,ownerType }) {
  const handleSend = async () => {
    if (validate()) {
      send(modalState,owner,ownerType);
      
    } else {
      window.scrollTo(0, 0);
    }
  };
  const validate = () => {
    if (modalState.cropModalOpen === true) {
      setAlert({ msg: "Please Finish Editing Your Media", isOpen: true });
      return false;
    }

    if (!validateMessage(modalState.text)) {
      setAlert({ msg: "Write Something", isOpen: true });
      return false;
    }

    if (modalState.type === "Survey") {
      if (!validateSurvey(modalState.surveyOptions)) {
        setAlert({ msg: "Fill the Options", isOpen: true });
        return false;
      }
    }
    if (modalState.type === "Activity") {
      if (!validateEventLocation(modalState.eventLocation)) {
        setAlert({ msg: "Please Define Location", isOpen: true });
        return false;
      }
      if (!validateEventTitle(modalState.activityTitle)) {
        setAlert({ msg: "Please Define Title", isOpen: true });
        return false;
      }

      const { econtrol, emsg } = validateISODate(
        modalState.dateISO,
        modalState.maxDate
      );

      if (!econtrol) {
        setAlert({ msg: emsg, isOpen: true });
        return false;
      }
    }

    return true;
  };

  const [alertState, setAlert] = useState({ msg: "", isOpen: false });

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
            <NewPostAlert alertState={alertState} setAlert={setAlert} />
            <IconButton
              aria-label="back"
              onClick={() => {
                setModal({ isOpen: false });
              }}
            >
              <KeyboardBackspaceIcon />
            </IconButton>
            <div className={classes.title}>New {modalState.type}</div>
            <div className={classes.middleArea}>
              <TextField
                id="multiline-static"
                multiline
                rows={5}
                placeholder="What do you want to write about, İsim"
                className={classes.text}
                onChange={(e) => {
                  setModal({ ...modalState, text: e.target.value });
                }}
              />

              {modalState.selectedFile && modalState.type !== "Survey" && (
                <div className={classes.mediaArea}>
                  <ClearIcon
                    className={classes.mediaClear}
                    onClick={() => {
                      setModal({ ...modalState, selectedFile: null });
                    }}
                  />

                  <div>
                    {modalState.cropModalOpen && (
                      <CropEasy {...{ modalState, setModal }} />
                    )}
                    {modalState.cropModalOpen === false && (
                      <div>
                        <img
                          id="target"
                          alt=""
                          className={classes.media}
                          src={modalState.selectedFile}
                        />
                        <div style={{ textAlign: "center" }}>
                          <IconButton
                            aria-label="back"
                            onClick={() => {
                              setModal({ ...modalState, cropModalOpen: true });
                            }}
                          >
                            <div>
                              <CropRotateIcon color="primary" />
                            </div>
                          </IconButton>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className={classes.bottom}>
              <div className={classes.bottomLeft}>
                <ToggleButton
                  value="check"
                  selected={modalState.type === "Activity"}
                  size="small"
                  onChange={(e) => {
                    let d = new Date(new Date(moment().toISOString()));
                    d.setTime(d.getTime() + 3 * 60 * 60 * 1000);
                    let dateISOstring = d.toISOString();

                    let maxDate = new Date(new Date(moment().toISOString()));
                    maxDate.setFullYear(maxDate.getFullYear() + 1);
                    // console.log("max::",maxDate)

                    setModal({
                      ...modalState,
                      type: modalState.type === "Activity" ? "Post" : "Activity",
                      initialDate: new Date(moment().toISOString()),
                      eventDate: new Date(moment().toISOString()),
                      dateISO: dateISOstring,
                      maxDate: maxDate,
                      eventLocation: "",
                    });
                  }}
                >
                  {modalState.type === "Activity" ? (
                    <EventAvailableIcon />
                  ) : (
                    <EventBusyIcon />
                  )}
                </ToggleButton>
                <ToggleButton
                  value="check"
                  selected={modalState.type === "Survey"}
                  size="small"
                  sx={{ marginLeft: "8px" }}
                  onChange={(e) => {
                    setModal({
                      ...modalState,
                      surveyOptions:
                        modalState.type === "Survey"
                          ? null
                          : [{ info: "" }, { info: "" }],
                      type: modalState.type === "Survey" ? "Post" : "Survey",
                    });
                  }}
                >
                  <ListIcon />
                </ToggleButton>
                <label htmlFor="icon-button-file">
                  <input
                    style={{ display: "none" }}
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    onChange={(e) => {
                      if (
                        validateFileExtension(e.target.files[0].type) === false
                      ) {
                        setAlert({
                          msg: "Please Select An Image",
                          isOpen: true,
                        });
                        return;
                      }
                      if (validateFileSize(e.target.files[0].size) === false) {
                        setAlert({
                          msg: "File is too big. Max 5MB",
                          isOpen: true,
                        });
                        return;
                      }
                      
                      setModal({
                        ...modalState,
                        originalFile: e.target.files[0],
                        selectedFile: URL.createObjectURL(e.target.files[0]),
                        cropModalOpen: true,
                      });

                      // bu input sadece upload için var üzerinde gösterim yapmıyor
                      // aynı medyayı kaldırıp tekrar upload ettiğimiz
                      // zaman da onchange olması gerekiyordu. çözümü value=""
                    }}
                    value=""
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </div>
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
            {modalState.type === "Survey" && (
              <div className={classes.surveyArea}>
                <div className={classes.surveyTitle}>Survey</div>
                <NewSurvey modalState={modalState} setModal={setModal} />
              </div>
            )}
            {modalState.type === "Activity" && (
              <NewEventDetails modalState={modalState} setModal={setModal} />
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
