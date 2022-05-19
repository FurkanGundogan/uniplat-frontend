import axios from "axios";
import { URL_USERFOLLOWS } from "../../Contexts/Paths"

export const follow = async (userId,followId,type,profileState,setProfileState,profileFollowers,setProfileFollowers) => {
  // followShip kalacak
  // filtreleme yerine property kullanılacak
  //console.log("user:",userId)
  //console.log("followId:",followId)
  await axios(URL_USERFOLLOWS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {userId,followId,followType:type},
  })
    .then((response) => {
      //console.log("Follow Successfull:",response.data);
      setProfileState({...profileState,
        userInfo:{...profileState.userInfo,followedByUser:true,countFollower:(profileState.userInfo.countFollower+1)},
       // isFollow:true,
       // followShip:[response.data]
      })
        setProfileFollowers([...profileFollowers,response.data])

    })
      .catch((e) => {
      console.log(" Follow Join Error");
    });

}

export const unfollow = async (userId,profileState,setProfileState,profileFollowers,setProfileFollowers) => {
 

  await axios({
    method:"GET",
    url:URL_USERFOLLOWS,
    params:{
        userId:userId,
        followId:profileState.userInfo.id,
    }
}).then((response) => {
    //console.log("setFollowers: ", response.data.content);
    axios(URL_USERFOLLOWS+"/"+response.data.content[0].id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        //console.log("Unfollow Successfull");
        let users = profileFollowers.filter((element) => {
          return element.userId !== userId;
        });
        //console.log("new users:",users)
        setProfileState({...profileState,
          userInfo:{...profileState.userInfo,followedByUser:false,countFollower:(profileState.userInfo.countFollower-1)},
          //isFollow:false,followShip:null
        })
        setProfileFollowers(users)
      })
        .catch((e) => {
        console.log("Unfollow Error");
      });


  })
  .catch((e) => {
    console.log("profile-followers-get-error");
  });

 

}
