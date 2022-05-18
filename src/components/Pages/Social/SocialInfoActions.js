import axios from 'axios'
import { URL_USERFOLLOWS,TYPE_CLUB, TYPE_UNI, URL_UNIVERSITIES, URL_CLUBS,SIZE } from '../../Contexts/Paths';

export const getUserClubs = async (id,setClubs)=> {
    await axios({
        method: "GET",
        url: URL_USERFOLLOWS,
        params: {
          userId: id,
          followType:TYPE_CLUB,
          size:SIZE,
        },
      }).then((response) => {
         console.log("resss",response.data.content)
          setClubs(response.data.content);
        }).catch((e) => {
          console.log("user-clubs-get-error");
        });
}

export const getUserUniversities = async (id,setUniversities)=> {
    await axios({
        method: "GET",
        url: URL_USERFOLLOWS,
        params: {
          userId: id,
          followType:TYPE_UNI,
          size:SIZE,
        },
      }).then((response) => {
        
        setUniversities(response.data.content);
        }).catch((e) => {
          console.log("user-unis-get-error");
        });
}

export const getUserUniversitiesAsAdmin = async (id,setUniversitiesAsAdmin)=> {
  await axios({
      method: "GET",
      url: URL_UNIVERSITIES,
      params: {
        adminId: id,
        size:SIZE,
      },
    }).then((response) => {
      
      setUniversitiesAsAdmin(response.data.content);

      }).catch((e) => {
        console.log("getUserUniversitiesAsAdmin-get-error");
      });
}

export const getUserClubsAsAdmin = async (id,setClubsAsAdmin)=> {
  await axios({
      method: "GET",
      url: URL_CLUBS,
      headers:{"userId":id},
      params: {
        adminId: id,
        size:SIZE,
      },
    }).then((response) => {
      
      setClubsAsAdmin(response.data.content);

      }).catch((e) => {
        console.log("setClubsAsAdmin-get-error");
      });
}

