import { useAuth } from "../../../../contexts/AuthContext";
import styles from "./HeaderIcons.module.css";
import LoginStatus from "./loginStatus";
import LogoutStatus from "./logoutStatus";

const HeaderIcons = () => {
  const { currentUser } = useAuth();

  return (
    <section className={styles.icon_container}>
      {currentUser ? <LoginStatus /> : <LogoutStatus />}
    </section>
  );
};

export default HeaderIcons;
