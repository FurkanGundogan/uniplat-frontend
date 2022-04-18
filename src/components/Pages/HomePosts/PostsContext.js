import React, { createContext } from 'react'
import { useState } from 'react'
// burada ve ProfileContext'de aynı data var
export const data=[
    {
      id:"postid1",
      type:"Post",
      owner:"1346fd43-e551-4eed-807a-0904c786393f",
      owner_name:"Furkan Gundogan",
      createdAt:"2022-02-19T12:25:00.000Z",
      img:"https://www.casper.com.tr/uploads/2021/02/wallpaper-3.jpg",
      text:"This impressive paella is a perfect party dish"+
      "and a fun meal to cook together with your guests. "+
      "Add 1 cup of frozen peas along with the mussels, if you like.",
      likeCount:"1.2K",
      commentCount:"985",
      shareCount:"55",
      comments:[{
        c_id:"c1",
        username:"Mehmet Sarı",
        comment_text:"Harika !!!",
      },{
        c_id:"c2",
        username:"Ahmet Ak",
        comment_text:"This impressive paella is a perfect",
      }
    ],
    isLiked:false,
    },
    {
      id:"postid2",
      type:"Post",
      owner:"ahmetak",
      owner_name:"Ahmet Ak",
      createdAt:"2022-04-12T15:45:00.000Z",
      img:"https://i.pinimg.com/originals/cf/2e/a8/cf2ea86518efd2e38f7b1e44ab108cd4.png",
      text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."+
      " Cras cursus ac eros vel vestibulum.",
      likeCount:"2.4K",
      commentCount:"85",
      shareCount:"5",
      comments:[
        {
          c_id:"c3",
          username:"Furkan Gundogan",
          comment_text:"Çok iyi !!!",
        }
      ],
      isLiked:false,
    },
    {
      id:"postid3",
      type:"Event",
      owner:"b45bbe98-178f-4fd1-b49d-3663c1fce92e",
      owner_name:"Fatih Sultan Mehmet Vakıf Üniversitesi",
      createdAt:"2022-03-01T07:25:00.000Z",
      img:"https://skitguys.com/media/images/video/Light_Flares_Upcoming_Still_LSM-HD.jpg",
      text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."+
      " Cras cursus ac eros vel vestibulum.",
      likeCount:"4.5K",
      commentCount:"456",
      shareCount:"35",
      eventDetails:{
        eventDate:"2022-04-21T16:30:00.000Z",
        participantCount:1222,
        eventAddress:"FSVMÜ Haliç Kampüsü"
      },
      comments:[],
      isLiked:false,
    },
    {
      id:"postid4",
      type:"Post",
      owner:"b45bbe98-178f-4fd1-b49d-3663c1fce92e",
      owner_name:"Fatih Sultan Mehmet Vakıf Üniversitesi",
      createdAt:"2022-03-01T07:25:00.000Z",
      img:"https://mobilehd.blob.core.windows.net/main/2016/09/berries-food-table-wallpaper.jpg",
      text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."+
      " Cras cursus ac eros vel vestibulum.",
      likeCount:"4.2K",
      commentCount:"426",
      shareCount:"33",
      comments:[],
      isLiked:false,
    },
    {
      id:"postid5",
      type:"Post",
      owner:"ahmetak",
      owner_name:"Ahmet Ak",
      createdAt:"2022-03-01T07:25:00.000Z",
      img:"",
      text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."+
      " Cras cursus ac eros vel vestibulum.",
      likeCount:"1.2K",
      commentCount:"226",
      shareCount:"16",
      comments:[],
      isLiked:false,
      innerPost:
      {
        id:"postid1",
        type:"Post",
        owner:"1346fd43-e551-4eed-807a-0904c786393f",
        owner_name:"Furkan Gundogan",
        createdAt:"2022-02-19T12:25:00.000Z",
        img:"https://www.casper.com.tr/uploads/2021/02/wallpaper-3.jpg",
        text:"This impressive paella is a perfect party dish"+
        "and a fun meal to cook together with your guests. "+
        "Add 1 cup of frozen peas along with the mussels, if you like.",
        likeCount:"1.2K",
        commentCount:"985",
        shareCount:"55",
        comments:[{
          c_id:"c1",
          username:"Mehmet Sarı",
          comment_text:"Harika !!!",
        },{
          c_id:"c2",
          username:"Ahmet Ak",
          comment_text:"This impressive paella is a perfect",
        }
      ],
      isLiked:false,
      }
      
    },
  ]

export const PostsContext = createContext()

export const PostsContextProvider = ({ children }) => {
  const [postsState, setpostsState] = useState({posts:data})

  const value = {
    postsState,
    setpostsState

  }

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
}