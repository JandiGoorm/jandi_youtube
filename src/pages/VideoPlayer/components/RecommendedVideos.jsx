import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import YoutubeService from "../../../apis/youtube";
import styles from "./RecommendedVideos.module.css";
import { formatHitCount } from "../../../utils/hit";
import { formatISO } from "../../../utils/date";

const RecommendedVideos = () => {
  const [videos, setVideos] = useState([]); // 추천 동영상 데이터 상태
  const [nextPageToken, setNextPageToken] = useState(null); // 다음 페이지 토큰
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const observerTarget = useRef(null); // 무한 스크롤 관찰 대상
  const navigate = useNavigate(); // 페이지 이동 훅

  // 추천 동영상 데이터를 가져오는 함수
  const fetchRecommendedVideos = async () => {
    if (isLoading) return; // 이미 로딩 중이면 요청 방지

    setIsLoading(true);
    try {
      const response = await YoutubeService.fetchVideos({
        part: "snippet,statistics,contentDetails",
        chart: "mostPopular",
        regionCode: "KR",
        maxResults: 10,
        pageToken: nextPageToken,
      });

      const newVideos = response.data.items || [];
      const newNextPageToken = response.data.nextPageToken || null;

      // 중복 제거 및 기존 데이터와 병합
      setVideos((prevVideos) =>
        [...prevVideos, ...newVideos].filter(
          (video, index, self) =>
            self.findIndex((v) => v.id === video.id) === index
        )
      );
      setNextPageToken(newNextPageToken);
    } catch (error) {
      console.error("추천 동영상 로드 오류:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 무한 스크롤 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && nextPageToken) {
          fetchRecommendedVideos();
        }
      },
      { threshold: 0.5 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [isLoading, nextPageToken]);

  // 초기 데이터 로드
  useEffect(() => {
    fetchRecommendedVideos();
  }, []);

  const handleVideoClick = (videoId) => {
    if (videoId) navigate(`/watch?v=${videoId}`);
  };

  return (
    <div className={styles.recommended}>
      <h3 className={styles.recommendedTitle}>추천 동영상</h3>
      <ul className={styles.videoList}>
        {videos.map((video, index) => {
          const videoId = video.id;
          const { channelTitle, title, publishedAt } = video.snippet;
          const { viewCount } = video.statistics || {};

          // 조회수와 업로드 날짜 포맷팅
          const formattedViewCount = viewCount
            ? formatHitCount(viewCount)
            : "조회수 정보 없음";
          const formattedPublishedAt = publishedAt
            ? formatISO(publishedAt)
            : "날짜 정보 없음";

          return (
            <li
              key={`${videoId}-${index}`} // 고유한 키 생성
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
                  {channelTitle}
                  <br />
                  조회수 {formattedViewCount} • {formattedPublishedAt}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      {/* 로딩 표시 */}
      {isLoading && <div className={styles.loading}>로딩 중...</div>}

      {/* 무한 스크롤 관찰 대상 */}
      <div ref={observerTarget} className={styles.observerTarget}></div>
    </div>
  );
};

export default RecommendedVideos;
