import React, { createContext } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  URL_UNIVERSITIES,
  URL_USERS,
  URL_USERFOLLOWS,
  SIZE,
} from "../../Contexts/Paths";
import { useAuthState } from "../../Contexts";

// burada ve PostContext'de aynı data var
export const data = [
  {
    id: "postid1",
    type: "Post",
    owner: "1346fd43-e551-4eed-807a-0904c786393f",
    owner_name: "Furkan Gundogan",
    createdAt: "2022-02-19T12:25:00.000Z",
    img: "https://www.casper.com.tr/uploads/2021/02/wallpaper-3.jpg",
    text:
      "This impressive paella is a perfect party dish" +
      "and a fun meal to cook together with your guests. " +
      "Add 1 cup of frozen peas along with the mussels, if you like.",
    likeCount: "1.2K",
    commentCount: "985",
    shareCount: "55",
    comments: [
      {
        c_id: "c1",
        username: "Mehmet Sarı",
        comment_text: "Harika !!!",
      },
      {
        c_id: "c2",
        username: "Ahmet Ak",
        comment_text: "This impressive paella is a perfect",
      },
    ],
    isLiked: false,
  },
  {
    id: "postid2",
    type: "Post",
    owner: "ahmetak",
    owner_name: "Ahmet Ak",
    createdAt: "2022-04-12T15:45:00.000Z",
    img: "https://i.pinimg.com/originals/cf/2e/a8/cf2ea86518efd2e38f7b1e44ab108cd4.png",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
      " Cras cursus ac eros vel vestibulum.",
    likeCount: "2.4K",
    commentCount: "85",
    shareCount: "5",
    comments: [
      {
        c_id: "c3",
        username: "Furkan Gundogan",
        comment_text: "Çok iyi !!!",
      },
    ],
    isLiked: false,
  },
  {
    id: "postid3",
    type: "Event",
    owner: "b45bbe98-178f-4fd1-b49d-3663c1fce92e",
    owner_name: "Fatih Sultan Mehmet Vakıf Üniversitesi",
    createdAt: "2022-03-01T07:25:00.000Z",
    img: "https://skitguys.com/media/images/video/Light_Flares_Upcoming_Still_LSM-HD.jpg",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
      " Cras cursus ac eros vel vestibulum.",
    likeCount: "4.5K",
    commentCount: "456",
    shareCount: "35",
    eventDetails: {
      eventDate: "2022-04-21T16:30:00.000Z",
      participantCount: 1222,
      eventAddress: "FSVMÜ Haliç Kampüsü",
    },
    comments: [],
    isLiked: false,
  },
  {
    id: "postid4",
    type: "Post",
    owner: "b45bbe98-178f-4fd1-b49d-3663c1fce92e",
    owner_name: "Fatih Sultan Mehmet Vakıf Üniversitesi",
    createdAt: "2022-03-01T07:25:00.000Z",
    img: "https://mobilehd.blob.core.windows.net/main/2016/09/berries-food-table-wallpaper.jpg",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
      " Cras cursus ac eros vel vestibulum.",
    likeCount: "4.2K",
    commentCount: "426",
    shareCount: "33",
    comments: [],
    isLiked: false,
  },
  {
    id: "postid5",
    type: "Post",
    owner: "ahmetak",
    owner_name: "Ahmet Ak",
    createdAt: "2022-03-01T07:25:00.000Z",
    img: "",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
      " Cras cursus ac eros vel vestibulum.",
    likeCount: "1.2K",
    commentCount: "226",
    shareCount: "16",
    comments: [],
    isLiked: false,
    innerPost: {
      id: "postid1",
      type: "Post",
      owner: "1346fd43-e551-4eed-807a-0904c786393f",
      owner_name: "Furkan Gundogan",
      createdAt: "2022-02-19T12:25:00.000Z",
      img: "https://www.casper.com.tr/uploads/2021/02/wallpaper-3.jpg",
      text:
        "This impressive paella is a perfect party dish" +
        "and a fun meal to cook together with your guests. " +
        "Add 1 cup of frozen peas along with the mussels, if you like.",
      likeCount: "1.2K",
      commentCount: "985",
      shareCount: "55",
      comments: [
        {
          c_id: "c1",
          username: "Mehmet Sarı",
          comment_text: "Harika !!!",
        },
        {
          c_id: "c2",
          username: "Ahmet Ak",
          comment_text: "This impressive paella is a perfect",
        },
      ],
      isLiked: false,
    },
  },
];

