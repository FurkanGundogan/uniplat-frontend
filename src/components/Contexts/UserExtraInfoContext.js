import React, { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useAuthState } from ".";
import { URL_FILES,URL_UNIVERSITIES,URL_USER_CLUBS_BY_USERID
,URL_USER_UNIVERSITIES_BY_USERID } from "./Paths";

export const UserExtraInfoContext = createContext();

export const UserExtraInfoContextProvider = ({ children }) => {
  const [userUni, setUserUni] = useState({ name: "" });
  const [userImg, setUserImg] = useState();
  const [userClubs, setUserClubs] = useState();
  const [userUniversities, setUserUniversities] = useState();
  const mainState = useAuthState(); //read user details from context
  
  const value = {
    userUni,
    setUserUni,
    userImg,
    setUserImg,
    userClubs,
    setUserClubs,
    userUniversities,
    setUserUniversities,
  };
//mainstate'de uni adı bilgisi yok. ek bir context ekledik
 
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
  
  useEffect(() => {
    
    const getImgUrl = () => {
      if(mainState.user.profileImgId === ""){
        setUserImg(null);
        return
      }
      setUserImg(URL_FILES+"/"+mainState.user.profileImgId);
    };
    if (mainState.user.profileImgId !== undefined) {
      getImgUrl();
    }
    // burada dependency mainstate olunca ilk loginde de çalışıyor
  }, [mainState]);


  useEffect(() => {
    const getUserClubs = async () => {
      console.log("adres:",URL_USER_CLUBS_BY_USERID+ mainState.user.id)
      await axios
        .get(URL_USER_CLUBS_BY_USERID+ mainState.user.id)
        .then((response) => {
          
          setUserClubs(response.data.content);
        })
        .catch((e) => {
          console.log("user-clubs context-info-get-error");
        });
    };
    if (mainState.user.id !== undefined) {
      getUserClubs();
      
    }
    // burada dependency mainstate olunca ilk loginde de çalışıyor
  }, [mainState]);

  useEffect(() => {
    const getUserUniversities = async () => {
      console.log("adres:",URL_USER_UNIVERSITIES_BY_USERID+ mainState.user.id)
      await axios
        .get(URL_USER_UNIVERSITIES_BY_USERID+ mainState.user.id)
        .then((response) => {
          
          setUserUniversities(response.data.content);
        })
        .catch((e) => {
          console.log("user-universities context-info-get-error");
        });
    };
    if (mainState.user.id !== undefined) {
      getUserUniversities();
      
    }
    // burada dependency mainstate olunca ilk loginde de çalışıyor
  }, [mainState]);

  return (
    <UserExtraInfoContext.Provider value={value}>
      {children}
    </UserExtraInfoContext.Provider>
  );
};
