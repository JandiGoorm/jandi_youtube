import React, { useState } from "react";
import styles from "./VideoDescription.module.css"; // VideoDescription 전용 CSS 파일

import { formatHitCount } from "../../../utils/hit"; // 조회수 포맷팅만 유지

const VideoDescription = ({ viewCount, publishedAt, tags, videoDescription }) => {
  const [isExpanded, setIsExpanded] = useState(false); // 확장 상태 관리

  // 조회수 포맷팅
  const formattedViewCount = viewCount ? formatHitCount(viewCount) : "조회수 정보 없음";

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded); // 확장 상태를 토글
  };

  return (
    <div className={styles.descriptionSection}>
      {/* 메타 데이터 */}
      <div className={styles.metaData}>
        <p className={styles.viewCount}>조회수 {formattedViewCount}</p>
        <p className={styles.publishedAt}>{publishedAt || "게시일 정보 없음"}</p>
      </div>

      {/* 태그 */}
      <div className={styles.tags}>
        {tags.map((tag, index) => (
          <span key={index} className={styles.tag}>
            #{tag}
          </span>
        ))}
      </div>

      {/* 설명 텍스트 */}
      <p
        className={`${styles.descriptionText} ${
          isExpanded ? styles.expanded : styles.collapsed
        }`}
      >
        {videoDescription || "설명이 없습니다."}
      </p>

      {/* 더보기/접기 버튼 */}
      {videoDescription && videoDescription.length > 0 && (
        <button className={styles.toggleButton} onClick={toggleExpanded}>
          {isExpanded ? "접기" : "더보기"}
        </button>
      )}
    </div>
  );
};

export default VideoDescription;
