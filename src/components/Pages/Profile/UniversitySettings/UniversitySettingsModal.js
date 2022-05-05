import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import UniversitySettingsModalStyles from "./UniversitySettingsModalStyles";
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ClearIcon from "@mui/icons-material/Clear";
import {
  validateNames,
  validateFileSize,
  validateFileExtension,
} from "./ValidationFunctions";
import UniversitySettingsAlert from "./UniversitySettingsAlert";
import { useState } from "react";
import { save } from "./actions";
import CropEasy from "./crop/CropEasy";
import { Avatar } from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
// import { useNavigate } from "react-router-dom";
import { blankavatarurl,URL_FILES } from "../../../Contexts/Paths";
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

export default function UniversitySettingsModal({ settings, setSettings,profileState,setProfileState }) {
 
  // let navigate = useNavigate();
 
 console.log("uni edit settings:",settings)
  // Edit sayfalarında ek olarak avatar state'i mevcut
  // mevcut görsel var ve yeni görsel yüklenirken karşılaşılan Cropeasy componenti hatasından ötürü kullanıldı
  const [avatar,setAvatar]=useState(profileState.userInfo.profileImgId?
    URL_FILES+"/"+profileState.userInfo.profileImgId : blankavatarurl)

  const handleSend = async () => {
    if (validate()) {
      
      save(settings,profileState,setProfileState);
      setSettings({...settings,isopen:false})
      // window.location.href="/uni/"+profileState.userInfo.id
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
      setAlert({ msg: "Enter University Name", isOpen: true });
      return false;
    }


    return true;
  };

  const [alertState, setAlert] = useState({ msg: "", isOpen: false });
 
  const classes = UniversitySettingsModalStyles();

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
            <UniversitySettingsAlert alertState={alertState} setAlert={setAlert} />
            <IconButton
              aria-label="back"
              onClick={() => {
                setSettings({ isopen: false });
              }}
            >
              <KeyboardBackspaceIcon />
            </IconButton>
            <div className={classes.title}>University Informations</div>
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
                      
                      setSettings({
                        ...settings,
                        originalFile: e.target.files[0],
                        selectedFile: URL.createObjectURL(e.target.files[0]),
                        cropModalOpen: true,
                      });
                      setAvatar(URL.createObjectURL(e.target.files[0]))
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
                  placeholder={settings.name}
                  value={settings.name}
                  className={classes.text}
                  onChange={(e) => {
                    setSettings({ ...settings, name: e.target.value });
                  }}
                />
                 <TextField
                  id="multiline-static"
                  placeholder={settings.description?settings.description:"Description"}
                  value={settings.description?settings.description:""}
                  className={classes.text}
                  onChange={(e) => {
                    setSettings({ ...settings, description: e.target.value });
                  }}
                />
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
