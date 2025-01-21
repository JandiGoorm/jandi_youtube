import {
  DropDown,
  DropDownTrigger,
  DropDownContent,
} from "../../../components/DropDown/DropDown";
import { videoDropdownOptions } from "../constansts";
import { MdOutlineNotInterested } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import styles from "./VideoDropDown.module.css";

const VideoDropDown = () => {
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
          <li
            className={styles.menu_item}
            style={{
              borderTop: "1px solid rgba(0, 0, 0, 0.1)",
              height: "44px",
            }}
          >
            <MdOutlineNotInterested size={24} />
            <span>숨기기</span>
          </li>
        </ul>
      </DropDownContent>
    </DropDown>
  );
};

export default VideoDropDown;
