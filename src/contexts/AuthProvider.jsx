import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import AuthService from "../apis/auth";

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { getUserInfo, refreshAccessToken, redirectGoogleLogin } = AuthService;

  const signIn = () => {
    redirectGoogleLogin();
  };

  const signOut = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    setCurrentUser(null);
  };

  useEffect(() => {
    let accessToken = localStorage.getItem("access-token");
    const refreshToken = localStorage.getItem("refresh-token");
    if (!accessToken && !refreshToken) return;

    //accessToken이 있다면 유저정보를 가져오고, 없다면 refresh token으로 accessToken을 갱신하고 유저정보를 가져옵니다.
    //둘다 없다면 아무것도 하지 않습니다.

    (async () => {
      if (!accessToken && refreshToken) {
        const { accessToken: newToken } =
          await refreshAccessToken(refreshToken);

        accessToken = newToken;
        localStorage.setItem("access-token", newToken);
      }

      const userData = await getUserInfo(accessToken);
      setCurrentUser(userData);
    })();
  }, [getUserInfo, refreshAccessToken]);

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
