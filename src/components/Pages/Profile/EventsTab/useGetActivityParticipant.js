import {useState,useEffect} from 'react'
import axios from 'axios'
import {URL_ACTIVITY_PARTICIPANTS} from "../../../Contexts/Paths"


function useGetActivityParticipant(userId,pageNumber) {
 

    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(false)
    const [activityParticipants,setActivityParticipants]=useState([])
    const [hasMore,setHasMore]=useState(false)


    useEffect(()=>{
        // profil degisikliginde tab yeniden render, tab indexi degismez
        // index degisikligi ile veri cekimi tetiklenmesi saglanmaktaydi
        // bu sebeple eski veriler temizlenmiyordu, bu sekilde bir cozum bulduk
        // page numarası sıfırlama kısmı da profilepost area'da
        setActivityParticipants([])
    },[userId])

    useEffect(()=>{
        
        setLoading(true)
        setError(false)

        let cancel
        axios({
            method:"GET",
            url:URL_ACTIVITY_PARTICIPANTS,
            params:{
                userId:userId,
                page:pageNumber,
                size:5,
            },
            cancelToken: new axios.CancelToken(c=>cancel=c)
        }).then(response=>{
            setActivityParticipants(prevPosts=>{
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

    return {loading,error,activityParticipants,hasMore}
}

export default useGetActivityParticipant