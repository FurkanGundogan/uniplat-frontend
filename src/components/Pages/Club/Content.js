import React, { useEffect,useState } from 'react'

import {getContent} from "./ContentActions"

function Content({tab,isAdmin}) {
  const [value,setValue]=useState("")
  console.log("isAdmin conent",isAdmin)
  useEffect(() => {
    setValue(getContent(tab,isAdmin))
  
  }, [tab,isAdmin])
  


  return (
    <div>
      {value}
      
      </div>
  )
}

export default Content