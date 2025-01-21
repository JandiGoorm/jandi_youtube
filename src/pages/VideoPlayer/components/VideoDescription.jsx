import React from "react";
import styles from "../VideoPlayer.module.css";

const VideoDescription = ({ viewCount, publishedAt, tags, videoDescription }) => (
  <div className={styles.descriptionSection}>
    <div className={styles.metaData}>
      <p className={styles.viewCount}>조회수 {viewCount.toLocaleString()}회</p>
      <p className={styles.publishedAt}>{publishedAt}</p>
    </div>
    <div className={styles.tags}>
      {tags.map((tag, index) => (
        <span key={index} className={styles.tag}>
          #{tag}
        </span>
      ))}
    </div>
    <p className={styles.descriptionText}>{videoDescription}</p>
  </div>
);

export default VideoDescription;
