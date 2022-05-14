import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";

import SignInPage from "./components/LoginRegister/SignInPage";
import SignUpPage from "./components/LoginRegister/SignUpPage";
import ParentHomePage from "./components/Pages/Home/ParentHomePage";
import ParentProfilePage from "./components/Pages/Profile/ParentProfilePage";
import ParentClubPage from "./components/Pages/Club/ParentClubPage";
import { useAuthState } from "./components/Contexts";

import ScrollToTop from "./components/Contexts/ScrollToTop";
import PostDetailsPage from "./components/Pages/PostDetails/PostDetailsPage";

import { ProfileContextProvider } from "./components/Pages/Profile/ProfileContext";
import ParentNotificationPage from "./components/Pages/Notifications/ParentNotificationPage";

import PostOriginalSizeImagePage from "./components/Pages/PostOriginalSizeImage/PostOriginalSizeImagePage";
import ParenSocialPage from "./components/Pages/Social/ParentSocialPage";
import { ClubContextProvider } from "./components/Pages/Club/ClubContext";
import { NewUniPostModalContextProvider } from "./components/Contexts/NewUniPostModalContext";
import { NewClubPostModalContextProvider } from "./components/Contexts/NewClubPostModalContext";
import ParentSearchPage from "./components/Pages/Search/ParentSearchPage";

function HomeRoute({ children }) {
  // homepage'e gidebilmek için login olmak gerekiyor, yoksa login sayfasına yönlendirir.
  // bu / route'u için de geçerli
  const auth = useAuthState();

  console.log("auth:", auth);

  return auth.user ? children : <Navigate to="/SignIn" />;
}

function AlreadyLoggedInRoute({ children }) {
  // Giris yapmis kullanici, sign-in ve sign-up sayfalarına gitmeye çalışırsa home'a gönderilir
  const auth = useAuthState();
  console.log("auth:", auth);
  return auth.user ? <Navigate to="/Home" /> : children;
}

function AppWrapper() {
  const location = useLocation();

  let state = location.state;

  return (
    <ScrollToTop>
      <Routes location={state?.backgroundLocation || location}>
        <Route
          path="/"
          element={
            <HomeRoute>
              <ParentHomePage />
            </HomeRoute>
          }
          exact
        />

        <Route
          path="/Home"
          element={
            <HomeRoute>
              <ParentHomePage />
            </HomeRoute>
          }
          exact
        />
        <Route
          path="/SignIn"
          element={
            <AlreadyLoggedInRoute>
              <SignInPage />
            </AlreadyLoggedInRoute>
          }
          exact
        />
        <Route
          path="/SignUp"
          element={
            <AlreadyLoggedInRoute>
              <SignUpPage />
            </AlreadyLoggedInRoute>
          }
          exact
        />
        <Route
          path="/:userid"
          element={
            <HomeRoute>
              <ProfileContextProvider>
                <NewUniPostModalContextProvider>
                  <ParentProfilePage />
                </NewUniPostModalContextProvider>
              </ProfileContextProvider>
            </HomeRoute>
          }
          exact
        />
        <Route
          path="/uni/:uniid"
          element={
            <HomeRoute>
              <ProfileContextProvider>
                <NewUniPostModalContextProvider>
                  <ParentProfilePage />
                </NewUniPostModalContextProvider>
              </ProfileContextProvider>
            </HomeRoute>
          }
          exact
        />
        {
         // burada club için club context
         // user ve university için profile context verillmekte
        <Route
          path="/club/:ownerId/posts/:postid"
          element={
            <HomeRoute>
              <ClubContextProvider>
                  <PostDetailsPage />
              </ClubContextProvider>
            </HomeRoute>
          }
          exact
        />
        }
        {
        <Route
          path="/user/:ownerId/posts/:postid"
          element={
            <HomeRoute>
              <ProfileContextProvider>
                  <PostDetailsPage />
              </ProfileContextProvider>
            </HomeRoute>
          }
          exact
        />
        }
        {
        <Route
          path="/university/:ownerId/posts/:postid"
          element={
            <HomeRoute>
              <ProfileContextProvider>
                  <PostDetailsPage />
              </ProfileContextProvider>
            </HomeRoute>
          }
          exact
        />
      }
        <Route
          path="/notifications"
          element={
            <HomeRoute>
              <ParentNotificationPage />
            </HomeRoute>
          }
          exact
        />
        <Route
          path="/search"
          element={
            <HomeRoute>
              <ParentSearchPage />
            </HomeRoute>
          }
          exact
        />
        <Route
          path="/social"
          element={
            <HomeRoute>
              <ParenSocialPage />
            </HomeRoute>
          }
          exact
        />
        <Route
          path="/clubs/:clubID"
          element={
            <HomeRoute>
              <ClubContextProvider>
                <NewClubPostModalContextProvider>
                  <ParentClubPage />
                </NewClubPostModalContextProvider>
              </ClubContextProvider>
            </HomeRoute>
          }
          exact
        />
        <Route
          path="*"
          element={
            <HomeRoute>
              <ParentHomePage />
            </HomeRoute>
          }
          exact
        />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/:ownerType/:ownerId/posts/:postid/media/:imgId"
            element={
              <HomeRoute>
                <PostOriginalSizeImagePage />
              </HomeRoute>
            }
          />
   
        </Routes>
      )}
    </ScrollToTop>
  );
}

export default AppWrapper;
