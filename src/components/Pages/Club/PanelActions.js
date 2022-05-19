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
      // console.log("Club User Join Successfull:",response.data);
      setClubState({...clubState,
        clubInfo:{...clubState.clubInfo,followedByUser:true,countFollower:(clubState.clubInfo.countFollower+1)},
        clubUsers:[...clubState.clubUsers,response.data]})
    })
      .catch((e) => {
      console.log("Club User Join Error");
    });

}

export const leave = async (userId,clubState,setClubState) => {


  await axios(URL_USERFOLLOWS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: {userId:userId,followId:clubState.clubInfo.id},
  })
    .then((response) => {
      // console.log("Club User Join Successfull:",response.data.content);
      axios(URL_USERFOLLOWS+"/"+response.data.content[0].id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log("Club User Leave Successfull");
          let users = clubState.clubUsers.filter((element) => {
            return element.userId !== userId;
          });
          // console.log("new users:",users)
          setClubState({...clubState,
            clubInfo:{...clubState.clubInfo,followedByUser:false,countFollower:(clubState.clubInfo.countFollower-1)},
            clubUsers:users})
        })
          .catch((e) => {
          console.log("Club User Leave Error");
        });


    })
      .catch((e) => {
      console.log("Club User Join Error");
    });






}
