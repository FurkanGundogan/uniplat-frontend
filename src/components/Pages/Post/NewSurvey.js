import React from "react";
import NewPostModalStyles from "./NewPostModalStyles";
import TextField from "@mui/material/TextField";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import IconButton from "@mui/material/IconButton";
import Crop75TwoToneIcon from '@mui/icons-material/Crop75TwoTone';
function NewSurvey({ modalState, setModal }) {
  const classes = NewPostModalStyles();

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...modalState.surveyOptions];
    list[index][name] = value;
    setModal({
      ...modalState,
      surveyOptions: list,
    });
  };

  const handleRemoveClick = (index) => {
    const list = [...modalState.surveyOptions];
    list.splice(index, 1);
    setModal({
      ...modalState,
      surveyOptions: list,
    });
  };

  const handleAddClick = () => {
    setModal({
      ...modalState,
      surveyOptions: [...modalState.surveyOptions, { info: "" }],
    });
  };

  return (
    <div>
      {modalState.surveyOptions.map((option, i) => {
        return (
          <div key={i} className={classes.surveyOptionArea}>
            <div className={classes.surveyOptionAreaLeftGap}></div>
            <div className={classes.surveyOptionAreaLeft}>
            <Crop75TwoToneIcon />
            </div>
            <div className={classes.surveyOptionAreaMid}>
              <TextField
                name="info"
                value={option.info}
                onChange={(e) => handleInputChange(e, i)}
                variant="outlined"
                label={"Option-" + (i + 1)}
                fullWidth
                className={classes.optionInfo}
                
              />
            </div>
            <div className={classes.surveyOptionAreaRight}>
              {modalState.surveyOptions.length !== 2 && (
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  sx={{color:"#920101"}}
                  onClick={() => handleRemoveClick(i)}
                >
                  <CancelPresentationIcon />
                </IconButton>
              )}
              {modalState.surveyOptions.length - 1 === i && modalState.surveyOptions.length!==4 && (
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  onClick={() => {
                    handleAddClick();
                    console.log(modalState.surveyOptions);
                  }}
                  sx={{color:"#0b3f3d"}}
                >
                  <AddBoxIcon />
                </IconButton>
              )}
            </div>
            <div className={classes.surveyOptionAreaRightGap}></div>
          </div>
        );
      })}
    </div>
  );
}

export default NewSurvey;
