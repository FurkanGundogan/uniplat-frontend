import React, { createContext } from 'react'
import { useState } from 'react'
export const NewPostModalContext = createContext()

export const NewPostModalContextProvider = ({ children }) => {
  const [newPostState, setNewPostState] = useState({type:"Post",isOpen:false,selectedFile:null})

  const value = {
    newPostState,
    setNewPostState

  }

  return <NewPostModalContext.Provider value={value}>{children}</NewPostModalContext.Provider>
}