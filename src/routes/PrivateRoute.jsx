import { useAuth } from "../contexts/AuthContext";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import styles from "./PrivateRoute.module.css";
import { BsCollectionPlay } from "react-icons/bs";
import { LuUserRound } from "react-icons/lu";

const PrivateRoute = ({ children, requireAuth }) => {
  const { currentUser, signIn } = useAuth();

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
