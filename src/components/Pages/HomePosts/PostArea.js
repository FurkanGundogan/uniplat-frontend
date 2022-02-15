import React from 'react'
import PostCard from './PostCard'
import PostAreaStyles from './PostAreaStyles'
function PostArea() {
    const classes= PostAreaStyles();
    const staticposts=[
      {
        type:"Post",
        owner:"Furkan Gundogan",
        createdAt:"2022-02-19T12:25:00.000Z",
        img:"https://mui.com/static/images/cards/contemplative-reptile.jpg",
        text:"This impressive paella is a perfect party dish"+
        "and a fun meal to cook together with your guests. "+
        "Add 1 cup of frozen peas along with the mussels, if you like.",
        likeCount:"1.2K",
        commentCount:"985",
        shareCount:"55",
      },
      {
        type:"Post",
        owner:"Ahmet Ak",
        createdAt:"2022-04-12T15:45:00.000Z",
        img:"https://mui.com/static/images/cards/paella.jpg",
        text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."+
        " Cras cursus ac eros vel vestibulum.",
        likeCount:"2.4K",
        commentCount:"85",
        shareCount:"5",
      },
      {
        type:"Event",
        owner:"Fatih Sultan Mehmet Vakıf Üniversitesi",
        createdAt:"2022-03-01T07:25:00.000Z",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOodp4MeNCnKhF5ztWX6a0JMx5Ly5FX-owgg&usqp=CAU",
        text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."+
        " Cras cursus ac eros vel vestibulum.",
        likeCount:"4.5K",
        commentCount:"456",
        shareCount:"35",
        eventDetails:{
          eventDate:"2022-04-21T16:30:00.000Z",
          participantCount:1222,
          eventAddress:"FSVMÜ Haliç Kampüsü"
        }
      },
    ]
  return (
    <div className={classes.PostAreaWrapper}>
      {
        staticposts.map((p,i) => <PostCard key={i} post={p}/>)
      }
    </div>
  )
}

export default PostArea