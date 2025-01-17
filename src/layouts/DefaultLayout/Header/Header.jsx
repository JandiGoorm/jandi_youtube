import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/icons/logo.svg";
import { PageEndPoints } from "../../../constants/api";
import styles from "./Header.module.css";
import HeaderIcons from "./HeaderIcons/HeaderIcons";
import HeaderSearch from "./HeaderSearch/HeaderSearch";

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = useCallback(() => {
    navigate(PageEndPoints.HOME);
  }, [navigate]);

  return (
    <>
      <header className={styles.container}>
        <div className={styles.logo_box}>
          <img
            src={logo}
            alt="YouTube Logo"
            className={styles.logo}
            onClick={handleLogoClick}
          />
        </div>
        <HeaderSearch />
        <HeaderIcons />
      </header>
    </>
  );
};

export default Header;
