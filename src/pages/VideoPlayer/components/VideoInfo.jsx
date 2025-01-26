import React from "react";
import styles from "./VideoInfo.module.css";
import { formatSubscriberCount } from "../../../utils/channel";
import { BiLike, BiDislike, BiShare, BiSave } from "react-icons/bi"; // 좋아요, 싫어요, 공유, 저장 아이콘
import { MdOutlineContentCopy, MdOutlineCloudDownload } from "react-icons/md"; // 클립, 오프라인 저장 아이콘

const VideoInfo = ({ channelInfo, likeStatus, handleLike, videoTitle }) => {
  if (!channelInfo) return null;

  const { snippet, statistics } = channelInfo;
  const { thumbnails, title } = snippet;
  const subscriberCount = statistics.subscriberCount
    ? formatSubscriberCount(parseInt(statistics.subscriberCount))
    : "N/A";

  return (
    <div className={styles.videoInfoContainer}>
      {/* 동영상 제목 */}
      {videoTitle && <h2 className={styles.videoTitle}>{videoTitle}</h2>}

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
            <span className={styles.subscriberCount}>구독자 {subscriberCount}</span>
          </div>
          {/* 구독 버튼 */}
          <button className={styles.subscribeButton}>구독</button>
        </div>

        {/* 좋아요/싫어요/공유/저장 등 액션 버튼 */}
        <div className={styles.actionButtons}>
          <button
            className={`${styles.actionButton} ${
              likeStatus === "like" ? styles.active : ""
            }`}
            onClick={() => handleLike(likeStatus === "like" ? "none" : "like")}
          >
            <BiLike /> 좋아요
          </button>
          <button
            className={`${styles.actionButton} ${
              likeStatus === "dislike" ? styles.active : ""
            }`}
            onClick={() =>
              handleLike(likeStatus === "dislike" ? "none" : "dislike")
            }
          >
            <BiDislike /> 싫어요
          </button>
          <button className={styles.actionButton}>
            <BiShare /> 공유
          </button>
          <button className={styles.actionButton}>
            <MdOutlineCloudDownload /> 오프라인 저장
          </button>
          <button className={styles.actionButton}>
            <MdOutlineContentCopy /> 클립
          </button>
          <button className={styles.actionButton}>
            <BiSave /> 저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;
