import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ClubSettingsModalStyles from "./ClubSettingsModalStyles";
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ClearIcon from "@mui/icons-material/Clear";
import {
  validateNames,
  validateFileSize,
  validateFileExtension,
} from "./ValidationFunctions";
import ClubSettingsAlert from "./ClubSettingsAlert";
import { useState } from "react";
import { save } from "./actions";
import CropEasy from "./crop/CropEasy";
import { Avatar } from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { blankavatarurl,URL_FILES } from "../../../Contexts/Paths";
// import { useNavigate } from "react-router-dom";
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

export default function ClubSettingsModal({ settings, setSettings,mainState,clubState,setClubState }) {
  //let navigate = useNavigate();
  // console.log(settings)

  const [avatar,setAvatar]=useState(clubState.clubInfo.profileImgId?
    URL_FILES+"/"+clubState.clubInfo.profileImgId : blankavatarurl)

  const handleSend = async () => {
    if (validate()) {
      save(settings, clubState, setClubState,mainState);
      setSettings({...settings,isopen:false})
      // window.location.href="/clubs/"+clubState.clubInfo.id
      
    } else {
      window.scrollTo(0, 0);
    }
  };
  const validate = () => {
    if (settings.cropModalOpen === true) {
      setAlert({ msg: "Please Finish Editing Your Media", isOpen: true });
      return false;
    }

    if (!validateNames(settings.name)) {
      setAlert({ msg: "Enter Club Name", isOpen: true });
      return false;
    }
    /*
    if (!validateAbout(settings.about)) {
      setAlert({ msg: "Fill the About", isOpen: true });
      return false;
    }
    */
    return true;
  };

  const [alertState, setAlert] = useState({ msg: "", isOpen: false });

  const classes = ClubSettingsModalStyles();

  return (
    <div>
      <Modal
        open={settings.isopen}
        onClose={() => {
          setSettings({ isopen: false });
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={classes.modalBox}>
          <div className={classes.innerGlobal}>
            <ClubSettingsAlert alertState={alertState} setAlert={setAlert} />
            <IconButton
              aria-label="back"
              onClick={() => {
                setSettings({ isopen: false });
              }}
            >
              <KeyboardBackspaceIcon />
            </IconButton>
            <div className={classes.title}>Club Informations {settings.type}</div>
            <div className={classes.middleArea}>
              <div className={classes.avatarWrapper}>
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
                      console.log("w:" + e.target.files[0].width);
                      setSettings({
                        ...settings,
                        originalFile: e.target.files[0],
                        selectedFile: URL.createObjectURL(e.target.files[0]),
                        cropModalOpen: true,
                      });
                    }}
                    value=""
                  />
                  <Avatar
                    alt="Remy Sharp"
                    src={avatar}
                    sx={{ width: 100, height: 100, cursor: "pointer" }}
                  />
                </label>
                
                {
                  avatar!==blankavatarurl &&
               
                  (
                    <div
                      className={classes.RemovePhotoText}
                      onClick={() => {
                        setSettings({
                          ...settings,
                          originalFile:null,
                          selectedFile: null,
                          cropModalOpen: false,
                          profileImgId:null,
                        });
                        setAvatar(blankavatarurl)
                      }}
                    >
                      Remove Photo
                    </div>
                  )}
                
                </div>
              
              {settings.selectedFile && (
                <div className={classes.mediaArea}>
                  <ClearIcon
                    className={classes.mediaClear}
                    onClick={() => {
                      setSettings({ ...settings, selectedFile: null });
                    }}
                  />

                  <div>
                    {settings.cropModalOpen && (
                      <CropEasy {...{ settings, setSettings,setAvatar }} />
                    )}
                  </div>
                </div>
              )}
              <div className={classes.inputAreaWrapper}>
                <TextField
                  id="multiline-static"
                  value={settings.name}
                  placeholder={settings.name}
                  className={classes.text}
                  onChange={(e) => {
                    setSettings({ ...settings, name: e.target.value });
                  }}
                />
                {/*
                <TextField
                  id="multiline-static"
                  placeholder="About Club"
                  className={classes.text}
                  onChange={(e) => {
                    setSettings({ ...settings, about: e.target.value });
                  }}
                />
                */
              }
              </div>
            </div>
            <div className={classes.bottom}>
              <div className={classes.savebuttonWrapper}>
                <Button
                  variant="contained"
                  className={classes.sendButton}
                  endIcon={<SaveAsIcon />}
                  onClick={handleSend}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
