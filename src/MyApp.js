import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/Contexts";

import { NewPostModalContextProvider } from "./components/Contexts/NewPostModalContext";

import { PostsContextProvider } from "./components/Pages/HomePosts/PostsContext";

import AppWrapper from "./AppWrapper";
import { UserExtraInfoContextProvider } from "./components/Contexts/UserExtraInfoContext";

function MyApp() {
  return (
    <AuthProvider>
      <UserExtraInfoContextProvider>
        <NewPostModalContextProvider>
          <PostsContextProvider>
            <BrowserRouter>
              <AppWrapper />
            </BrowserRouter>
          </PostsContextProvider>
        </NewPostModalContextProvider>
      </UserExtraInfoContextProvider>
    </AuthProvider>
  );
}

export default MyApp;
