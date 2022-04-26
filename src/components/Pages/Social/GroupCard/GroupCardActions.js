import axios from "axios"
import { URL_CLUBS,URL_UNIVERSITIES } from "../../../Contexts/Paths";
export const getClubInfos = async (clubId,setClubInfo,setClubUniInfo) => {
    await axios
      .get(URL_CLUBS+"/"+ clubId)
      .then((response) => {
        
        setClubInfo(response.data);

        getClubUniInfo(response.data.universityId,setClubUniInfo)

      })
      .catch((e) => {
        console.log("club-info-get-error");
      });

      
  };

  const getClubUniInfo = async (universityId,setClubUniInfo) => {
    await axios
    .get(URL_UNIVERSITIES+"/"+ universityId)
    .then((response) => {
      
      setClubUniInfo(response.data);
    })
    .catch((e) => {
      console.log("club-uni-info-get-error");
    });
  }