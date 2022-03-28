import React from "react";
import { useReducer } from "react";
import { initialState, AuthReducer } from "./reducer";

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

export function useAuthState() {
  const context = React.useContext(AuthStateContext);
  // Alttaki mycontext: Telden tasarima girebilmek icin auth bariyerini geçmeyi sagliyor,
  // return mycontext olarak çevir
  
  const mycontext = {
    user: {
      email: "fru@stu.fsm.edu.tr",
      gender: "MALE",
      name: "furkan",
      password: "123123",
      surname: "gundogan",
      type: "STUDENT",
    },
  }
  
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }

  return mycontext;
}

export function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
   // Alttaki mycontext: Telden tasarima girebilmek icin auth bariyerini geçmeyi sagliyor,
  // return mycontext olarak çevir
  
  const mycontext = {
    user: {
      email: "fru@stu.fsm.edu.tr",
      gender: "MALE",
      name: "furkan",
      password: "123123",
      surname: "gundogan",
      type: "STUDENT",
    },
  }
  
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }

  return mycontext;
}

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
