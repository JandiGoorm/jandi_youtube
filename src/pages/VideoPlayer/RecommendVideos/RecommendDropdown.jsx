import {
  DropDown,
  DropDownContent,
  DropDownTrigger,
} from "../../../components/DropDown/DropDown";
import { FiMoreVertical } from "react-icons/fi";
import styles from "./RecommendDropdown.module.css";
import {
  recommendDropdownChannelOptions,
  recommendDropdownVideoOptions,
} from "../constants";

const RecommendDropdown = () => {
  return (
    <DropDown>
      <DropDownTrigger>
        <div className={styles.trigger}>
          <FiMoreVertical size={20} />
        </div>
      </DropDownTrigger>
      <DropDownContent>
        <ul className={styles.menu_list}>
          {recommendDropdownVideoOptions.map((option) => {
            return (
              <li key={option.text} className={styles.menu_item}>
                {option.icon}
                <span>{option.text}</span>
              </li>
            );
          })}
          <div className={styles.divider} />

          {recommendDropdownChannelOptions.map((option) => {
            return (
              <li key={option.text} className={styles.menu_item}>
                {option.icon}
                <span>{option.text}</span>
              </li>
            );
          })}
        </ul>
      </DropDownContent>
    </DropDown>
  );
};

export default RecommendDropdown;
