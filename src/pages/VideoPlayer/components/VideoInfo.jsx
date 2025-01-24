import React from "react";
import styles from "./VideoInfo.module.css";

const VideoInfo = ({ channelInfo, likeStatus, handleLike, videoTitle }) => {
  if (!channelInfo) {
    return null;
  }

  const { snippet, statistics } = channelInfo;
  const { thumbnails, title } = snippet;
  const subscriberCount = statistics.subscriberCount
    ? parseInt(statistics.subscriberCount).toLocaleString()
    : "N/A";

  return (
    <div className={styles.videoInfoContainer}>
      <h1 className={styles.videoTitle}>{videoTitle}</h1>
      <div className={styles.channelSection}>
        <div className={styles.channelInfo}>
          <img
            className={styles.channelImage}
            src={thumbnails.default.url}
            alt={title}
          />
          <div className={styles.channelDetails}>
            <h3 className={styles.channelTitle}>{title}</h3>
            <p className={styles.subscriberCount}>구독자 수 {subscriberCount}명</p>
          </div>
        </div>
        <button className={styles.subscribeButton}>구독</button>
      </div>
      <div className={styles.actionButtons}>
        <button
          className={`${styles.likeButton} ${
            likeStatus === "like" ? styles.liked : ""
          }`}
          onClick={() => handleLike(likeStatus === "like" ? "none" : "like")}
        >
          👍 {likeStatus === "like" ? "좋아요 취소" : "좋아요"}
        </button>
        <button
          className={`${styles.dislikeButton} ${
            likeStatus === "dislike" ? styles.disliked : ""
          }`}
          onClick={() => handleLike(likeStatus === "dislike" ? "none" : "dislike")}
        >
          👎 {likeStatus === "dislike" ? "싫어요 취소" : "싫어요"}
        </button>
        <button className={styles.actionButton}>공유</button>
        <button className={styles.actionButton}>오프라인 저장</button>
        <button className={styles.actionButton}>클립</button>
        <button className={styles.actionButton}>저장</button>
        <button className={styles.moreButton}>...</button>
      </div>
    </div>
  );
};

export default VideoInfo;