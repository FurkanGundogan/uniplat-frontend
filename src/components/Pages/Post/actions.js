import { URL_POSTS,URL_FILES } from "../../Contexts/Paths";
import axios from "axios";
export const send = (modalState) => {
  const type = modalState.type;


  switch (type) {
    case "Post":
      sendPost(modalState);
      break;
    case "Event":
      sendEvent(modalState);
      break;
    case "Survey":
      sendSurvey(modalState);
      break;
    default:
      break;
  }
};

const sendPost = (modalState) => {
  const { type, text,originalFile,postOwnerType,ownerId } = modalState;
  const bodyFormData = getFile(originalFile);
  if (bodyFormData === null) {
    // görselsiz
    console.log( "send: ",modalState );
     createWithBlankImageId(text,postOwnerType,type.toUpperCase(),ownerId)
  } else {
    // görselli
    console.log({ modalState, bodyFormData });
    createWithUploadedImageId(text,postOwnerType,type.toUpperCase(),ownerId,bodyFormData)
  }
};

const createWithBlankImageId = (
  description,
  postOwnerType,
  postType,
  ownerId,
  sharedPostId
) => {
  console.log("Create post standart data:", {
    description,
    postOwnerType,
    postType,
    ownerId,
    sharedPostId,
  });
  axios(URL_POSTS, {
    method: "POST",
    header: { "Content-type": "application/json" },
    data: {
      description,
      postOwnerType,
      postType,
      ownerId,
      sharedPostId,
    },
  })
    .then((response) => {
      console.log("POST Response:", response);
      // admin uni usersa eklenen ilk kişi
    })
    .catch((error) => {
      console.log("POST Create Error");
    });
};

const createWithUploadedImageId = (  description,
  postOwnerType,
  postType,
  ownerId,
  bodyFormData,
  sharedPostId,
  ) => {

  axios(URL_FILES, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: bodyFormData,
  })
    .then((fileresponse) => {
      console.log("Create Uni data:", {
        description,
        postOwnerType,
        postType,
        ownerId,
        profileImgId: fileresponse.data.id,
        sharedPostId,
      });
      axios(URL_POSTS, {
        method: "POST",
        header: { "Content-type": "application/json" },
        data: {
          description,
        postOwnerType,
        postType,
        ownerId,
        imgId: fileresponse.data.id,
        sharedPostId,
        },
      })
        .then((response) => {
          console.log("POST Created w file ", response);
          // admin uni usersa eklenen ilk kişi
          
        })
        .catch((userupdateerror) => {
          console.log("POST  w file Error");
        });
    })
    .catch((error) => {
      console.log("file create error at POST image");
    });
};




const sendEvent = (modalState) => {
  const { type, text, dateISO, eventLocation, selectedFile } = modalState;
  const bodyFormData = getFile(selectedFile);
  if (bodyFormData === null) {
    // görselsiz
    console.log({ type, text, dateISO, eventLocation });
  } else {
    // görselli
    console.log({ type, text, dateISO, selectedFile, bodyFormData });
  }
};

const sendSurvey = (modalState) => {
  const { type, text, surveyOptions } = modalState;
  console.log({ type, text, surveyOptions });
  console.log("survey'e kaç saat süreceği eklenmedi");
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




