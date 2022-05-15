import {useState,useEffect} from 'react'
import axios from 'axios'
import {URL_SEARCH} from "../Contexts/Paths"


function useSearch(text,filters,pageNumber,setResults) {
    

    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(false)
    const [hasMore,setHasMore]=useState(false)
   

    
    useEffect(()=>{
    
        var str = text
        if(str!==""){
        str = str.trim().replace(/\s+/g, '&').toLowerCase();
        
        console.log(str);
        setLoading(true)
        setError(false)

        let cancel
        axios({
            method:"GET",
            url:URL_SEARCH,
            params:{
                text:str,
                filters:filters,
                page:0,
                size:10,
            },
            cancelToken: new axios.CancelToken(c=>cancel=c)
        }).then(response=>{
            setResults(response.data.content)
            setHasMore(response.data.content.length>0)
            setLoading(false)
            
        }).catch(error=>{
            if(axios.isCancel(error)) return
            setError(true)
        })
        return ()=>cancel()
    
 // eslint-disable-next-line 
    }else{
        setResults([])
    }
    // eslint-disable-next-line 
    },[pageNumber,text,filters])  

    return {loading,error,hasMore}
}

export default useSearch