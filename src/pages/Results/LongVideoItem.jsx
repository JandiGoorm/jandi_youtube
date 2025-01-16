import { formatISO } from "../../utils/date";
import { formatHitCount } from "../../utils/hit";
import styles from "./LongVideoItem.module.css";

const LongVideoItem = ({ item }) => {
  return (
    <div key={item.id.videoId} className={styles.video_box}>
      <div className={styles.video_img_box}>
        <img
          src={item.snippet.thumbnails.high.url}
          alt="video_thumbnail"
          className={styles.video_img}
        />
      </div>
      <div className={styles.video_info}>
        <div className={styles.video_title}>{item.snippet.title}</div>
        <div className={styles.video_stats}>
          <span>조회수 {formatHitCount(item.statistics.viewCount)}</span>
          <span>•</span>
          <span>{formatISO(item.snippet.publishedAt)}</span>
        </div>
        <div className={styles.video_channel_info}>
          <img
            src={item.channel.snippet.thumbnails.default.url}
            alt="video_channel_img"
            className={styles.video_channel_img}
          />
          <span className={styles.video_channel_title}>
            {item.snippet.channelTitle}
          </span>
        </div>
        <span className={styles.video_channel_des}>
          {item.snippet.description}
        </span>
      </div>
    </div>
  );
};

export default LongVideoItem;