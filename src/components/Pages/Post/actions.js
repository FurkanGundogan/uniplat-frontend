export const send = (modalState) => {
  const type = modalState.type;
  console.log("gidecek obje (düzenlenecek):");
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
  if (selectedFile !== undefined && selectedFile!==null) {
    const bodyFormData = new FormData();
    bodyFormData.append("myfile", selectedFile, selectedFile.name);
    return bodyFormData;
  }
  return null;
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
