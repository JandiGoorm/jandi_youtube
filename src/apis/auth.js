import axios from "axios";
import { clientID, clientSecret, redirectURI } from "../constants/config";

const authAPI = axios.create({
  baseURL: "https://oauth2.googleapis.com/",
});

const redirectGoogleLogin = () => {
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=code&scope=email profile https://www.googleapis.com/auth/youtube.readonly`;
};

const exchangeCodeWithToken = async (code) => {
  try {
    const { data } = await authAPI.post("/token", {
      code,
      client_id: clientID,
      client_secret: clientSecret,
      redirect_uri: redirectURI,
      grant_type: "authorization_code",
    });

    if (!data.access_token || !data.refresh_token) {
      throw new Error("토큰 교환 실패 : not access_token or refresh_token");
    }
    return { accessToken: data.access_token, refreshToken: data.refresh_token };
  } catch (err) {
    console.log("토큰 교환 에러", err);
  }
};

const refreshAccessToken = async (refreshToken) => {
  try {
    const { data } = await authAPI.post("/token", {
      refresh_token: refreshToken,
      client_id: clientID,
      client_secret: clientSecret,
      grant_type: "refresh_token",
    });

    if (!data.access_token) {
      throw new Error("액세스 토큰 갱신 실패 : not access_token");
    }

    return { accessToken: data.access_token };
  } catch (err) {
    console.log("액세스 토큰 갱신 에러", err);
  }
};

const AuthService = {
  exchangeCodeWithToken,
  redirectGoogleLogin,
  refreshAccessToken,
};

export default AuthService;
