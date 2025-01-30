import { useState } from "react";
import styles from "./VideoDescription.module.css";
import { formatHitCount } from "../../../utils/hit";

const VideoDescription = ({ video }) => {
  const [isExpanded, setIsExpanded] = useState(false); // 확장 상태 관리
  const tags = video.snippet.tags || [];
  const videoDescription = video.snippet.description;
  const viewCount = parseInt(video.statistics.viewCount || 0);
  const publishedAt = new Date(video.snippet.publishedAt).toLocaleString(
    "ko-KR"
  );

  // 설명 텍스트를 <br> 태그로 줄바꿈 처리하고 태그 포함
  const formattedDescription = videoDescription
    ? `${videoDescription.replace(/\n/g, "<br>")}<br><br>${tags
        .map((tag) => `<span class="${styles.tag}">#${tag}</span>`)
        .join(" ")}`
    : "설명이 없습니다.";

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded); // 확장 상태를 토글
  };

  return (
    <div className={styles.descriptionSection}>
      {/* 메타 데이터 */}
      <div className={styles.metaData}>
        <p className={styles.viewCount}>
          조회수{" "}
          {isExpanded
            ? `${viewCount.toLocaleString()}회`
            : formatHitCount(viewCount)}
        </p>
        <p className={styles.publishedAt}>{publishedAt}</p>
      </div>

      {/* 설명 텍스트와 태그 */}
      <p
        className={`${styles.descriptionText} ${
          isExpanded ? styles.expanded : styles.collapsed
        }`}
        dangerouslySetInnerHTML={{
          __html: formattedDescription,
        }}
      ></p>

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
