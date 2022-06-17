import React, { useEffect,useState } from 'react'

import {getContent} from "./ContentActions"

function Content({tab,isAdmin}) {
  const [value,setValue]=useState("")

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