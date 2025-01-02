import { useEffect, useState } from "react";
import AuthService from "../../apis/auth";

// google login redirect 페이지 입니다. 해당 페이지에서 code를 받아서 token을 교환합니다.
// token으로 교환후 localStorage에 저장하고 메인페이지로 이동합니다.
const LoadingPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { exchangeCodeWithToken } = AuthService;

  useEffect(() => {
    if (!isMounted) return;

    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) {
      console.log("Error : code is null");
      return;
    }

    (async () => {
      const { accessToken, refreshToken } = await exchangeCodeWithToken(code);
      localStorage.setItem("access-token", accessToken);
      localStorage.setItem("refresh-token", refreshToken);
      window.location.href = "/"; // 임시코드
    })();
  }, [exchangeCodeWithToken, isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return <div>Loading...</div>;
};

export default LoadingPage;
