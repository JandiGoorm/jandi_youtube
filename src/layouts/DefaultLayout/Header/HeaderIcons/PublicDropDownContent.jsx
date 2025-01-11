import { publicMenuOptions } from "../constants";
import styles from "./PublicDropDownContent.module.css";

const PublicDropDownContent = () => {
  return (
    <>
      {publicMenuOptions.map((option) => {
        return (
          <li
            className={styles.menu_item}
            key={option.text}
            style={
              option.text === "설정"
                ? {
                    height: "50px",
                    borderTop: "2px solid #f5f5f5",
                    borderBottom: "2px solid #f5f5f5",
                  }
                : {}
            }
          >
            <div className={styles.icon_center}>{option.icon}</div>
            <span>{option.text}</span>
          </li>
        );
      })}
    </>
  );
};

export default PublicDropDownContent;
