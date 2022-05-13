import {useState,useEffect} from 'react'
import axios from 'axios'
import {URL_POSTS} from "../../Contexts/Paths"
import { useAuthState } from '../../Contexts';


function useGetPost(ownerId,postOwnerType,pageNumber,setPosts,click) {
 
    const mainState = useAuthState(); //read user details from context
   
    
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(false)
   
    const [hasMore,setHasMore]=useState(false)


    useEffect(()=>{
        // profil degisikliginde tab yeniden render, tab indexi degismez
        // index degisikligi ile veri cekimi tetiklenmesi saglanmaktaydi
        // bu sebeple eski veriler temizlenmiyordu, bu sekilde bir cozum bulduk
        // page numarası sıfırlama kısmı da profilepost area'da
        /*
        setPosts([])
        */
    },[ownerId])

    useEffect(()=>{
        
        setLoading(true)
        setError(false)

        let cancel
        axios({
            method:"GET",
            url:URL_POSTS,
            headers:{"userId":mainState.user.id},
            params:{
                ownerId:ownerId,
                postOwnerType:postOwnerType,
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
    },[ownerId,postOwnerType,pageNumber,mainState.user.id,click]) 

    return {loading,error,hasMore}
    
}

export default useGetPost