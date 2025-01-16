import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SubscriptionButton from "../../../components/Button/SubscriptionButton";
import { pageEndPoints } from "../../../constants/api";
import { formatSubscriberCount } from "../../../utils/channel";
import { buildPath } from "../../../utils/path";
import styles from "./ChannelItem.module.css";

const ChannelItem = ({ item }) => {
  const navigate = useNavigate();
  const handleNavigate = useCallback(() => {
    navigate(buildPath(pageEndPoints.CHANNEL, { channel: item.channelId }));
  }, [item.channelId, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.pointer_box} onClick={handleNavigate}>
        <img
          src={item.thumbnails.medium.url}
          alt="channel"
          className={styles.channel_img}
          onError={(e) => {
            e.currentTarget.src = item.thumbnails.default.url;
          }}
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

      <SubscriptionButton channelId={item.channelId} />
    </div>
  );
};

export default ChannelItem;
