import React, { useEffect,useState } from 'react'

import {GetContent} from "./ContentActions"

function Content({tab,userid,uniid}) {

  const [value,setValue]=useState("")

  useEffect(() => {
    setValue(GetContent(tab,userid,uniid))
  
  }, [tab]) //eslint-disable-line
  


  return (
    <div>
      {value}
      
      </div>
  )
}

export default Content