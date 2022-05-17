import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { blue } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import MainClubStyles from "./MainClubStyles";
import Divider from "@mui/material/Divider";
import { Button, IconButton, Typography } from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import NewSearchBar from "./Search/NewSearchBar";
import { URL_CLUBS, URL_FILES } from "../../Contexts/Paths";
import axios from "axios";
export default function AdminListModal({
  showAdminList,
  setShowAdminList,
  mainUserId,
  setClubState,
  clubState,
}) {
  const [selected, setSelected] = useState();
  const classes = MainClubStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const likeUserList = ["username@gmail.com", "user02@gmail.com"];

  const [newEmail, setNewEmail] = useState(null);

  const handleListItemDeleteClick = (value) => {
    console.log(value);
  };
  const handleAddNew = (value) => {
    console.log(newEmail);
  };
  const handleConfirm = () => {
    console.log(selected);
    if (selected !== undefined && selected !== null) {
      console.log("clubInfo:", {
        ...clubState.clubInfo,
        adminId: selected.id,
      });
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
          setShowAdminList(false);
        })
        .catch((error) => {
          console.log("Club Update Error", error);
        });
    }
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        open={showAdminList}
        onClose={() => setShowAdminList(false)}
        aria-labelledby="responsive-dialog-title"
        scroll="paper"
      >
        <div className={classes.AdminListModalCloseIconWrapper}>
          <CloseIcon
            onClick={() => setShowAdminList(false)}
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
