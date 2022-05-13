import {useState,useEffect} from 'react'
import axios from 'axios'
import {URL_POSTFLOWS} from "../../Contexts/Paths"


function useGetPostFlow(userId,pageNumber,setPosts,click) {
    

    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(false)
    
    const [hasMore,setHasMore]=useState(false)
   

    useEffect(()=>{
        /*
        setPosts([])
        */
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
    
 // eslint-disable-next-line 
    },[userId,pageNumber,click])  

    return {loading,error,hasMore}
}

export default useGetPostFlow