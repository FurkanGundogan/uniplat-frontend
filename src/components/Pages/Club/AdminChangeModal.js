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
import MainClubStyles from "./MainClubStyles";
import Divider from "@mui/material/Divider";
import { Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import NewSearchBar from "./Search/NewSearchBar";
import {
  TYPE_CLUB,
  URL_CLUBS,
  URL_FILES,
  URL_USERFOLLOWS,
} from "../../Contexts/Paths";
import axios from "axios";
export default function AdminChangeModal({
  showAdminChange,
  setShowAdminChange,
  mainUserId,
  setClubState,
  clubState,
}) {
  const [selected, setSelected] = useState();
  const classes = MainClubStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleConfirm = () => {
    // console.log(selected);
    if (selected !== undefined && selected !== null && isSelectedFollower!==undefined && isSelectedFollower!==null) {

      axios(URL_CLUBS + "/" + clubState.clubInfo.id, {
        method: "PUT",
        headers: { "Content-type": "application/json", userId: mainUserId },
        data: {
          ...clubState.clubInfo,
          adminId: selected.id,
        },
      })
        .then((response) => {
          setClubState({ ...clubState, clubInfo: response.data });
          console.log("Club Update Response:", response);

          if(isSelectedFollower===false){
            axios(URL_USERFOLLOWS, {
              method: "POST",
              headers: { "Content-type": "application/json" },
              data: {
                userId:selected.id,
                followType:TYPE_CLUB,
                followId:clubState.clubInfo.id
              },
            }).then((r)=>{
              console.log("change club admin set follow error")
            })
          }


          setShowAdminChange(false);
        })
        .catch((error) => {
          console.log("Club Update Error", error);
        });
    }
  };
  const [isSelectedFollower, setIsSelectedFollower] = useState();
  
  useEffect(() => {
    if ((selected !== undefined) && (selected !== null)) {
      axios({
        method: "GET",
        url: URL_USERFOLLOWS,
        params: {
          userId: selected.id,
          followType: TYPE_CLUB,
          followId: clubState.clubInfo.id,
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
          console.log("setIsSelectedFollower error", error);
        });
    }
    // eslint-disable-next-line
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
            Search For New Admin
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
