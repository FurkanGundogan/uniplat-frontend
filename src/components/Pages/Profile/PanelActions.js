import axios from "axios";
import { URL_USER_UNIVERSITIES } from "../../Contexts/Paths"

export const follow = async (userId,universityId,profileState,setProfileState) => {
  console.log("user:",userId)
  console.log("uni:",universityId)
  await axios(URL_USER_UNIVERSITIES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {userId,universityId},
  })
    .then((response) => {
      console.log("Uni User Join Successfull:",response.data);
      setProfileState({...profileState,
        isFollow:true,
        followers:[...profileState.followers,response.data],followShip:[response.data]})
    })
      .catch((e) => {
      console.log("Uni User Join Error");
    });

}

export const unfollow = (followShip,profileState,setProfileState) => {
  console.log("Followship Before Leave:",followShip)
  axios(URL_USER_UNIVERSITIES+"/"+followShip[0].id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log("Uni User Leave Successfull");
      let users = profileState.followers.filter((element) => {
        return element.userId !== followShip[0].userId;
      });
      console.log("new users:",users)
      setProfileState({...profileState,followers:users,isFollow:false,followShip:null})
    })
      .catch((e) => {
      console.log("Club User Leave Error");
    });

}
