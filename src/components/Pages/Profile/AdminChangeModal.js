import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CloseIcon from "@mui/icons-material/Close";
import MainProfileStyles from "./MainProfileStyles";
import Divider from "@mui/material/Divider";
import { Button, Typography } from "@mui/material";
import { useState,useEffect } from "react";
import NewSearchBar from "./Search/NewSearchBar";
import { TYPE_UNI, URL_FILES, URL_UNIVERSITIES, URL_USERFOLLOWS } from "../../Contexts/Paths";
import axios from "axios";
export default function AdminChangeModal({
  showAdminChange,
  setShowAdminChange,
  mainUserId,
  setProfileState,
  profileState,
}) {
  const [selected, setSelected] = useState();
  const classes = MainProfileStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));


  const handleConfirm = () => {
    console.log(selected);
    if (selected !== undefined && selected !== null && isSelectedFollower!==undefined && isSelectedFollower!==null) {
      console.log("id:", profileState.userInfo.id);
      console.log("mainUserId:", mainUserId);
      console.log("userInfo:", {
        adminId: selected.id,
        name:profileState.userInfo.name,
        description:profileState.userInfo.description,
        profileImgId:profileState.userInfo.profileImgId,
        version:profileState.userInfo.version,
      });
      
      axios(URL_UNIVERSITIES + "/" + profileState.userInfo.id, {
        method: "PUT",
        headers: { "Content-type": "application/json", userId: mainUserId },
        data: {
          adminId: selected.id,
          name:profileState.userInfo.name,
          description:profileState.userInfo.description,
          profileImgId:profileState.userInfo.profileImgId,
          version:profileState.userInfo.version,
        },
      })
        .then((response) => {
          setProfileState({ ...profileState, userInfo: response.data });
          console.log("Uni Update Response:", response);

          if(isSelectedFollower===false){
            axios(URL_USERFOLLOWS, {
              method: "POST",
              headers: { "Content-type": "application/json" },
              data: {
                userId:selected.id,
                followType:TYPE_UNI,
                followId:profileState.userInfo.id
              },
            }).then((r)=>{
              console.log("change uni admin set follow error")
            })
          }


          setShowAdminChange(false);
        })
        .catch((error) => {
          console.log("Uni Update Error", error);
        });
    }
  };


  const [isSelectedFollower, setIsSelectedFollower] = useState();
  console.log("isSelectedFollower uni", isSelectedFollower);
  useEffect(() => {
    if ((selected !== undefined) && (selected !== null)) {
      axios({
        method: "GET",
        url: URL_USERFOLLOWS,
        params: {
          userId: selected.id,
          followType: TYPE_UNI,
          followId: profileState.userInfo.id,
        },
      })
        .then((response) => {
          if (response.data.content.length > 0) {
            setIsSelectedFollower(true);
          } else {
            setIsSelectedFollower(false);
          }
        })
        .catch((error) => {
          console.log("setIsSelectedFollower Uni error", error);
        });
    }
  }, [selected]);


  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        open={showAdminChange}
        onClose={() => setShowAdminChange(false)}
        aria-labelledby="responsive-dialog-title"
        scroll="paper"
      >
        <div className={classes.AdminListModalCloseIconWrapper}>
          <CloseIcon
            onClick={() => setShowAdminChange(false)}
            className={classes.AdminListModalCloseIcon}
          />

          <DialogTitle
            className={classes.AdminListModalTitle}
            id="responsive-dialog-title"
          >
            {"Admin Change"}
          </DialogTitle>
        </div>
        <Divider />
        <div className="div" style={{ textAlign: "center", marginTop: "18px" }}>
          <Typography variant="h6" gutterBottom component="div">
            Search Teacher For New Adminship
          </Typography>
        </div>
        <NewSearchBar setSelected={setSelected} />
        <div className={classes.selectedUserForAdmin}>
          {selected && (
            <>
              <Avatar
                sx={{ bgcolor: "#aaa3a2", marginLeft: "8px" }}
                aria-label="recipe"
                src={
                  selected?.profileImgId &&
                  URL_FILES + "/" + selected?.profileImgId
                }
              ></Avatar>
              <div className="name">{selected?.name} </div>
             
            </>
          )}
        </div>
        <DialogContent>
          <List sx={{ pt: 0, marginBottom: "200px" }}>
            <Divider />

            <ListItem>
              <Button onClick={handleConfirm} fullWidth variant="outlined">
                Confirm
              </Button>
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
}
