import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SubscribeMenu.module.css";

const SubscribeMenu = ({ menu }) => {
  const [menuData, setMenuData] = useState([]);
  const navigate = useNavigate();

  const mysubscribemenuitems = [
    { icon: "🏠", label: "myLorem ipsum", link: "/" },
  ];

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
        <li className={styles.menuName}>구독</li>
        {mysubscribemenuitems.map((item, index) => (
          <li
            key={index}
            className={styles.menuItem}
            onClick={() => handleNavigation(item.link)}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </li>
        ))}
        <li className={styles.menuMore}>더보기</li>
      </ul>
    </div>
  );
};

export default SubscribeMenu;
