import React from "react";
import styles from "./VideoInfo.module.css";

// VideoInfo 컴포넌트 정의
// channelInfo: 채널 정보 객체
// likeStatus: 현재 좋아요 상태 ("like", "dislike", 또는 "none")
// handleLike: 좋아요/싫어요 상태를 변경하는 함수
// videoTitle: 동영상 제목
const VideoInfo = ({ channelInfo, likeStatus, handleLike, videoTitle }) => {
  // channelInfo가 없을 경우 아무것도 렌더링하지 않음
  if (!channelInfo) {
    return null;
  }

  // 채널 정보에서 필요한 데이터 추출
  const { snippet, statistics } = channelInfo;
  const { thumbnails, title } = snippet;
  const subscriberCount = statistics.subscriberCount
    ? parseInt(statistics.subscriberCount).toLocaleString() // 구독자 수를 포맷팅
    : "N/A"; // 구독자 수 정보가 없을 경우 "N/A" 표시

  return (
    <div className={styles.videoInfoContainer}>
      {/* 동영상 제목 */}
      <h1 className={styles.videoTitle}>{videoTitle}</h1>
      
      {/* 채널 정보 섹션 */}
      <div className={styles.channelSection}>
        <div className={styles.channelInfo}>
          {/* 채널 프로필 이미지 */}
          <img
            className={styles.channelImage}
            src={thumbnails.default.url}
            alt={title}
          />
          <div className={styles.channelDetails}>
            {/* 채널 이름 */}
            <h3 className={styles.channelTitle}>{title}</h3>
            {/* 구독자 수 */}
            <p className={styles.subscriberCount}>
              구독자 수 {subscriberCount}명
            </p>
          </div>
        </div>
        {/* 구독 버튼 */}
        <button className={styles.subscribeButton}>구독</button>
      </div>
      
      {/* 동영상 액션 버튼들 */}
      <div className={styles.actionButtons}>
        {/* 좋아요 버튼 */}
        <button
          className={`${styles.likeButton} ${
            likeStatus === "like" ? styles.liked : ""
          }`}
          onClick={() => handleLike(likeStatus === "like" ? "none" : "like")}
        >
          👍 {likeStatus === "like" ? "좋아요 취소" : "좋아요"}
        </button>

        {/* 싫어요 버튼 */}
        <button
          className={`${styles.dislikeButton} ${
            likeStatus === "dislike" ? styles.disliked : ""
          }`}
          onClick={() =>
            handleLike(likeStatus === "dislike" ? "none" : "dislike")
          }
        >
          👎 {likeStatus === "dislike" ? "싫어요 취소" : "싫어요"}
        </button>

        {/* 공유 버튼 */}
        <button className={styles.actionButton}>공유</button>

        {/* 오프라인 저장 버튼 */}
        <button className={styles.actionButton}>오프라인 저장</button>

        {/* 클립 버튼 */}
        <button className={styles.actionButton}>클립</button>

        {/* 저장 버튼 */}
        <button className={styles.actionButton}>저장</button>

        {/* 더보기 버튼 */}
        <button className={styles.moreButton}>...</button>
      </div>
    </div>
  );
};

export default VideoInfo;
