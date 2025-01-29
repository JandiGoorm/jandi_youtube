import { FiMoreVertical } from "react-icons/fi";
import {
  DropDown,
  DropDownContent,
  DropDownTrigger,
} from "../../../components/DropDown/DropDown";
import { videoDropdownOptions } from "./constants";
import styles from "./VideoDropDown.module.css";

const VideoDropdown = () => {
  return (
    <DropDown>
      <DropDownTrigger>
        <FiMoreVertical className={styles.menu_icon} size={20} />
      </DropDownTrigger>
      <DropDownContent>
        <ul className={styles.menu_list}>
          {videoDropdownOptions.map((v) => {
            return (
              <li key={v.text} className={styles.menu_item}>
                {v.icon}
                <span>{v.text}</span>
              </li>
            );
          })}
        </ul>
      </DropDownContent>
    </DropDown>
  );
};

export default VideoDropdown;
