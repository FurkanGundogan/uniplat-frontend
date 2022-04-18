import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";

import SignInPage from "./components/LoginRegister/SignInPage";
import SignUpPage from "./components/LoginRegister/SignUpPage";
import ParentHomePage from "./components/Pages/Home/ParentHomePage";
import ParentProfilePage from "./components/Pages/Profile/ParentProfilePage";
import ParentGroupPage from "./components/Pages/Group/ParentGroupPage";
import { useAuthState } from "./components/Contexts";

import ScrollToTop from "./components/Contexts/ScrollToTop";
import PostDetailsPage from "./components/Pages/PostDetails/PostDetailsPage";

import { ProfileContextProvider } from "./components/Pages/Profile/ProfileContext";
import ParentNotificationPage from "./components/Pages/Notifications/ParentNotificationPage";

import PostOriginalSizeImagePage from "./components/Pages/PostOriginalSizeImage/PostOriginalSizeImagePage";
import ParenSocialPage from "./components/Pages/Social/ParentSocialPage";
import { GroupContextProvider } from "./components/Pages/Group/GroupContext";
import { NewUniPostModalContextProvider } from "./components/Contexts/NewUniPostModalContext";
import { NewClubPostModalContextProvider } from "./components/Contexts/NewClubPostModalContext";

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
        <Route
          path="/:username/posts/:postid"
          element={
            <HomeRoute>
              <PostDetailsPage />
            </HomeRoute>
          }
          exact
        />
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
          path="/social"
          element={
            <HomeRoute>
              <ParenSocialPage />
            </HomeRoute>
          }
          exact
        />
        <Route
          path="/groups/:groupID"
          element={
            <HomeRoute>
              <GroupContextProvider>
                <NewClubPostModalContextProvider>
                  <ParentGroupPage />
                </NewClubPostModalContextProvider>
              </GroupContextProvider>
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
            path="/:username/posts/:postid/media"
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