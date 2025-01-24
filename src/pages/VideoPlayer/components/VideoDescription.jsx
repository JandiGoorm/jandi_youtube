import React from "react";
import styles from "../VideoPlayer.module.css";

// VideoDescription 컴포넌트
// 동영상의 조회수, 게시일, 태그, 설명을 렌더링하는 컴포넌트
const VideoDescription = ({ viewCount, publishedAt, tags, videoDescription }) => {
  // 조회수, 게시일, 태그 데이터가 없을 경우 기본값 설정
  const formattedViewCount = viewCount ? viewCount.toLocaleString() : "조회수 정보 없음"; // 조회수 포맷팅
  const formattedPublishedAt = publishedAt || "게시일 정보 없음"; // 게시일 기본값
  const formattedTags = tags || []; // 태그 배열이 없을 경우 빈 배열

  return (
    <div className={styles.descriptionSection}>
      {/* 메타 데이터: 조회수 및 게시일 */}
      <div className={styles.metaData}>
        <p className={styles.viewCount}>조회수 {formattedViewCount}회</p>
        <p className={styles.publishedAt}>{formattedPublishedAt}</p>
      </div>

      {/* 태그 섹션 */}
      <div className={styles.tags}>
        {formattedTags.map((tag, index) => (
          <span key={index} className={styles.tag}>
            #{tag}
          </span>
        ))}
      </div>

      {/* 동영상 설명 */}
      <p className={styles.descriptionText}>
        {videoDescription || "설명이 없습니다."}
      </p>
    </div>
  );
};

export default VideoDescription;
