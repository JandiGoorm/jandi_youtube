import React from "react";
import styles from "./VideoInfo.module.css";
import { formatSubscriberCount } from "../../../utils/channel"; // channel.js에서 구독자 수 포맷 함수 가져오기

const VideoInfo = ({ channelInfo, likeStatus, handleLike }) => {
  if (!channelInfo) return null;

  const { snippet, statistics } = channelInfo;
  const { thumbnails, title } = snippet;
  const subscriberCount = statistics.subscriberCount
    ? formatSubscriberCount(parseInt(statistics.subscriberCount))
    : "N/A";

  return (
    <div className={styles.videoInfoContainer}>
      <div className={styles.channelRow}>
        {/* 채널 프로필과 정보 */}
        <div className={styles.channelInfo}>
          <img
            className={styles.channelImage}
            src={thumbnails.default.url}
            alt={title}
          />
          <div className={styles.channelDetails}>
            <span className={styles.channelTitle}>{title}</span>
            <span className={styles.subscriberCount}>{subscriberCount}</span>
          </div>
          {/* 구독 버튼 */}
          <button className={styles.subscribeButton}>구독</button>
        </div>
        {/* 좋아요/싫어요 버튼 */}
        <div className={styles.actionButtons}>
          <button
            className={`${styles.likeButton} ${
              likeStatus === "like" ? styles.active : ""
            }`}
            onClick={() => handleLike(likeStatus === "like" ? "none" : "like")}
          >
            👍 좋아요
          </button>
          <button
            className={`${styles.dislikeButton} ${
              likeStatus === "dislike" ? styles.active : ""
            }`}
            onClick={() =>
              handleLike(likeStatus === "dislike" ? "none" : "dislike")
            }
          >
            👎 싫어요
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;
