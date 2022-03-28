import React, { createContext } from 'react'
import { useState } from 'react'
export const NewUniPostModalContext = createContext()

export const NewUniPostModalContextProvider = ({ children }) => {
  const [newUniPostState, setNewUniPostState] = useState({type:"Post",isOpen:false,selectedFile:null})

  const value = {
    newUniPostState,
    setNewUniPostState

  }

  return <NewUniPostModalContext.Provider value={value}>{children}</NewUniPostModalContext.Provider>
}