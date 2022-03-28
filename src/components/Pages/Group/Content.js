import React, { useEffect,useState } from 'react'

import {getContent} from "./ContentActions"

function Content({tab}) {

  const [value,setValue]=useState("")

  useEffect(() => {
    setValue(getContent(tab))
  
  }, [tab])
  


  return (
    <div>
      {value}
      
      </div>
  )
}

export default Content