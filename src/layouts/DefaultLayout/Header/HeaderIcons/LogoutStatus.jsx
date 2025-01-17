import { FiMoreVertical } from "react-icons/fi";
import { LuUserRound } from "react-icons/lu";
import {
  DropDown,
  DropDownContent,
  DropDownTrigger,
} from "../../../../components/DropDown/DropDown";
import { useAuth } from "../../../../contexts/AuthContext";
import styles from "./LogoutStatus.module.css";
import PublicDropDownContent from "./PublicDropDownContent";

const LogoutStatus = () => {
  const { signIn } = useAuth();

  return (
    <>
      <DropDown>
        <DropDownTrigger>
          <FiMoreVertical size={18} className={styles.menu_icon} />
        </DropDownTrigger>
        <DropDownContent>
          <ul className={styles.menu_list}>
            <PublicDropDownContent />
          </ul>
        </DropDownContent>
      </DropDown>

      <button className={styles.login_btn}>
        <div className={styles.user_center}>
          <LuUserRound size={16} className={styles.user_icon} />
        </div>
        <span className={styles.login_text} onClick={signIn}>
          로그인
        </span>
      </button>
    </>
  );
};

export default LogoutStatus;
