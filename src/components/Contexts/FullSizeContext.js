import React, { createContext } from 'react'
import { useState } from 'react'
export const FullSizeContext = createContext()

export const FullSizeContextProvider = ({ children }) => {
  const [fullSize, setFullSize] = useState({img:"",isOpen:false})

  const value = {
    fullSize,
    setFullSize

  }

  return <FullSizeContext.Provider value={value}>{children}</FullSizeContext.Provider>
}