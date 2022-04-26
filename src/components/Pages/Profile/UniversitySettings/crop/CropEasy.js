import { Cancel } from "@mui/icons-material";
import CropIcon from "@mui/icons-material/Crop";
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

const CropEasy = ({ settings, setSettings,setAvatar }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1 / 1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [original, setOriginal] = useState(URL.createObjectURL(settings.originalFile));

  useEffect(() => {
      setOriginal(URL.createObjectURL(settings.originalFile));
      // blob isteği sonsuz loopa giriyordu, useEffects ile onMount şekline
      // çevirerek düzelttik, alttaki yorum satırı warningi görmemek için
      
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    try {
      const { file } = await getCroppedImg(
        URL.createObjectURL(settings.originalFile),
        croppedAreaPixels,
        rotation
      );
      setSettings({
        ...settings,
        originalFile:file,
        selectedFile: URL.createObjectURL(file),
        cropModalOpen: false,
      });
      setAvatar(URL.createObjectURL(file))

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
          <CropSquareIcon
            sx={{ display:"none", cursor: "pointer" }}
            onClick={() => setAspect(1 / 1)}
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
            onClick={() => setSettings({ ...settings, cropModalOpen: false })}
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
