import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import "../Home/Home.module.css";
import AuthService from "../../apis/auth";
import YoutubeService from "../../apis/youtube";

//현재는 테스트 용도로 사용하고 있습니다.
const MySubscribePage = () => {
  const { exchangeCodeWithToken, redirectGoogleLogin } = AuthService;
  const { fetchPlayLists } = YoutubeService;

  return (
    <DefaultLayout>
      <button onClick={redirectGoogleLogin}>login</button>
      <button onClick={exchangeCodeWithToken}>exchange</button>
      <button onClick={() => fetchPlayLists()}>fetch PlayLists</button>
    </DefaultLayout>
  );
};

export default MySubscribePage;
