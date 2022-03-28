export const send = (modalState) => {
  const type = modalState.type;
  console.log("gidecek obje (düzenlenecek):");

  // uni

  if (modalState.uniPost) {
    switch (type) {
      case "Post":
        sendUniPost(modalState);
        break;
      case "Event":
        sendUniEvent(modalState);
        break;
      case "Survey":
        sendUniSurvey(modalState);
        break;
      default:
        break;
    }
    return;
  }

  // club post
  if (modalState.clubPost) {
    switch (type) {
      case "Post":
        sendClubPost(modalState);
        break;
      case "Event":
        sendClubEvent(modalState);
        break;
      case "Survey":
        sendClubSurvey(modalState);
        break;
      default:
        break;
    }
    return;
  }


  // buradan sonraki kişisel post

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
  const { type, text, selectedFile } = modalState;
  const bodyFormData = getFile(selectedFile);
  if (bodyFormData === null) {
    // görselsiz
    console.log({ type, text });
  } else {
    // görselli
    console.log({ type, text, selectedFile, bodyFormData });
  }
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

const getFile = (selectedFile) => {
  // bu fonksiyonu sendPost ve sendEvent Kullaniyor
  if (selectedFile !== undefined && selectedFile !== null) {
    const bodyFormData = new FormData();

    // daha önceden file'ı blob'a çevirmiştik.
    // şimdi tekrar file'a çeviriyoruz
    // sebebi, img bileşenin src'u file iken state değişirken sürekli network isteği oluşturuyordu.
    const f = new File([selectedFile], "file_name");

    bodyFormData.append("uploaded_file", f, f.name);
    return bodyFormData;
  }
  return null;
};



const sendUniPost = (modalState) => {
  const { type,from,uniPost,uniID, text, selectedFile } = modalState;
  const bodyFormData = getFile(selectedFile);
  if (bodyFormData === null) {
    // görselsiz
    console.log({ type, text,from,uniPost,uniID });
  } else {
    // görselli
    console.log({ type, text,from,uniPost,uniID, selectedFile, bodyFormData });
  }
};

const sendUniEvent = (modalState) => {
  const { type, text ,from,uniPost,uniID,dateISO, eventLocation, selectedFile } = modalState;
  const bodyFormData = getFile(selectedFile);
  if (bodyFormData === null) {
    // görselsiz
    console.log({ type, text,from,uniPost,uniID, dateISO, eventLocation });
  } else {
    // görselli
    console.log({ type, text ,from,uniPost,uniID,dateISO, selectedFile, bodyFormData });
  }
};

const sendUniSurvey = (modalState) => {
  const { type, text,from,uniPost,uniID, surveyOptions } = modalState;
  console.log({ type,from,uniPost,uniID, text, surveyOptions });
  console.log("survey'e kaç saat süreceği eklenmedi");
};

///


const sendClubPost = (modalState) => {
  const { type,from,clubPost,clubID, text, selectedFile } = modalState;
  const bodyFormData = getFile(selectedFile);
  if (bodyFormData === null) {
    // görselsiz
    console.log({ type, text,from,clubPost,clubID });
  } else {
    // görselli
    console.log({ type, text,from,clubPost,clubID, selectedFile, bodyFormData });
  }
};

const sendClubEvent = (modalState) => {
  const { type, text ,from,clubPost,clubID,dateISO, eventLocation, selectedFile } = modalState;
  const bodyFormData = getFile(selectedFile);
  if (bodyFormData === null) {
    // görselsiz
    console.log({ type, text,from,clubPost,clubID, dateISO, eventLocation });
  } else {
    // görselli
    console.log({ type, text ,from,clubPost,clubID,dateISO, selectedFile, bodyFormData });
  }
};

const sendClubSurvey = (modalState) => {
  const { type, text,from,clubPost,clubID, surveyOptions } = modalState;
  console.log({ type,from,clubPost,clubID, text, surveyOptions });
  console.log("survey'e kaç saat süreceği eklenmedi");
};




/*
axios({
  method: "post",
  url: "myurl",
  data: bodyFormData,
  headers: { "Content-Type": "multipart/form-data" },
})
  .then(function (response) {
    //handle success
    console.log(response);
  })
  .catch(function (response) {
    //handle error
    console.log(response);
  });
*/
