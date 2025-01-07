import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Menu.module.css";
import menuItems from "./constants";

const Menu = ({ menu }) => {
  const [show, setShow] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [menuData, setMenuData] = useState([]);
  const [size, setSize] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 1312) {
        setSize(false);
      } else {
        setSize(true);
      }
    };
    // 초기 로드와 화면 크기 변경 시에도 적용
    handleResize();
    window.addEventListener("resize", handleResize);
    // 컴포넌트 언마운트 시 리스너 해제
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    switch (menu) {
      case "myPage":
        setMenuData(menuConstants.mypagemenuitems);
        setMenuName("내 페이지");
        setShow(true);
        break;
      case "search":
        setMenuData(menuItems.searchmenuitems);
        setMenuName("탐색");
        setShow(true);
        break;
      case "plus":
        setMenuData(menuItems.plusmenuitems);
        setMenuName("Youtube 더보기");
        setShow(true);
        break;
      case "setting":
        setMenuData(menuItems.settingmenuitems);
        setShow(false);
        break;
      default:
        setMenuData(menuItems.firstitems);
        setShow(false);
        break;
    }
  }, [menu]);

  const handleNavigation = (link) => {
    if (link.startsWith("http")) {
      window.open(link, "_blank");
    } else {
      navigate(link);
    }
  };

  return (
    <div className={styles.sidebarDiv}>
      <ul className={styles.sidebarMenu}>
        {show && size && <li className={styles.menuName}>{menuName}</li>}
        {menuData.map((item, index) => (
          <li
            key={index}
            className={styles.menuItem}
            onClick={() => handleNavigation(item.link)}
          >
            <span className={styles.icon}>
              <item.icon />
            </span>
            {size && <span className={styles.label}>{item.label}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
