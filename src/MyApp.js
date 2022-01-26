import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./components/Contexts";
import SignInPage from "./components/LoginRegister/SignInPage";
import SignUpPage from "./components/LoginRegister/SignUpPage";
import HomePage from "./components/HomePage/HomePage";
import { useAuthState } from "./components/Contexts";
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

function MyApp() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HomeRoute>
                <HomePage />
              </HomeRoute>
            }
            exact
          />

          <Route
            path="/Home"
            element={
              <HomeRoute>
                <HomePage />
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
            path="*"
            element={
              <HomeRoute>
                <HomePage />
              </HomeRoute>
            }
            exact
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default MyApp;
