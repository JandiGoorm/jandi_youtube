import { HiOutlineHandThumbDown, HiOutlineHandThumbUp } from "react-icons/hi2";
import { formatSubscriberCount } from "../../../utils/channel";
import { formatLikeCount } from "../../../utils/likeCount";
import { videoInfoButtons } from "./constants";
import styles from "./VideoInfo.module.css";

const VideoInfo = ({ channelInfo, video }) => {
  if (!channelInfo) return;

  const {
    snippet: { thumbnails, title },
    statistics,
  } = channelInfo;

  const subscriberCount =
    formatSubscriberCount(statistics.subscriberCount) || 0;

  return (
    <div className={styles.container}>
      <h2 className={styles.video_title}>{video.snippet.title}</h2>

      <div className={styles.channel_row}>
        <div className={styles.channel_info}>
          <img
            className={styles.channel_img}
            src={thumbnails.default.url}
            alt={title}
          />
          <div className={styles.channel_details}>
            <span className={styles.channel_title}>{title}</span>
            <span className={styles.subscriberCount}>
              구독자 {subscriberCount}
            </span>
          </div>
          <button className={styles.subscribeButton}>구독</button>
        </div>

        <div className={styles.actionButtons}>
          <div className={styles.like_btns_box}>
            <button className={styles.like_btn}>
              <HiOutlineHandThumbUp size={22} />
              <span>{formatLikeCount(video.statistics.likeCount)}</span>
            </button>
            <div className={styles.vertical_divider} />
            <button className={styles.like_btn}>
              <HiOutlineHandThumbDown size={22} />
            </button>
          </div>
          {videoInfoButtons.map((button) => {
            return (
              <button key={button.text} className={styles.actionButton}>
                {button.icon} <span>{button.text}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;
