import React from "react";
import {
  BrowserRouter,
} from "react-router-dom";
import { AuthProvider } from "./components/Contexts";


import { NewPostModalContextProvider } from "./components/Contexts/NewPostModalContext";

import { PostsContextProvider } from "./components/Pages/HomePosts/PostsContext";



import AppWrapper from "./AppWrapper";



function MyApp() {
  
  return (
    <AuthProvider>
      <NewPostModalContextProvider>
        
          <PostsContextProvider>
            <BrowserRouter>
              <AppWrapper/>
            </BrowserRouter>
          </PostsContextProvider>
        
      </NewPostModalContextProvider>
    </AuthProvider>
  );
}

export default MyApp;
