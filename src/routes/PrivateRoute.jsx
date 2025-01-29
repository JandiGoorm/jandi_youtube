import { BsCollectionPlay } from "react-icons/bs";
import { LuUserRound } from "react-icons/lu";
import { useLocation } from "react-router-dom";
import { PageEndPoints } from "../constants/api";
import { useAuth } from "../contexts/AuthContext";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import styles from "./PrivateRoute.module.css";

const PrivateRoute = ({ children, requireAuth }) => {
  const { currentUser, signIn } = useAuth();

  /*
    playlist페이지는 searchParams에 따라 특정채널의 재생목록, 좋아요페이지, 나중에보기페이지를 렌더링 합니다.
    재생목록에서만 예외적으로, 로그인이 필요하지 않기 때문에 조건문을 추가합니다.
  */
  const location = useLocation();
  const { pathname, search } = location;
  const searchParams = new URLSearchParams(search).get("list");
  const isDetailPlaylist = searchParams !== "LL" && searchParams !== "WL";

  const isRequiredAuthPlaylist =
    pathname.includes(PageEndPoints.PLAYLIST) && isDetailPlaylist;

  if (isRequiredAuthPlaylist) {
    return children;
  }

  if (requireAuth && !currentUser) {
    return (
      <DefaultLayout>
        <div className={styles.container}>
          <BsCollectionPlay size={120} />
          <span className={styles.title}>로그인이 필요한 서비스 입니다.</span>
          <span className={styles.text}>
            해당 서비스를 이용 하시려면 로그인을 해주세요.
          </span>
          <button className={styles.login_btn}>
            <div className={styles.user_center}>
              <LuUserRound size={16} className={styles.user_icon} />
            </div>
            <span className={styles.login_text} onClick={signIn}>
              로그인
            </span>
          </button>
        </div>
      </DefaultLayout>
    );
  }

  return children;
};

export default PrivateRoute;
