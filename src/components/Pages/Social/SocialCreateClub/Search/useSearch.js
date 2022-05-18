import {useState,useEffect} from 'react'
import axios from 'axios'
import {URL_SEARCH} from "../../../../Contexts/Paths"


function useSearch(text,filters,pageNumber,size,setResults) {


    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(false)
    const [hasMore,setHasMore]=useState(false)
    const [page,setPage]=useState()

    
    useEffect(()=>{
    
        var str = text
        if(str!=="" && str!==null && str!==undefined){
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
                page:pageNumber,
                size:size,
            },
            cancelToken: new axios.CancelToken(c=>cancel=c)
        }).then(response=>{
            console.log("gelenler:",response.data.content)
            setResults(prev=>[...prev,...response.data.content])
            setPage(response.data.page)
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
    },[pageNumber,text,filters,size])  

    return {loading,error,hasMore,page}
}

export default useSearch