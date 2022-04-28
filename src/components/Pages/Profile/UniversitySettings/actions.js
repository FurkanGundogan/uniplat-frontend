import axios from "axios";
import { URL_FILES,URL_UNIVERSITIES } from "../../../Contexts/Paths";

export const save = (settings, profileState, setProfileState) => {
  const { name,adminId,description, originalFile } = settings;
  const bodyFormData = getFile(originalFile);
  if (bodyFormData !== null) {
    // görselsiz
    editWithUploadedImageId(
      profileState,
      setProfileState,
      name,
      description,
      adminId,
      bodyFormData,
    );
  } else {
    // görselli
    console.log("es1:",name,adminId)
    editStandard(
      profileState,
      setProfileState,
      name,
      description,
      adminId,
    );
  }
};

const editWithUploadedImageId = (
  profileState,
  setProfileState,
  name,
  description,
  adminId,
  bodyFormData
) => {
  const updateduser = {
    ...profileState.userInfo,
    name: name,
    description:description,
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
      console.log("Edit Uni w Image data:", {
        ...updateduser,
        profileImgId: fileresponse.data.id,
      });

      axios(URL_UNIVERSITIES + "/" + updateduser.id, {
        method: "PATCH",
        header: { "Content-type": "application/json" },
        data: { ...updateduser, profileImgId: fileresponse.data.id },
      })
        .then((response) => {
          setProfileState({ ...profileState, userInfo: response.data });
          console.log("res:",response.data)
        })
        .catch((userupdateerror) => {
          console.log("Uni Update w file Error");
        });
    })
    .catch((error) => {
      console.log("file create error at uni image");
    });
};

const editStandard = (profileState, setProfileState, name,description,adminId) => {
  console.log("es:",name,adminId)
  const updateduser = {
    ...profileState.userInfo,
    name: name,
    description:description,
    adminId:adminId,
  };
  console.log("Edit Uni Standard data:", updateduser);
  // file yoksa direkt  update et

  axios(URL_UNIVERSITIES + "/" + updateduser.id, {
    method: "PATCH",
    header: { "Content-type": "application/json" },
    data: updateduser,
  })
    .then((response) => {
      setProfileState({ ...profileState, userInfo: response.data });
      console.log("Uni Update Response:", response);
    })
    .catch((error) => {
      console.log("Uni Update Error");
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
