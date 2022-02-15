import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NewPostModalStyles from "./NewPostModalStyles";
function NewEventDetails({ modalState, setModal }) {
  const classes = NewPostModalStyles();
  // const [errorState, setErrorState] = useState(false); local kontrol için kullanmıştım
  // <span>date:{errorState === false && modalState.dateISO}</span>
  const handleChange = (newValue) => {
    setModal({ ...modalState, eventDate: newValue, dateISO: "invalid" });
    if (newValue === null) {
      // setErrorState(true);
    } else {
      if (newValue.toString() === "Invalid Date") {
        // setErrorState(true);
      } else {
        let d = new Date(newValue);
        d.setTime(d.getTime() + 3 * 60 * 60 * 1000);
        let dateISOstring = d.toISOString();
        setModal({
          ...modalState,
          eventDate: newValue,
          dateISO: dateISOstring,
        });
      }
    }
  };
  return (
    <div className={classes.eventDetailsWrapper}>
      <div className={classes.eventDetailsdateWrapper}>
        <div className={classes.dateAndLocationTitleWrapper}>
          <span className={classes.dateAndLocationTitle}>Date & Time</span>
        </div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            ampm={false}
            value={modalState.eventDate}
            minDate={modalState.initialDate}
            maxDate={modalState.maxDate}
            inputFormat="dd/MM/yyyy HH:mm"
            onChange={handleChange}
            renderInput={(params) => {
              return <TextField fullWidth {...params} />;
            }}
          />
        </LocalizationProvider>
      </div>
      <div className={classes.eventDetailsGap}></div>
      <div className={classes.eventDetailslocWrapper}>
        <div className={classes.dateAndLocationTitleWrapper}>
          <span className={classes.dateAndLocationTitle}>Location</span>
        </div>
        <TextField
          fullWidth
          id="input-with-icon-textfield"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          onChange={(e) => {
            setModal({ ...modalState, eventLocation: e.target.value });
          }}
        />
      </div>
    </div>
  );
}

export default NewEventDetails;
