import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../apis/auth";
import { useAuth } from "../../contexts/authContext";

// google login redirect 페이지 입니다. 해당 페이지에서 code를 받아서 token을 교환합니다.
// token으로 교환후 localStorage에 저장하고 메인페이지로 이동합니다.
const LoadingPage = () => {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  const { exchangeCodeWithToken, getUserInfo } = AuthService;
  const { setCurrentUser } = useAuth();

  useEffect(() => {
    if (!isMounted) return;

    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) {
      console.log("Error : code is null");
      return;
    }

    (async () => {
      const { accessToken, refreshToken } = await exchangeCodeWithToken(code);
      const userInfo = await getUserInfo(accessToken);
      setCurrentUser(userInfo);

      localStorage.setItem("access-token", accessToken);
      localStorage.setItem("refresh-token", refreshToken);
      navigate("/");
    })();
  }, [exchangeCodeWithToken, getUserInfo, isMounted, navigate, setCurrentUser]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return <div>Loading...</div>;
};

export default LoadingPage;
