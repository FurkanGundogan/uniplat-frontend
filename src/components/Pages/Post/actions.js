import { URL_POSTS,URL_FILES } from "../../Contexts/Paths";
import axios from "axios";
export const send = (modalState) => {
  const type = modalState.type;


  switch (type) {
    case "Post":
      sendPost(modalState);
      break;
    case "Activity":
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
  const { type, text,originalFile,ownerType,ownerId,sharedPostId } = modalState;
  const bodyFormData = getFile(originalFile);
  if (bodyFormData === null) {
    // görselsiz
    console.log( "send: ",{text,ownerType,type,ownerId} );
     createWithBlankImageId(sharedPostId,text,ownerType,type.toUpperCase(),ownerId)
  } else {
    // görselli
    console.log("send: ",{text,ownerType,type,ownerId,bodyFormData});
    createWithUploadedImageId(sharedPostId,text,ownerType,type.toUpperCase(),ownerId,bodyFormData)
  }
};

const createWithBlankImageId = (
  sharedPostId=null,
  description,
  ownerType,
  postType,
  ownerId,
  activityTitle,
  activityStartAt,


) => {
  console.log("Create post standart data:", {
    sharedPostId,
    description,
    ownerType,
    postType,
    ownerId,
    activityTitle,
    activityStartAt,

  });
  axios(URL_POSTS, {
    method: "POST",
    header: { "Content-type": "application/json" },
    data: {
      sharedPostId,
      description,
      ownerType,
      postType,
      ownerId,
      activityTitle,
      activityStartAt,
    
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

const createWithUploadedImageId = (  
  sharedPostId=null,
  description,
  ownerType,
  postType,
  ownerId,
  bodyFormData,
  activityTitle,
  activityStartAt,

  ) => {

  axios(URL_FILES, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: bodyFormData,
  })
    .then((fileresponse) => {
      console.log(" createWithUploadedImageId data:", {
        sharedPostId,
        description,
        ownerType,
        postType,
        ownerId,
        activityTitle,
        activityStartAt,
        imgId: fileresponse.data.id,
     
      });
      axios(URL_POSTS, {
        method: "POST",
        header: { "Content-type": "application/json" },
        data: {
        sharedPostId,
        description,
        ownerType,
        postType,
        ownerId,
        activityTitle,
        activityStartAt,
        imgId: fileresponse.data.id,
       
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

  const { type, text,originalFile,ownerType,activityTitle,ownerId,dateISO,eventLocation,sharedPostId } = modalState;
  const bodyFormData = getFile(originalFile);
  if (bodyFormData === null) {
    // görselsiz
    // title ve location eklenecek
    console.log({ sharedPostId,type, text,ownerType,ownerId,dateISO,eventLocation  });
    createWithBlankImageId(sharedPostId,text,ownerType,type.toUpperCase(),ownerId,activityTitle,dateISO)
  } else {
    // görselli
    console.log({sharedPostId, type, text,ownerType,ownerId,dateISO,eventLocation,bodyFormData  });
    createWithUploadedImageId(sharedPostId,text,ownerType,type.toUpperCase(),ownerId,bodyFormData,activityTitle,dateISO)
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




