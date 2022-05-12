import {useState,useEffect} from 'react'
import axios from 'axios'
import {URL_USERFOLLOWS} from "../../../Contexts/Paths"
import { useAuthState } from '../../../Contexts';


function UseGetFollows(ownerId,pageNumber) {
 
    const mainState = useAuthState(); //read user details from context
   

    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(false)
    const [follows,setFollows]=useState([])
    const [hasMore,setHasMore]=useState(false)


    useEffect(()=>{
        setFollows([])
    },[ownerId])

    useEffect(()=>{
        
        setLoading(true)
        setError(false)

        let cancel
        axios({
            method:"GET",
            url:URL_USERFOLLOWS,
            headers:{"userId":mainState.user.id},
            params:{
                userId:ownerId,
                page:pageNumber,
                size:5,
            },
            cancelToken: new axios.CancelToken(c=>cancel=c)
        }).then(response=>{
            setFollows(prevPosts=>{
                return [...prevPosts,...response.data.content]
            })
            setHasMore(response.data.content.length>0)
            setLoading(false)
            
        }).catch(error=>{
            if(axios.isCancel(error)) return
            setError(true)
        })
        return ()=>cancel()
    

    },[ownerId,pageNumber,mainState.user.id]) 

    return {loading,error,follows,hasMore}
}

export default UseGetFollows