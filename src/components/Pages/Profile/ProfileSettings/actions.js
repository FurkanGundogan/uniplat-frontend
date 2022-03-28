
export const save = (settings) => {
  const { name,surname,about, selectedFile } = settings;
  const bodyFormData = getFile(selectedFile);
  if (bodyFormData === null) {
    // görselsiz
    console.log({ name,surname,about });
  } else {
    // görselli
    console.log({ name,surname,about, selectedFile, bodyFormData });
  }
};

const getFile = (selectedFile) => {
    // bu fonksiyonu sendPost ve sendEvent Kullaniyor
  if (selectedFile !== undefined && selectedFile!==null) {
    const bodyFormData = new FormData();

    // daha önceden file'ı blob'a çevirmiştik.
    // şimdi tekrar file'a çeviriyoruz
    // sebebi, img bileşenin src'u file iken state değişirken sürekli network isteği oluşturuyordu.
    const f= new File([selectedFile],"file_name")
    
    bodyFormData.append("uploaded_file", f, f.name);
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
