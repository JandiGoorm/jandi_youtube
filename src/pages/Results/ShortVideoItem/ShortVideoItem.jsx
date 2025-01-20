import { useNavigate } from "react-router-dom";
import { formatISO } from "../../../utils/date";
import { formatHitCount } from "../../../utils/hit";
import styles from "./ShortVideoItem.module.css";
import VideoDropDown from "../VideoDropDown/VideoDropDown";
import { useCallback } from "react";
import { buildPath } from "../../../utils/path";
import { PageEndPoints } from "../../../constants/api";

const ShortVideoItem = ({ item }) => {
  const navigate = useNavigate();

  const navigateToVideo = useCallback(() => {
    const path = buildPath(PageEndPoints.SHORTSDETAIL, {
      shortsId: item.id,
    });
    navigate(path);
  }, [item.id, navigate]);

  const navigateToChannel = useCallback(() => {
    const path = buildPath(PageEndPoints.CHANNEL, { channel: item.channel.id });
    navigate(path);
  }, [item.channel.id, navigate]);

  return (
    <div key={item.id.videoId} className={styles.video_box}>
      <div className={styles.video_img_box} onClick={navigateToVideo}>
        <img
          src={item.snippet.thumbnails.high.url}
          alt="video_thumbnail"
          className={styles.video_img}
        />
      </div>
      <div className={styles.video_info}>
        <div className={styles.video_title} onClick={navigateToVideo}>
          {item.snippet.title}
        </div>
        <div className={styles.video_stats}>
          <span>조회수 {formatHitCount(item.statistics.viewCount)}</span>
          <span>•</span>
          <span>{formatISO(item.snippet.publishedAt)}</span>
        </div>
        <div className={styles.video_channel_info} onClick={navigateToChannel}>
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
        <div className={styles.menu_box}>
          <VideoDropDown />
        </div>
      </div>
    </div>
  );
};

export default ShortVideoItem;
