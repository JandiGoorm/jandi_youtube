import React, { useState } from "react";
import styles from "./VideoDescription.module.css";

const VideoDescription = ({ viewCount, publishedAt, tags, videoDescription }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.descriptionSection}>
      <div className={styles.metaData}>
        <span className={styles.viewCount}>조회수 {viewCount.toLocaleString()}회</span>
        <span className={styles.publishedAt}>{publishedAt}</span>
      </div>
      <div className={styles.tags}>
        {tags.map((tag, index) => (
          <span key={index} className={styles.tag}>
            #{tag}
          </span>
        ))}
      </div>
      <div className={styles.descriptionText}>
        <p className={isExpanded ? styles.expanded : styles.collapsed}>
          {videoDescription}
        </p>
        <button className={styles.toggleButton} onClick={toggleDescription}>
          {isExpanded ? "간략히" : "더보기"}
        </button>
      </div>
    </div>
  );
};

export default VideoDescription;
