import React from "react";
import styles from "../VideoPlayer.module.css";

// VideoFrame 컴포넌트 정의
// videoId: 재생하려는 유튜브 동영상의 ID를 props로 전달
const VideoFrame = ({ videoId }) => (
  // iframe 태그로 유튜브 동영상을 삽입
  <iframe
    className={styles.videoFrame} // 스타일 적용
    src={`https://www.youtube.com/embed/${videoId}`} // 유튜브 동영상 URL 구성
    title="YouTube video player" // 접근성을 위한 title 속성
    frameBorder="0" // iframe 테두리 제거
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" // 유튜브에서 제공하는 다양한 허용 기능
    allowFullScreen // 전체 화면 재생 허용
  ></iframe>
);

// VideoFrame 컴포넌트 내보내기
export default VideoFrame;
