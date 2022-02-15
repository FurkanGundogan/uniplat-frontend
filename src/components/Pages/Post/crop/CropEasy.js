import { Cancel } from "@mui/icons-material";
import CropIcon from "@mui/icons-material/Crop";
import Crop169Icon from "@mui/icons-material/Crop169";
import Crop54Icon from "@mui/icons-material/Crop54";
import CropPortraitIcon from "@mui/icons-material/CropPortrait";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Slider,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./utils/cropImage";

const CropEasy = ({ modalState, setModal }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1 / 1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [original, setOriginal] = useState(URL.createObjectURL(modalState.originalFile));

  useEffect(() => {
      setOriginal(URL.createObjectURL(modalState.originalFile));
      // blob isteği sonsuz loopa giriyordu, useEffects ile onMount şekline
      // çevirerek düzelttik, alttaki yorum satırı warningi görmemek için
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    try {
      const { file } = await getCroppedImg(
        URL.createObjectURL(modalState.originalFile),
        croppedAreaPixels,
        rotation
      );
      setModal({
        ...modalState,
        selectedFile: file,
        cropModalOpen: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <DialogContent
        dividers
        sx={{
          background: "#333",
          position: "relative",
          height: 400,
          width: "auto",
          minWidth: { sm: 500 },
        }}
      >
        <Cropper
          image={original}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={aspect}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
        />
      </DialogContent>
      <DialogActions sx={{ flexDirection: "column", mx: 3, my: 2 }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Crop169Icon
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setAspect(16 / 9);
            }}
          />
          <Crop54Icon
            sx={{ cursor: "pointer" }}
            onClick={() => setAspect(5 / 4)}
          />
          <CropSquareIcon
            sx={{ cursor: "pointer" }}
            onClick={() => setAspect(1 / 1)}
          />
          <CropPortraitIcon
            sx={{ cursor: "pointer" }}
            onClick={() => setAspect(5 / 7)}
          />
        </Box>
        <Box sx={{ width: "100%", mb: 1 }}>
          <Box>
            <Typography>Zoom: {zoomPercent(zoom)}</Typography>
            <Slider
              valueLabelDisplay="auto"
              valueLabelFormat={zoomPercent}
              min={0}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </Box>
          <Box>
            <Typography>Rotation: {rotation + "°"}</Typography>
            <Slider
              valueLabelDisplay="auto"
              min={0}
              max={360}
              value={rotation}
              onChange={(e, rotation) => setRotation(rotation)}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<Cancel />}
            onClick={() => setModal({ ...modalState, cropModalOpen: false })}
          >
            Don't Crop
          </Button>
          <Button
            variant="contained"
            startIcon={<CropIcon />}
            onClick={cropImage}
          >
            Apply
          </Button>
        </Box>
      </DialogActions>
    </>
  );
};

export default CropEasy;

const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`;
};