export const groups = [
  {
    id: "1",
    name: "Test Group",
    uni: "fatihsultanmehmetvakifuniversitesi",
  },
  {
    id: "2",
    name: "XYZ Group",
    uni: "fatihsultanmehmetvakifuniversitesi",
  },
];

export const userInfo = {
  id: "",
  name: "",
  surname: "",
  gender: "",
  birthDate: "2022-04-15T11:44:30.204Z",
  universityId: "",
  type: "",
  description: "",
  profileImgId: "",
  messageAccessed: true,
  version: 0,
};

export const userUniInfo = {
  id: "",
  name: "",
};

export const followers = [];

export const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {

  const [profileState, setProfileState] = useState({
    userInfo: userInfo,
    userUniInfo: userUniInfo,
    posts: data,
    groups: groups,
    isFollow: false,
  });
  // profil's followers seperated another state
  const [profileFollowers, setProfileFollowers] = useState();
  const [profileFollows, setProfileFollows] = useState();
  const [posts,setPosts]=useState([])
  const [pageNumber, setPageNumber] = useState(0);
  const [click, setClick] = useState(0);

  const value = {
    profileState,
    setProfileState,
    profileFollowers,
    setProfileFollowers,
    profileFollows,
    setProfileFollows,
    posts,
    setPosts,
    pageNumber,
    setPageNumber,
    click, setClick,
  };

  // user bilgileri için istek
  const { userid } = useParams();
  const { uniid } = useParams();

  const mainState = useAuthState(); //read user details from context

  useEffect(() => {
    const setUserInfo = async () => {
      await axios
        .get(URL_USERS + "/" + userid, { headers:{"userId":mainState.user.id} })
        .then((response) => {
          setProfileState({profileState,userInfo: response.data });
        })
        .catch((e) => {
          console.log("profile-user-info-get-error");
        });
    };
    if (userid !== undefined) {
      setUserInfo();
    }
  }, [userid]); //eslint-disable-line

  // user uni bilgisi için istek

  useEffect(() => {
    const setUserUniInfo = async () => {
      await axios
        .get(URL_UNIVERSITIES + "/" + profileState.userInfo.universityId,{ headers:{"userId":mainState.user.id} })
        .then((response) => {
          setProfileState({ ...profileState, userUniInfo: response.data });
        })
        .catch((e) => {
          console.log("profile-user-Uni-info-get-error");
        });
    };
    if (userid !== undefined && profileState.userInfo.universityId !== "") {
      setUserUniInfo();
    } else {
      setProfileState({ ...profileState, userUniInfo: null });
    }
  }, [profileState.userInfo]); //eslint-disable-line

  // uni/id   uni profil sayfasi ise veri getirme

  useEffect(() => {
    const setInfoAsUni = async () => {
      await axios
        .get(URL_UNIVERSITIES + "/" + uniid,{ headers:{"userId":mainState.user.id} })
        .then((response) => {
          setProfileState({ ...profileState, userInfo: response.data });
        })
        .catch((e) => {
          console.log("Uni-profil-get-error");
        });
    };
    if (uniid !== undefined) {
      setInfoAsUni();
    }
  }, [uniid]); //eslint-disable-line

  // get  followers
  useEffect(() => {

    const setUniFollowers = async () => {
      
      // get followers
        await axios({
          method:"GET",
          url:URL_USERFOLLOWS,
          params:{
              followId:(userid?userid:uniid),
              size:SIZE,
          }
      }).then((response) => {
          
          setProfileFollowers(response.data.content);
        })
        .catch((e) => {
          console.log("profile-followers-get-error");
        });
    };
    if (
      profileState.userInfo.id !== "" &&
      (uniid !== undefined) | (userid !== undefined)
    ) {
      setUniFollowers();
    }
  }, [profileState.userInfo]); //eslint-disable-line


  //

  //// follows of user
  /// takip ettiği kulllanıcılar
  // üsttekiler silinebilir
  useEffect(() => {
    const setUserFollows = async () => {
        await axios({
          method:"GET",
          url:URL_USERFOLLOWS,
          params:{
              userId:userid,
              size:SIZE,
          }
      }).then((response) => {
          setProfileFollows(response.data.content);
        })
        .catch((e) => {
          console.log("profile-user-follows-get-error");
        });
    };
    if (userid !== undefined) {
      setUserFollows();
    }
  }, [userid]); //eslint-disable-line

  return (
    <ProfileContext.Provider value={value}>
      {children}
      </ProfileContext.Provider>
  );
};
