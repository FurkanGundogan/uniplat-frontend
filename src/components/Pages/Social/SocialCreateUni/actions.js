import axios from "axios";
import { URL_FILES,URL_UNIVERSITIES,URL_USERFOLLOWS,TYPE_UNI } from "../../../Contexts/Paths";

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
      /*
      console.log("Create Uni data:", {
        name,
        description,
        adminId,
        profileImgId: fileresponse.data.id,
      });
      */
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
          // console.log("Uni Created w file ", response);
          // admin uni usersa eklenen ilk kişi
          PostToUserFollow(response.data.id,adminId)
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
  /*
  console.log("Create uni standart data:", {
    name,
    description,
    adminId,
  });
  */
  axios(URL_UNIVERSITIES, {
    method: "POST",
    header: { "Content-type": "application/json" },
    data: { name,description, adminId },
  })
    .then((response) => {
      // console.log("Uni Created Response:", response);
      // admin uni usersa eklenen ilk kişi
      PostToUserFollow(response.data.id,adminId)
    })
    .catch((error) => {
      console.log("Uni Create Error");
    });
};

const PostToUserFollow= (universityId,userId) => {
  axios(URL_USERFOLLOWS, {
    method: "POST",
    header: { "Content-type": "application/json" },
    data: {
      followId:universityId,
      userId,
      followType:TYPE_UNI
    },
  }).then((response) => {
    // console.log("Posted Succes To Uniusers ", response);
    goToNewUniPage(universityId)
  });
};

const goToNewUniPage = (id) =>{
  window.location.href="/uni/"+id
}
