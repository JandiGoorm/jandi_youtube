import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/icons/logo.svg";
import { PageEndPoints } from "../../../constants/api";
import styles from "./Header.module.css";
import HeaderIcons from "./HeaderIcons/HeaderIcons";
import HeaderSearch from "./HeaderSearch/HeaderSearch";
import { IoReorderThreeOutline } from "react-icons/io5";

const Header = ({ menuCallback }) => {
  const navigate = useNavigate();

  const handleLogoClick = useCallback(() => {
    navigate(PageEndPoints.HOME);
  }, [navigate]);

  return (
    <>
      <header className={styles.container}>
        <div className={styles.flex_row}>
          <div className={styles.sidebarBtnBackground}>
            <button className={styles.sidebarBtn} onClick={menuCallback}>
              <IoReorderThreeOutline size={24} />
            </button>
          </div>
          <div className={styles.logo_box}>
            <img
              src={logo}
              alt="YouTube Logo"
              className={styles.logo}
              onClick={handleLogoClick}
            />
          </div>
        </div>
        <HeaderSearch />
        <HeaderIcons />
      </header>
    </>
  );
};

export default Header;
