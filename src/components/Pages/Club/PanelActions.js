import axios from "axios";
import { TYPE_CLUB,URL_USERFOLLOWS } from "../../Contexts/Paths"

export const join = async (userId,clubId,clubState,setClubState) => {
  await axios(URL_USERFOLLOWS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {userId,followId:clubId,followType:TYPE_CLUB},
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
  axios(URL_USERFOLLOWS+"/"+memberShip[0].id, {
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
