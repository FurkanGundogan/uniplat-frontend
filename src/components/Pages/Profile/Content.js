import React, { useEffect,useState } from 'react'

import {GetContent} from "./ContentActions"

function Content({tab,userid,uniid,isAdmin}) {

  const [value,setValue]=useState("")

  useEffect(() => {
    setValue(GetContent(tab,userid,uniid,isAdmin))
  
  }, [tab,userid,uniid,isAdmin]) //eslint-disable-line
  


  return (
    <div>
      {value}
      
      </div>
  )
}

export default Content