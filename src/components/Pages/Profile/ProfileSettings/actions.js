import axios from "axios";
import { URL_USERS,URL_FILES,URL_UNIVERSITIES } from "../../../Contexts/Paths";

// buradaki edit, uni ve club ile aynı işi yapıyor. Ama kod benzer şekilde düzenlenmedi
export const save = (
  settings,
  mainState,
  dispatch,
  profileState,
  setProfileState
) => {
  const { name, surname,profileImgId,universityId, description,originalFile } = settings;
  const bodyFormData = getFile(originalFile);
  if (bodyFormData === null) {
    // görselsiz
    editReq({
      mainState,
      dispatch,
      profileImgId,
      profileState,
      setProfileState,
      name,
      universityId,
      surname,
      description,
    });
  } else {
    // görselli
 
    editReq({
      mainState,
      dispatch,
      profileState,
      setProfileState,
      profileImgId,
      name,
      surname,
      universityId,
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
  universityId,
  profileImgId,
  description,
  bodyFormData,
}) => {
  const updateduser = {
    name:name,
    surname:surname,
    profileImgId:profileImgId,
    description:description,
    universityId:universityId,
    version:mainState.user.version,
    messageAccessed:mainState.user.messageAccessed,
    birthDate:mainState.user.birthDate,
    gender:mainState.user.gender,
  };


  if (bodyFormData !== undefined) {
    // varsa önce file'ı yükle sonra user'ı update et

    console.log("uu:", updateduser);
    
    axios(URL_FILES, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: bodyFormData,
    })
      .then((fileresponse) => {
        console.log("updateduser:",{...updateduser, profileImgId: fileresponse.data.id})
        axios(URL_USERS + "/" + mainState.user.id, {
          method: "PUT",
          headers: { "Content-type": "application/json",
                    "userId":mainState.user.id  },
          data: { ...updateduser, profileImgId: fileresponse.data.id },
        })
          .then((response) => {
    
            dispatch({ type: "UPDATE", payload: response.data });
      
            localStorage.setItem("currentUser", JSON.stringify(response.data));
            
            setProfileState({ ...profileState, userInfo: response.data });
           
          })
          .catch((userupdateerror) => {
            console.log("User Update Errorrrrr:",userupdateerror);
          });
      })
      .catch((error) => {
        console.log("file create error");
      });
  } else {
    // file yoksa direkt user'ı update et
    console.log("uu:", updateduser);
    axios(URL_USERS + "/" + mainState.user.id, {
      method: "PUT",
      headers: { "Content-type": "application/json",
                "userId":mainState.user.id },
      data: updateduser,
    })
      .then((response) => {
        
        dispatch({ type: "UPDATE", payload: response.data });
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        setProfileState({ ...profileState, userInfo: response.data });
        console.log("User Update Response:", response);
      })
      .catch((error) => {
        console.log("User Update Error:",error.message);
      });
  }
};

const getFile = (originalFile) => {
  // bu fonksiyonu sendPost ve sendEvent Kullaniyor
  if (originalFile !== undefined && originalFile !== null) {
    
    const bodyFormData = new FormData();
    bodyFormData.append("file", originalFile,originalFile.name);

    return bodyFormData;
  }
  return null;
};


export const getUniversitiesForEdit = (setUniList,mainuserid) => {
  
  axios
    .get(URL_UNIVERSITIES + "?page=0&size=10",{headers:{"userId":mainuserid}})
    .then((response) => { 
      setUniList(response.data.content);
    })
    .catch((e) => {
      console.log("useredit-getall-uni-error");
    });
 
};


