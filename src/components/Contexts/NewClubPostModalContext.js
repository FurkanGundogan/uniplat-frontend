import React, { createContext } from 'react'
import { useState } from 'react'
export const NewClubPostModalContext = createContext()

export const NewClubPostModalContextProvider = ({ children }) => {
  const [newClubPostState, setNewClubPostState] = useState({type:"Post",isOpen:false,selectedFile:null})

  const value = {
    newClubPostState,
    setNewClubPostState

  }

  return <NewClubPostModalContext.Provider value={value}>{children}</NewClubPostModalContext.Provider>
}