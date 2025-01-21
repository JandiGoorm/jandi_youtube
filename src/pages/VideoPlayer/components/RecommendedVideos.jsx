import React from "react";
import styles from "./RecommendedVideos.module.css";

const RecommendedVideos = ({ videos }) => {
  return (
    <div className={styles.recommended}>
      <h3>추천 동영상</h3>
      <ul>
        {videos.map((video) => (
          <li key={video.id.videoId} className={styles.videoItem}>
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              className={styles.thumbnail}
            />
            <div className={styles.info}>
              <p className={styles.title}>{video.snippet.title}</p>
              <p className={styles.channel}>{video.snippet.channelTitle}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendedVideos;
