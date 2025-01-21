import SkeletonImage from "../../../components/SkeletonImage/SkeletonImage";
import { formatSubscriberCount } from "../../../utils/channel";
import styles from "./ChannelItem.module.css";
import SubscribeButton from "../../../components/Button/SubscriptionButton";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { PageEndPoints } from "../../../constants/api";
import { buildPath } from "../../../utils/path";

const ChannelItem = ({ item }) => {
  const navigate = useNavigate();

  const handleChannelClick = useCallback(() => {
    const path = buildPath(PageEndPoints.CHANNEL, { channel: item.id });
    navigate(path);
  }, [item.id, navigate]);

  if (!item) return;

  return (
    <div className={styles.channel_box}>
      <div className={styles.channel_img_box} onClick={handleChannelClick}>
        <SkeletonImage
          Image={
            <img
              src={item?.snippet.thumbnails.medium.url}
              alt="channel_thumbnail"
              className={styles.channel_img}
            />
          }
          skeletonStyle={{ minHeight: "200px" }}
        />
      </div>

      <div className={styles.channel_info}>
        <div className={styles.info_text} onClick={handleChannelClick}>
          <span>{item?.snippet.title}</span>
          <div className={styles.channel_detail}>
            <div className={styles.channel_stats}>
              <span>{item?.snippet.customUrl}</span>
              <span>•</span>
              <span>
                구독자
                {formatSubscriberCount(item?.statistics.subscriberCount)}
              </span>
            </div>
            <div className={styles.channel_des}>
              {item?.snippet.description}
            </div>
          </div>
        </div>
        <div className={styles.subs_btn_box}>
          <SubscribeButton channelId={item.id} />
        </div>
      </div>
    </div>
  );
};

export default ChannelItem;
