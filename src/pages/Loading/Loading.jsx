import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "../../apis/auth";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../../components/Loading/Loading";

// google login redirect 페이지 입니다. 해당 페이지에서 code를 받아서 token을 교환합니다.
// token으로 교환후 localStorage에 저장하고 메인페이지로 이동합니다.
const LoadingPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  let state = decodeURIComponent(params.get("state"));
  if (!state.startsWith("/")) {
    state = `/${state}`;
  }

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
      navigate(state);
    })();
  }, [
    exchangeCodeWithToken,
    getUserInfo,
    isMounted,
    navigate,
    setCurrentUser,
    state,
  ]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return <Loading />;
};

export default LoadingPage;
