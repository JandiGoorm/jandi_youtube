import { BsBell } from "react-icons/bs";
import { SlArrowDown } from "react-icons/sl";
import {
  DropDown,
  DropDownContent,
  DropDownTrigger,
} from "../../../components/DropDown/DropDown";
import { formatSubscriberCount } from "../../../utils/channel";
import styles from "./ChannelItem.module.css";
import { subscriptionDropdownOptions } from "./contants";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { buildPath } from "../../../utils/path";
import { pageEndPoints } from "../../../constants/api";

const ChannelItem = ({ item }) => {
  const navigate = useNavigate();
  const handleNavigate = useCallback(() => {
    navigate(buildPath(pageEndPoints.CHANNEL, { channel: item.channelId }));
  }, [item.channelId, navigate]);

  return (
    <div className={styles.container}>
      <div
        style={{ flex: 1, display: "flex", gap: "16px", cursor: "pointer" }}
        onClick={handleNavigate}
      >
        <img
          src={item.thumbnails.medium.url}
          alt="channel"
          className={styles.channel_img}
        />
        <div className={styles.channel_info}>
          <span>{item.title}</span>
          <div className={styles.channel_description}>
            <div className={styles.channel_stats}>
              <span>{item.customUrl}</span>
              <span>•</span>
              <span>구독자 {formatSubscriberCount(item.subscriberCount)}</span>
            </div>
            <div className={styles.des_text_container}>{item.description}</div>
          </div>
        </div>
      </div>

      <div className={styles.dropdown}>
        <DropDown>
          <DropDownTrigger>
            <button className={styles.subscribe_btn}>
              <BsBell size={22} />
              <span>구독중</span>
              <SlArrowDown size={12} className={styles.arrow_down} />
            </button>
          </DropDownTrigger>
          <DropDownContent>
            <div className={styles.dropdown_content}>
              {subscriptionDropdownOptions.map((option) => {
                return (
                  <button key={option.label}>
                    {option.icons}
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          </DropDownContent>
        </DropDown>
      </div>
    </div>
  );
};

export default ChannelItem;
