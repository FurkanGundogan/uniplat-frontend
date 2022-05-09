import axios from 'axios'
import { URL_USER_LIKED_POSTS } from '../../Contexts/Paths'
export const likeToggle = (userId,postId,isLiked,setIsLiked,likeCount,setLikeCount) => {
    if(isLiked===false){
        axios({
            method:"POST",
            headers:{"userId":userId},
            url:URL_USER_LIKED_POSTS,
            data:{
                userId,
                postId
            },
            
        }).then(response=>{
            console.log("begenme:",response)
            setIsLiked(true)
            setLikeCount(likeCount+1)
        }).catch(error=>{
            console.log("begenme sorunu:",error)
        })
    }else{
        axios({
            method:"GET",
            headers:{"userId":userId},
            url:URL_USER_LIKED_POSTS,
            params:{
                userId,
                postId
            },
            
        }).then(response=>{
            console.log("diskle oncesi begenme state:",response)
            axios({
                method:"DELETE",
                headers:{"userId":userId},
                url:URL_USER_LIKED_POSTS+"/"+response.data.content[0].id,
            }).then(response=>{
                console.log("dislike:",response)
                setIsLiked(false)
                setLikeCount(likeCount-1)
            }).catch(error=>{
                console.log("dislike sorunu:",error)
            })
            setIsLiked(true)
        }).catch(error=>{
            console.log("begenme sorunu:",error)
        })
    }

   
}

