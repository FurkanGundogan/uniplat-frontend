import axios from "axios";
import {
  URL_UNIVERSITIES,
  URL_USER_UNIVERSITIES_BY_UNIVERSITYID,
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
  await axios
    .get(URL_USER_UNIVERSITIES_BY_UNIVERSITYID + universityId)
    .then((response) => {
      setUniversityUsersInfo(response.data.content);
    })
    .catch((e) => {
      console.log("uni-user-info-get-error");
    });
};
