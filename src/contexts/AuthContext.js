import { createContext, useContext } from "react";

export const AuthContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
  signIn: () => {},
  signOut: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth는 반드시 AuthProvider 내부에서 사용되어야 합니다."
    );
  }

  return context;
};
