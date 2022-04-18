import React, { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useAuthState } from ".";
export const UserExtraInfoContext = createContext();

export const UserExtraInfoContextProvider = ({ children }) => {
  const [userUni, setUserUni] = useState({ name: "" });
  const [userImg, setUserImg] = useState();
  const mainState = useAuthState(); //read user details from context

  const value = {
    userUni,
    setUserUni,
    userImg,
    setUserImg
  };
//mainstate'de uni adı bilgisi yok. ek bir context ekledik
  const URL_UNIVERSITIES = "http://localhost:8080/universities";
  useEffect(() => {
    const getuni = async () => {
      await axios
        .get(URL_UNIVERSITIES + "/" + mainState.user.universityId)
        .then((response) => {
          
          setUserUni(response.data);
        })
        .catch((e) => {
          console.log("uni context-info-get-error");
        });
    };
    if (mainState.user.universityId !== undefined) {
      getuni();
    }
    // burada dependency mainstate olunca ilk loginde de çalışıyor
  }, [mainState]);


  //mainstate'de img url bilgisi yok. ek bir context ekledik
  const URL_FILES = "http://localhost:8080/files";
  useEffect(() => {
    const getImgUrl = async () => {
      await axios
        .get(URL_FILES + "/" + mainState.user.profileImgId)
        .then((response) => {
          
          setUserImg(response.data);
        })
        .catch((e) => {
          console.log("user-img-url-context-info-get-error");
        });
    };
    if (mainState.user.profileImgId !== undefined) {
      getImgUrl();
    }
    // burada dependency mainstate olunca ilk loginde de çalışıyor
  }, [mainState]);

  return (
    <UserExtraInfoContext.Provider value={value}>
      {children}
    </UserExtraInfoContext.Provider>
  );
};
