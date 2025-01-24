import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import YoutubeService from "../../../apis/youtube";
import styles from "./RecommendedVideos.module.css";

const RecommendedVideos = () => {
  // 추천 동영상 데이터를 저장하는 상태
  const [videos, setVideos] = useState([]);
  // 로딩 상태를 관리
  const [loading, setLoading] = useState(true);
  // 오류 메시지를 관리
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // React Router의 네비게이션 훅

  // 추천 동영상을 가져오는 함수
  const fetchRecommendedVideos = async () => {
    setLoading(true); // 로딩 상태 활성화
    setError(null); // 기존 오류 상태 초기화

    try {
      // YoutubeService를 이용해 추천 동영상 데이터 호출
      const response = await YoutubeService.fetchVideos({
        part: "snippet,statistics,contentDetails", // 필요한 데이터 파트
        chart: "mostPopular", // 인기 동영상 기반
        regionCode: "KR", // 한국 지역 동영상
        maxResults: 10, // 최대 10개의 동영상 가져오기
      });
      setVideos(response.data.items || []); // 동영상 데이터를 상태에 저장
    } catch (err) {
      console.error("추천 동영상 로드 오류:", err.message); // 오류 로그 출력
      setError("추천 동영상을 가져오는 중 문제가 발생했습니다."); // 사용자에게 보여줄 오류 메시지
    } finally {
      setLoading(false); // 로딩 상태 비활성화
    }
  };

  // 컴포넌트가 마운트될 때 추천 동영상 가져오기
  useEffect(() => {
    fetchRecommendedVideos();
  }, []);

  // 동영상 항목 클릭 시 해당 동영상으로 이동
  const handleVideoClick = (videoId) => {
    if (videoId) navigate(`/watch?v=${videoId}`); // URL 변경을 통해 상세 페이지로 이동
  };

  // 로딩 중일 때 보여줄 컴포넌트
  if (loading) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  // 오류 발생 시 보여줄 컴포넌트
  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
        {/* 오류 상태에서 다시 시도 버튼 */}
        <button onClick={fetchRecommendedVideos}>다시 시도</button>
      </div>
    );
  }

  // 추천 동영상 목록 렌더링
  return (
    <div className={styles.recommended}>
      <h3>추천 동영상</h3>
      <ul>
        {/* 동영상 데이터를 순회하여 각각의 항목 렌더링 */}
        {videos.map((video) => {
          const videoId = video.id; // 동영상 ID
          const { channelTitle, title, publishedAt } = video.snippet; // 제목, 채널 이름, 게시 날짜
          const { viewCount } = video.statistics || {}; // 조회수 (통계 데이터가 있을 경우)
          const formattedDate = new Date(publishedAt).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }); // 게시 날짜를 한국어 형식으로 변환

          return (
            <li
              key={videoId}
              className={styles.videoItem} // 스타일 적용
              onClick={() => handleVideoClick(videoId)} // 클릭 시 상세 페이지로 이동
            >
              {/* 동영상 썸네일 */}
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={title} // 이미지의 대체 텍스트
                className={styles.thumbnail}
              />
              <div className={styles.info}>
                {/* 동영상 제목 */}
                <p className={styles.title}>{title}</p>
                {/* 동영상 메타 정보: 채널 이름, 조회수, 게시 날짜 */}
                <p className={styles.meta}>
                  {channelTitle} • 조회수 {viewCount ? parseInt(viewCount).toLocaleString() : "N/A"} • {formattedDate}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecommendedVideos;
