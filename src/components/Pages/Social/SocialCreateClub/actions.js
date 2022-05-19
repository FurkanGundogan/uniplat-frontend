import axios from "axios";
import { URL_FILES,URL_CLUBS, URL_USERFOLLOWS, TYPE_CLUB } from "../../../Contexts/Paths";


export const save = (settings) => {
  const { name, universityId, adminId, originalFile } = settings;

  const bodyFormData = getFile(originalFile);

  if (bodyFormData !== null) {
    // varsa önce file'ı yükle sonra  update et
    createWithUploadedImageId(
      name,
      universityId,
      adminId,
      bodyFormData
    );
  } else {
    // file yoksa direkt  update et
    createWithBlankImageId(name, universityId, adminId);
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

const createWithUploadedImageId = (
  name,
  universityId,
  adminId,
  bodyFormData
) => {
 
  axios(URL_FILES, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: bodyFormData,
  })
    .then((fileresponse) => {
      /*
      console.log("Club create w image data", {
        name,
        universityId,
        adminId,
        profileImgId: fileresponse.data.id,
      });
      */
      axios(URL_CLUBS, {
        method: "POST",
        header: { "Content-type": "application/json" },
        data: {
          name,
          universityId,
          adminId,
          profileImgId: fileresponse.data.id,
        },
      })
        .then((response) => {
          // console.log("Club Created w file ", response);
          // Admin is the first member of club
          PostToUserClub(response.data.id,adminId)
        })
        .catch((userupdateerror) => {
          console.log("Club Update w file Error");
        });
    })
    .catch((error) => {
      console.log("file create error at Club image");
    });
};

const createWithBlankImageId = (name, universityId, adminId) => {
  /*
  console.log("club create standard data:", {
    name,
    universityId,
    adminId,
    
  });
  */
  axios(URL_CLUBS, {
    method: "POST",
    header: { "Content-type": "application/json" },
    data: { name, universityId, adminId },
  })
    .then((response) => {
      //console.log("Club Created Response:", response);
      // Admin is the first member of club
      PostToUserClub(response.data.id,adminId)
    })
    .catch((error) => {
      console.log("Club Create Error");
    });
};



const PostToUserClub= (clubId,userId) => {
  axios(URL_USERFOLLOWS, {
    method: "POST",
    header: { "Content-type": "application/json" },
    data: {
      followId:clubId,
      userId,
      followType:TYPE_CLUB
    },
  }).then((response) => {
    // console.log("Posted Succes To User Follows ", response);
    goToNewUniPage(clubId)
  });
};

const goToNewUniPage = (id) =>{
  window.location.href="/clubs/"+id
}

