import axios from "axios";
import {
  URL_USER_LIKED_POSTS,
  URL_ACTIVITY_PARTICIPANTS,
} from "../../Contexts/Paths";

// backend like isteğini toggle edecek şekilde olduğu için
// burada da tek istekle like durumunu toggle edebiliyoruz.

export const likeToggle = (
  userId,
  postId,
  isLiked,
  setIsLiked,
  likeCount,
  setLikeCount
) => {
  if (isLiked === false) setLikeCount(likeCount + 1);
  else setLikeCount(likeCount - 1);

  setIsLiked(!isLiked);
  axios({
    method: "POST",
    headers: { userId: userId },
    url: URL_USER_LIKED_POSTS,
    data: {
      userId,
      postId,
    },
  })
    .then((response) => {
      // console.log("set begenme:", !isLiked);
    })
    .catch((error) => {
      console.log("begenme sorunu:", error);
    });
};

export const activityJoinToggle = (
  userId,
  postId,
  isJoin,
  setIsJoin,
  participantsCount,
  setParticipantsCount
) => {
  setIsJoin(!isJoin);
  if (isJoin === false) {
    setParticipantsCount(participantsCount + 1);
    axios({
      method: "POST",
      headers: { userId: userId },
      url: URL_ACTIVITY_PARTICIPANTS,
      data: {
        userId,
        postId,
      },
    })
      .then((response) => {
        // console.log("set activity join:", !isJoin);
      })
      .catch((error) => {
        console.log("activity join error:", error);
      });
  } else {
    // activity'den ayrilma
    setParticipantsCount(participantsCount - 1);
    axios({
        method: "GET",
        headers: { userId: userId },
        url: URL_ACTIVITY_PARTICIPANTS,
        params: {
          userId,
          postId,
        },
      })
        .then((response) => {
        
            
            axios({
                method: "DELETE",
                headers: { userId: userId },
                url: URL_ACTIVITY_PARTICIPANTS+"/"+response.data.content[0].id,
              })
                .then((response) => {
                    console.log("set activity leave:", !isJoin);
                })
                .catch((error) => {
                  console.log("activity leave error2:", error);
                });


        })
        .catch((error) => {
          console.log("activity leave error1:", error);
        });
  }
};
