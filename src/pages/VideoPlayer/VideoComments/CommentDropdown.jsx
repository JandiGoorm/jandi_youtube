import {
  DropDown,
  DropDownContent,
  DropDownTrigger,
} from "../../../components/DropDown/DropDown";
import { FiMoreVertical } from "react-icons/fi";
import styles from "./CommentDropdown.module.css";
import { PiFlagThin } from "react-icons/pi";

const CommentDropdown = () => {
  return (
    <DropDown>
      <DropDownTrigger>
        <div className={styles.trigger}>
          <FiMoreVertical size={20} />
        </div>
      </DropDownTrigger>
      <DropDownContent>
        <div className={styles.content}>
          <button className={styles.button}>
            <PiFlagThin size={24} />
            <span>신고</span>
          </button>
        </div>
      </DropDownContent>
    </DropDown>
  );
};

export default CommentDropdown;
