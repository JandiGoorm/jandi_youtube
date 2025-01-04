import axios from "axios";
import { apiEndPoints } from "../constants/api";
import { clientID, clientSecret, redirectURI } from "../constants/config";

const userinfoURL = "https://www.googleapis.com/oauth2/v1/userinfo";
const authBaseURL = "https://oauth2.googleapis.com/";

const authAPI = axios.create({
  baseURL: authBaseURL,
});

const redirectGoogleLogin = () => {
  if (!clientID || !redirectURI) {
    console.log("클라이언트 아이디나 리다이렉트 URI가 없습니다.");
    return;
  }

  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=code&scope=email profile https://www.googleapis.com/auth/youtube.readonly`;
};

const exchangeCodeWithToken = async (code) => {
  try {
    const { data } = await authAPI.post(apiEndPoints.TOKEN, {
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

const getUserInfo = async (accessToken) => {
  try {
    const { data } = await axios.get(userinfoURL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!data) {
      throw new Error("유저 정보 조회 실패 : not user");
    }

    return data;
  } catch (err) {
    console.log("유저 정보 조회 에러", err);
  }
};

const refreshAccessToken = async (refreshToken) => {
  try {
    const { data } = await authAPI.post(apiEndPoints.TOKEN, {
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
  getUserInfo,
};

export default AuthService;
