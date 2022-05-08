import {useState,useEffect} from 'react'
import axios from 'axios'
import {URL_POSTFLOWS} from "../../Contexts/Paths"


function useGetPostFlow(userId,pageNumber) {
    
  
    console.log(userId,pageNumber)

    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(false)
    const [posts,setPosts]=useState([])
    const [hasMore,setHasMore]=useState(false)
    console.log("flowdakiler:",posts)

    useEffect(()=>{
        setPosts([])
    },[userId])

    useEffect(()=>{
        
        setLoading(true)
        setError(false)

        let cancel
        axios({
            method:"GET",
            headers:{"userId":userId},
            url:URL_POSTFLOWS,
            params:{
                page:pageNumber,
                size:5,
            },
            cancelToken: new axios.CancelToken(c=>cancel=c)
        }).then(response=>{
            setPosts(prevPosts=>{
                return [...prevPosts,...response.data.content]
            })
            setHasMore(response.data.content.length>0)
            setLoading(false)
            
        }).catch(error=>{
            if(axios.isCancel(error)) return
            setError(true)
        })
        return ()=>cancel()
    

    },[userId,pageNumber]) 

    return {loading,error,posts,hasMore}
}

export default useGetPostFlow