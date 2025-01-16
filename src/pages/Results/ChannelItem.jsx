import SkeletonImage from "../../components/SkeletonImage/SkeletonImage";
import { formatSubscriberCount } from "../../utils/channel";
import styles from "./ChannelItem.module.css";
import SubscribeButton from "../../components/Button/SubscriptionButton";

const ChannelItem = ({ item }) => {
  if (!item) return;
  return (
    <div className={styles.channel_box}>
      <div className={styles.channel_img_box}>
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
        <div className={styles.info_text}>
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
        <SubscribeButton channelId={item.id} />
      </div>
    </div>
  );
};

export default ChannelItem;
