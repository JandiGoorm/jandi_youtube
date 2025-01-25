import { useCallback } from "react";
import styles from "./VideoItem.module.css";
import { useNavigate } from "react-router-dom";
import { PageEndPoints } from "../../../constants/api";
import { formatHitCount } from "../../../utils/hit";
import { formatISO } from "../../../utils/date";
import VideoDropdown from "./VideoDropdown";

const VideoItem = ({ item }) => {
  const navigate = useNavigate();

  const handleVideoClick = useCallback(
    (videoId) => {
      if (!videoId) return;
      navigate(`${PageEndPoints.WATCH}?v=${videoId}`);
    },
    [navigate]
  );

  return (
    <li
      className={styles.video_item}
      key={item.id}
      onClick={() => handleVideoClick(item.id)}
    >
      <span className={styles.video_index}>{item.index + 1}</span>
      <div className={styles.video_des}>
        <img
          className={styles.video_img}
          src={item.snippet.thumbnails.medium.url}
          alt={item.snippet.title}
        />
        <div className={styles.video_info}>
          <span className={styles.video_title}>{item.snippet.title}</span>
          <div className={styles.video_detail}>
            <span>{item.snippet.channelTitle}</span>
            <span>•</span>
            <span>조회수 {formatHitCount(item.statistics.viewCount)}</span>
            <span>•</span>
            <span>{formatISO(item.snippet.publishedAt)}</span>
          </div>
        </div>
        <div className={styles.dropdown_box}>
          <VideoDropdown />
        </div>
      </div>
    </li>
  );
};

export default VideoItem;
