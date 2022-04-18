import axios from "axios";
const URL_USERS = "http://localhost:8080/users";
const URL_FILES = "http://localhost:8080/files";
export const save = (
  settings,
  mainState,
  dispatch,
  profileState,
  setProfileState
) => {
  const { name, surname, description, selectedFile } = settings;
  const bodyFormData = getFile(selectedFile);
  if (bodyFormData === null) {
    // görselsiz
    console.log({ name, surname, description });
    editReq({
      mainState,
      dispatch,
      profileState,
      setProfileState,
      name,
      surname,
      description,
    });
  } else {
    // görselli
    console.log({ name, surname, description, selectedFile, bodyFormData });
    editReq({
      mainState,
      dispatch,
      profileState,
      setProfileState,
      name,
      surname,
      description,
      bodyFormData,
    });
  }
};

export const editReq = ({
  mainState,
  dispatch,
  profileState,
  setProfileState,
  name,
  surname,
  description,
  bodyFormData,
}) => {
  const updateduser = {
    ...mainState.user,
    name: name,
    surname: surname,
    description: description,
    version: mainState.user.version,
    password: "123123",
  };
  console.log("uu:", updateduser);

  

  if (bodyFormData !== undefined) {
    // varsa önce file'ı yükle sonra user'ı update et
    let fileid=""
    console.log("formdata:",bodyFormData)
    axios(URL_FILES, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data:bodyFormData,
        
      })
      .then((fileresponse) => {
        console.log("file created", fileresponse);
        axios(URL_USERS + "/" + mainState.user.id, {
          method: "PATCH",
          header: { "Content-type": "application/json" },
          data: {...updateduser,profileImgId:fileresponse.data.id},
        })
          .then((response) => {
           // console.log("user update edildi 1 ",response)
           // console.log("asd:",fileresponse.id.data.id)
            //console.log("User Update Response:", response);
            dispatch({ type: "UPDATE", payload: response.data });
            //console.log("user update edildi dispatch oldu 2")
            localStorage.setItem("currentUser", JSON.stringify(response.data));
            //console.log("user update edildi locale kayıt oldu 3")
            setProfileState({ ...profileState, userInfo: response.data });
            console.log("user update edildi state setlendi 4")
           
          })
          .catch((userupdateerror) => {
            console.log("User Update Errorrrrr");
          });
      })
      .catch((error) => {
        console.log("file create error");
      });
  } else {
      // file yoksa direkt user'ı update et
    axios(URL_USERS + "/" + mainState.user.id, {
      method: "PATCH",
      header: { "Content-type": "application/json" },
      data: updateduser,
    })
      .then((response) => {
        console.log("User Update Response:", response);
        dispatch({ type: "UPDATE", payload: response.data });
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        setProfileState({ ...profileState, userInfo: response.data });
      })
      .catch((error) => {
        console.log("User Update Error");
      });
  }
};

const getFile = (selectedFile) => {
  // bu fonksiyonu sendPost ve sendEvent Kullaniyor
  if (selectedFile !== undefined && selectedFile !== null) {
    const bodyFormData = new FormData();

    // daha önceden file'ı blob'a çevirmiştik.
    // şimdi tekrar file'a çeviriyoruz
    // sebebi, img bileşenin src'u file iken state değişirken sürekli network isteği oluşturuyordu.
    const f = new File([selectedFile], "file_name");

    bodyFormData.append("file", f, f.name);
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
