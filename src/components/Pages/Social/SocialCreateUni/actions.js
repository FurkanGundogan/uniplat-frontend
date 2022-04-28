import axios from "axios";
import { URL_FILES,URL_UNIVERSITIES,URL_USER_UNIVERSITIES } from "../../../Contexts/Paths";

export const save = (settings) => {
  const { name,description, adminId, originalFile } = settings;

  const bodyFormData = getFile(originalFile);

  if (bodyFormData !== null) {
    // varsa önce file'ı yükle sonra  update et
    createWithUploadedImageId(name, description,adminId, bodyFormData);
  } else {
    // file yoksa direkt  update et
    createWithBlankImageId(name,description, adminId);
  }

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

const createWithUploadedImageId = (name,description, adminId, bodyFormData) => {
  axios(URL_FILES, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: bodyFormData,
  })
    .then((fileresponse) => {
      console.log("Create Uni data:", {
        name,
        description,
        adminId,
        profileImgId: fileresponse.data.id,
      });
      axios(URL_UNIVERSITIES, {
        method: "POST",
        header: { "Content-type": "application/json" },
        data: {
          name,
          description,
          adminId,
          profileImgId: fileresponse.data.id,
        },
      })
        .then((response) => {
          console.log("Uni Created w file ", response);
          // admin uni usersa eklenen ilk kişi
          PostToUserUniversity(response.data.id,adminId)
        })
        .catch((userupdateerror) => {
          console.log("Uni Update w file Error");
        });
    })
    .catch((error) => {
      console.log("file create error at Uni image");
    });
};

const createWithBlankImageId = (name,description, adminId) => {
  console.log("Create uni standart data:", {
    name,
    description,
    adminId,
  });
  axios(URL_UNIVERSITIES, {
    method: "POST",
    header: { "Content-type": "application/json" },
    data: { name,description, adminId },
  })
    .then((response) => {
      console.log("Uni Created Response:", response);
      // admin uni usersa eklenen ilk kişi
      PostToUserUniversity(response.data.id,adminId)
    })
    .catch((error) => {
      console.log("Uni Create Error");
    });
};

const PostToUserUniversity = (universityId,userId) => {
  axios(URL_USER_UNIVERSITIES, {
    method: "POST",
    header: { "Content-type": "application/json" },
    data: {
      universityId,
      userId
    },
  }).then((response) => {
    console.log("Posted Succes To Uniusers ", response);
    goToNewUniPage(universityId)
  });
};

const goToNewUniPage = (id) =>{
  window.location.href="/uni/"+id
}
