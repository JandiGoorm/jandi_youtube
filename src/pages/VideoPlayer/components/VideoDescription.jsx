import React from "react";
import styles from "../VideoPlayer.module.css";

const VideoDescription = ({ viewCount, publishedAt, tags, videoDescription }) => {
  // 데이터가 없을 경우 기본값 처리
  const formattedViewCount = viewCount ? viewCount.toLocaleString() : "조회수 정보 없음";
  const formattedPublishedAt = publishedAt || "게시일 정보 없음";
  const formattedTags = tags || [];

  return (
    <div className={styles.descriptionSection}>
      <div className={styles.metaData}>
        <p className={styles.viewCount}>조회수 {formattedViewCount}회</p>
        <p className={styles.publishedAt}>{formattedPublishedAt}</p>
      </div>
      <div className={styles.tags}>
        {formattedTags.map((tag, index) => (
          <span key={index} className={styles.tag}>
            #{tag}
          </span>
        ))}
      </div>
      <p className={styles.descriptionText}>
        {videoDescription || "설명이 없습니다."}
      </p>
    </div>
  );
};

export default VideoDescription;
