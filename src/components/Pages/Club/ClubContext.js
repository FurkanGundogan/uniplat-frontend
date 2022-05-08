import React, { useState, createContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuthState } from "../../Contexts";
import {
  URL_CLUBS,
  URL_UNIVERSITIES,
  URL_USERFOLLOWS,
} from "../../Contexts/Paths";
// burada ve PostContext'de aynı data var
export const data = [
  {
    id: "postid1",
    type: "Post",
    owner: "furkangundogan",
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
    owner: "fatihsultanmehmetvakifuniversitesi",
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
    owner: "fatihsultanmehmetvakifuniversitesi",
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
      owner: "furkangundogan",
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

export const clubInfo = {
  id: "",
  name: "",
  universityId: "",
  adminId: "",
  version: 0,
};

export const clubUniInfo = {
  id: "",
  name: "",
};

export const clubUsers = [];

export const ClubContext = createContext();

export const ClubContextProvider = ({ children }) => {
  const mainState = useAuthState(); //read user details from context
  const [clubState, setClubState] = useState({
    clubInfo: clubInfo,
    clubUniInfo: clubUniInfo,
    posts: data,
    clubUsers: clubUsers,
    isMember: false,
  });
  const { clubID } = useParams();
  const value = {
    clubState,
    setClubState,
  };


  useEffect(() => {
    const setClubInfo = async () => {
      await axios
        .get(URL_CLUBS + "/" + clubID,{headers:{"userId":mainState.user.id}})
        .then((response) => {
          console.log("setclubinfo: ", response.data);
          setClubState({ ...clubState, clubInfo: response.data });
        })
        .catch((e) => {
          console.log("club-info-get-error");
        });
    };

    if (clubID !== undefined) {
      setClubInfo();
    }
  }, [clubID]); //eslint-disable-line

  // user uni bilgisi için istek

  useEffect(() => {
    const setClubUniInfo = async () => {
      await axios
        .get(URL_UNIVERSITIES + "/" + clubState.clubInfo.universityId,{headers:{"userId":mainState.user.id}})
        .then((response) => {
          console.log("setClubUniInfo: ", response.data);
          setClubState({ ...clubState, clubUniInfo: response.data });
        })
        .catch((e) => {
          console.log("profile-user-Uni-info-get-error");
        });
    };
    if (clubID !== undefined && clubState.clubInfo.universityId !== "") {
      setClubUniInfo();
    }
  }, [clubState.clubInfo]); //eslint-disable-line

  // club users
  // count gelince burada memberları çekmeye gerek kalmayacak
  // memberlar taba geçince zaten getiriliyor
  useEffect(() => {
    const setClubUsers = async () => {
      await axios({
        method: "GET",
        url: URL_USERFOLLOWS,
        params: {
          followId: clubID,
        },
      })
        .then((response) => {
          console.log("setClubUsers: ", response.data.content);
          setClubState({ ...clubState, clubUsers: response.data.content });
        })
        .catch((e) => {
          console.log("club-users-get-error");
        });
    };
    if (clubID !== undefined && clubState.clubUniInfo.id !== "") {
      setClubUsers();
    }
  }, [clubState.clubUniInfo]); //eslint-disable-line

  useEffect(() => {
    const setIsMember = () => {
      let item = clubState.clubUsers.filter((element) => {
        return element.userId === mainState.user.id;
      });
      if (item.length === 1) {
        console.log("item: ", item);
        setClubState({ ...clubState, isMember: true, memberShip: item });
      }
    };
    if (clubID !== undefined && clubState.clubUsers !== []) {
      setIsMember();
    }
  }, [clubState.clubUsers]); //eslint-disable-line

  return <ClubContext.Provider value={value}>{children}</ClubContext.Provider>;
};
