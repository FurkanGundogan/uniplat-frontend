import axios from "axios"
import { URL_CLUBS,URL_UNIVERSITIES,URL_USERFOLLOWS} from "../../../Contexts/Paths";
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

  export const getClubUsersInfo = async (clubId,setClubUsersInfo) => {

    await axios({
      method: "GET",
      url: URL_USERFOLLOWS,
      params: {
        followId: clubId,
      },
    }).then((response) => {
      
      setClubUsersInfo(response.data.content);
    })
    .catch((e) => {
      console.log("club-uni-info-get-error");
    });
  }