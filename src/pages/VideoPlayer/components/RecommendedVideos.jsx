import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import YoutubeService from "../../../apis/youtube";
import styles from "./RecommendedVideos.module.css";
import { formatHitCount } from "../../../utils/hit";
import { formatISO } from "../../../utils/date";

const RecommendedVideos = () => {
  const [videos, setVideos] = useState([]); // 추천 동영상 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 오류 상태
  const navigate = useNavigate(); // 페이지 이동 훅

  const fetchRecommendedVideos = async () => {
    setLoading(true);
    setError(null);

    try {
      // YoutubeService로 API 호출
      const response = await YoutubeService.fetchVideos({
        part: "snippet,statistics,contentDetails",
        chart: "mostPopular",
        regionCode: "KR",
        maxResults: 10,
      });
      setVideos(response.data.items || []); // 동영상 데이터 저장
    } catch (err) {
      console.error("추천 동영상 로드 오류:", err.message);
      setError("추천 동영상을 가져오는 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendedVideos();
  }, []);

  const handleVideoClick = (videoId) => {
    if (videoId) navigate(`/watch?v=${videoId}`);
  };

  if (loading) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
        <button onClick={fetchRecommendedVideos}>다시 시도</button>
      </div>
    );
  }

  return (
    <div className={styles.recommended}>
      <h3>추천 동영상</h3>
        {videos.map((video) => {
          const videoId = video.id;
          const { channelTitle, title, publishedAt } = video.snippet;
          const { viewCount } = video.statistics || {};

          // 조회수와 업로드 날짜 포맷팅
          const formattedViewCount = viewCount ? formatHitCount(viewCount) : "조회수 정보 없음";
          const formattedPublishedAt = publishedAt ? formatISO(publishedAt) : "날짜 정보 없음";

          return (
            <li
              key={videoId}
              className={styles.videoItem}
              onClick={() => handleVideoClick(videoId)}
            >
              {/* 동영상 썸네일 */}
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={title}
                className={styles.thumbnail}
              />
              <div className={styles.info}>
                {/* 동영상 제목 */}
                <p className={styles.title}>{title}</p>
                {/* 동영상 메타 정보: 채널 이름, 조회수, 업로드 날짜 */}
                <p className={styles.meta}>
                  {channelTitle}<br/>
                  조회수 {formattedViewCount} • {formattedPublishedAt}
                </p>
              </div>
            </li>
          );
        })}
    </div>
  );
};

export default RecommendedVideos;
