import axios from "axios";
import { URL_USER_UNIVERSITIES,URL_USER_FOLLOWS } from "../../Contexts/Paths"

export const followUser = async (userId,followerId,profileState,setProfileState,profileFollowers,setProfileFollowers) => {
  console.log("user:",userId)
  console.log("followerId:",followerId)
  await axios(URL_USER_FOLLOWS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {userId,followerId},
  })
    .then((response) => {
      console.log("followUser User Join Successfull:",response.data);
      setProfileState({...profileState,
        isFollow:true,
        followShip:[response.data]})
        setProfileFollowers([...profileFollowers,response.data])

    })
      .catch((e) => {
      console.log("User Follows Join Error");
    });

}

export const unfollowUser = (followShip,profileState,setProfileState,profileFollowers,setProfileFollowers) => {
  console.log("Followship Before Leave:",followShip)
  axios(URL_USER_FOLLOWS+"/"+followShip[0].id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log("followUser User Leave Successfull");
      let users = profileFollowers.filter((element) => {
        return element.userId !== followShip[0].userId;
      });
      console.log("new users:",users)
      setProfileState({...profileState,isFollow:false,followShip:null})
      setProfileFollowers(users)
    })
      .catch((e) => {
      console.log("Follower User Leave Error");
    });

}

export const follow = async (userId,universityId,profileState,setProfileState,profileFollowers,setProfileFollowers) => {
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
        followShip:[response.data]})
        setProfileFollowers([...profileFollowers,response.data])
    })
      .catch((e) => {
      console.log("Uni User Join Error");
    });

}

export const unfollow = (followShip,profileState,setProfileState,profileFollowers,setProfileFollowers) => {
  console.log("Followship Before Leave:",followShip)
  axios(URL_USER_UNIVERSITIES+"/"+followShip[0].id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log("Uni User Leave Successfull");
      let users = profileFollowers.filter((element) => {
        return element.userId !== followShip[0].userId;
      });
      console.log("new users:",users)
      setProfileState({...profileState,isFollow:false,followShip:null})
      setProfileFollowers(users)
    })
      .catch((e) => {
      console.log("Uni User Leave Error");
    });

}
