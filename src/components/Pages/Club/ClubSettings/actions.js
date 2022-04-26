import axios from "axios";
import { URL_FILES,URL_CLUBS } from "../../../Contexts/Paths";

export const save = (settings, clubState, setClubState) => {
  
  const { name,adminId, originalFile } = settings;
  
  const bodyFormData = getFile(originalFile);
  if (bodyFormData !== null) {
    // görselsiz
    editWithUploadedImageId(
      clubState,
      setClubState,
      name,
      adminId,
      bodyFormData,
    );
  } else {
    // görselli
    console.log("es1:",name,adminId)
    editStandard(
      clubState,
      setClubState,
      name,
      adminId,
    );
  }
};

const editWithUploadedImageId = (
  clubState,
  setClubState,
  name,
  adminId,
  bodyFormData
) => {
  const updatedClub = {
    ...clubState.clubInfo,
    name: name,
    adminId:adminId,
  };

  // varsa önce file'ı yükle sonra  update et

  axios(URL_FILES, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: bodyFormData,
  })
    .then((fileresponse) => {
      console.log("Edit Club w Image data:", {
        ...updatedClub,
        profileImgId: fileresponse.data.id,
      });

      axios(URL_CLUBS + "/" + updatedClub.id, {
        method: "PATCH",
        header: { "Content-type": "application/json" },
        data: { ...updatedClub, profileImgId: fileresponse.data.id },
      })
        .then((response) => {
          setClubState({ ...clubState, clubInfo: response.data });
        })
        .catch((clubupdateerror) => {
          console.log("Club Update w file Error");
        });
    })
    .catch((error) => {
      console.log("file create error at club image");
    });
};

const editStandard = (clubState, setClubState, name,adminId) => {
  console.log("es:",name,adminId)
  const updatedClub = {
    ...clubState.clubInfo,
    name: name,
    adminId:adminId,
  };
  console.log("Edit Club Standard data:", updatedClub);
  // file yoksa direkt  update et

  axios(URL_CLUBS + "/" + updatedClub.id, {
    method: "PATCH",
    header: { "Content-type": "application/json" },
    data: updatedClub,
  })
    .then((response) => {
      setClubState({ ...clubState, clubInfo: response.data });
      console.log("Club Update Response:", response);
    })
    .catch((error) => {
      console.log("Club Update Error");
    });
};

const getFile = (originalFile) => {
  // bu fonksiyonu sendPost ve sendEvent Kullaniyor
  if (originalFile !== undefined && originalFile !== null) {
    const bodyFormData = new FormData();
    bodyFormData.append("file", originalFile, originalFile.name);

    return bodyFormData;
  }
  return null;
};
