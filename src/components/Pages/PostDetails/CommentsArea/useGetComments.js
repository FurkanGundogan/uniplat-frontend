import {useState,useEffect} from 'react'
import axios from 'axios'
import {URL_POST_COMMENTS} from "../../../Contexts/Paths"


function useGetComments(postId,pageNumber) {
    

    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(false)
    const [comments,setComments]=useState([])
    const [hasMore,setHasMore]=useState(false)


    useEffect(()=>{
        setComments([])
    },[postId])

    useEffect(()=>{
        
        setLoading(true)
        setError(false)

        let cancel
        axios({
            method:"GET",
            url:URL_POST_COMMENTS,
            params:{
                postId:postId,
                page:pageNumber,
                size:5,
            },
            cancelToken: new axios.CancelToken(c=>cancel=c)
        }).then(response=>{
            setComments(prevPosts=>{
                return [...prevPosts,...response.data.content]
            })
            setHasMore(response.data.content.length>0)
            setLoading(false)
            
        }).catch(error=>{
            if(axios.isCancel(error)) return
            setError(true)
        })
        return ()=>cancel()
    

    },[postId,pageNumber]) 

    return {loading,error,comments,setComments,hasMore}
}

export default useGetComments