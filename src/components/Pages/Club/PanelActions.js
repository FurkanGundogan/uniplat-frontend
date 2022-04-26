import axios from "axios";
import { URL_USER_CLUBS } from "../../Contexts/Paths"

export const join = async (userId,clubId,clubState,setClubState) => {
  await axios(URL_USER_CLUBS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {userId,clubId},
  })
    .then((response) => {
      console.log("Club User Join Successfull:",response.data);
      setClubState({...clubState,clubUsers:[...clubState.clubUsers,response.data]})
    })
      .catch((e) => {
      console.log("Club User Join Error");
    });

}

export const leave = (memberShip,clubState,setClubState) => {
  console.log("member Before Leave:",memberShip)
  axios(URL_USER_CLUBS+"/"+memberShip[0].id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log("Club User Leave Successfull");
      let users = clubState.clubUsers.filter((element) => {
        return element.userId !== memberShip[0].userId;
      });
      console.log("new users:",users)
      setClubState({...clubState,clubUsers:users,isMember:false,memberShip:null})
    })
      .catch((e) => {
      console.log("Club User Leave Error");
    });

}
