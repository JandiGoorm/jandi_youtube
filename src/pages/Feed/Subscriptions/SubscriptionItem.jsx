import { FiMoreVertical } from "react-icons/fi";
import {
  DropDown,
  DropDownContent,
  DropDownTrigger,
} from "../../../components/DropDown/DropDown";
import { formatISO } from "../../../utils/date";
import { formatHitCount } from "../../../utils/hit";
import { videoDropdownOptions } from "./constants";
import styles from "./SubscriptionItem.module.css";
import { useSubscriptions } from "./SubscriptionsContext";
import { MdOutlineNotInterested } from "react-icons/md";

const SubscriptionItem = ({ item }) => {
  const { allSubs } = useSubscriptions();

  const channelInfo = allSubs.find((v) => v.id === item.snippet.channelId);

  console.log("channelInfo", channelInfo);
  console.log(item);

  return (
    <li className={styles.container} key={item.id}>
      <img
        src={item.snippet.thumbnails.medium.url}
        alt="thumbnail"
        className={styles.thumbnail}
      />
      <div className={styles.flex_row}>
        <img
          src={channelInfo.snippet.thumbnails.default.url}
          alt="channel_thumbnail"
          className={styles.channel_img}
        />
        <div className={styles.flex_column}>
          <div className={styles.video_title}>{item.snippet.title}</div>
          <div className={styles.detail_info}>
            <span>{item.snippet.channelTitle}</span>
            <div className={styles.detail_statistics}>
              <span>조회수 {formatHitCount(item.statistics.viewCount)}</span>
              <span>•</span>
              <span>{formatISO(item.snippet.publishedAt)}</span>
            </div>
          </div>
        </div>
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
      </div>
    </li>
  );
};

export default SubscriptionItem;
