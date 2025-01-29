import { BsBookmark } from "react-icons/bs";
import { FiMoreVertical } from "react-icons/fi";
import { IoMdPlay } from "react-icons/io";
import { PiShareFatLight } from "react-icons/pi";
import {
  DropDownContent,
  DropDown,
  DropDownTrigger,
} from "../../../components/DropDown/DropDown";
import { channelDropdownOptions } from "./constants";
import styles from "./BannerBtns.module.css";

const BannerBtns = () => {
  return (
    <div className={styles.banner_btns}>
      <button className={styles.play_btn}>
        <IoMdPlay />
        <span>모두 재생</span>
      </button>
      <div className={styles.icons_box}>
        <button className={styles.icon_btn}>
          <BsBookmark size={18} />
        </button>
        <button className={styles.icon_btn}>
          <PiShareFatLight size={24} />
        </button>
        <DropDown>
          <DropDownTrigger>
            <button className={styles.icon_btn}>
              <FiMoreVertical size={18} />
            </button>
          </DropDownTrigger>
          <DropDownContent>
            <ul className={styles.menu_list}>
              {channelDropdownOptions.map((option) => {
                return (
                  <li key={option.text} className={styles.menu_item}>
                    <div className={styles.icon_center}>{option.icon}</div>
                    <span>{option.text}</span>
                  </li>
                );
              })}
            </ul>
          </DropDownContent>
        </DropDown>
      </div>
    </div>
  );
};

export default BannerBtns;
