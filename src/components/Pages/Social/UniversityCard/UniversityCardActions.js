import axios from "axios";
import {
  URL_UNIVERSITIES,
  URL_USERFOLLOWS,
} from "../../../Contexts/Paths";
export const getUniversityInfo = async (universityId, setUniversityInfo) => {
  await axios
    .get(URL_UNIVERSITIES + "/" + universityId)
    .then((response) => {
      setUniversityInfo(response.data);
    })
    .catch((e) => {
      console.log("uni-info-get-error");
    });
};

export const getUniversityUsersInfo = async (universityId,setUniversityUsersInfo) => {

    await axios({
      method: "GET",
      url: URL_USERFOLLOWS,
      params: {
        followId: universityId,
      },
    })
    .then((response) => {
      setUniversityUsersInfo(response.data.content);
    })
    .catch((e) => {
      console.log("uni-user-info-get-error");
    });
};
