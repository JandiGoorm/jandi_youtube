import {
  DropDown,
  DropDownContent,
  DropDownTrigger,
} from "../../components/DropDown/DropDown";
import { formatSubscriberCount } from "../../utils/channel";
import styles from "./ChannelDes.module.css";
// import bellIcon from "../../assets/icons/bell.svg";

const ChannelDes = ({ channel }) => {
  return (
    <div className={styles.container}>
      <img
        src={channel.thumbnails.medium.url}
        alt="channel"
        className={styles.channel_img}
      />
      <div className={styles.channel_info}>
        <span>{channel.title}</span>
        <div className={styles.channel_description}>
          <div className={styles.channel_stats}>
            <span>{channel.customUrl}</span>
            <span>•</span>
            <span>구독자 {formatSubscriberCount(channel.subscriberCount)}</span>
          </div>
          <span>{channel.description}</span>
        </div>
      </div>

      <div className={styles.dropdown}>
        <DropDown>
          <DropDownTrigger>
            <button className={styles.subscribe_btn}>구독중</button>
          </DropDownTrigger>
          <DropDownContent>
            <div className={styles.dropdown_content}>
              <button>
                {/* <img src={bellIcon} alt="bell-icon" /> */}
                <span>전체</span>
              </button>
              <button>알림 설정</button>
            </div>
          </DropDownContent>
        </DropDown>
      </div>
    </div>
  );
};

export default ChannelDes;
