import axios from 'axios'
import { URL_USER_LIKED_POSTS } from '../../Contexts/Paths'

// backend like isteğini toggle edecek şekilde olduğu için
// burada da tek istekle like durumunu toggle edebiliyoruz.

export const likeToggle = (userId,postId,isLiked,setIsLiked,likeCount,setLikeCount) => {
    
    if(isLiked===false)setLikeCount(likeCount+1)
    else setLikeCount(likeCount-1)
    
    setIsLiked(!isLiked)
    axios({
        method:"POST",
        headers:{"userId":userId},
        url:URL_USER_LIKED_POSTS,
        data:{
            userId,
            postId
        },
    }).then(response=>{
        console.log("set begenme:",!isLiked)
        
    }).catch(error=>{
        console.log("begenme sorunu:",error)
    })

   
}

