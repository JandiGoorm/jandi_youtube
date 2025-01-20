import { useEffect, useState, useRef } from "react";
import YoutubeService from "../../../apis/youtube";
import styles from "./Videos.module.css";
import { useNavigate } from "react-router-dom";

//utils 함수
import { formatISO } from "../../../utils/date.js";
import {formatHitCount} from "../../../utils/hit.js"
import { formatDuration } from "../../../utils/time.js";

function Videos() {
  //비디오 데이터 관련
  const [videos, setVideos] = useState([]); // 비디오 데이터
  const [nextPageToken, setNextPageToken] = useState(); // 다음 페이지 토큰
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  //페이지 관련
  const [page, setPage] = useState(1); // 현재 페이지
  const observerTarget = useRef(null); // 관찰 대상
  const navigate = useNavigate(); //옵저버

  //동영상 자동재생 관련
  const [hoveredVideoId, setHoveredVideoId] = useState(null); // 현재 호버링된 videoId 저장
  const hoveredTimers = useRef({}); // 호버링된 시간 체크

  // 로컬 캐싱된 데이터 로드
  const loadCachedData = () => {
    setIsLoading(true);
    
    // 캐시 데이터가 존재하는지 확인
    const cache = localStorage.getItem("cachedVideos");
    if(!cache){
      console.log("캐시 로드 실패: : 저장된 로컬 데이터 없음");
      return;
    }

    // 캐시 데이터를 배열로 전처리
    const parsedCache = JSON.parse(cache);
    const preprocessedCache = Object.values(parsedCache).flat();
    if(!Array.isArray(preprocessedCache)){
      console.log("캐시 로드 실패: 로컬 데이터의 전처리 오류");
      return;
    }

    console.log("캐시 로드 성공")
    setVideos(preprocessedCache);
    setIsLoading(false);
  }

  // 서버로부터 동영상 리스트 로드
  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      // 동영상 리스트 요청
      const videosResponse = await YoutubeService.fetchVideos({
        part: "snippet,statistics,contentDetails",
        chart: "mostPopular",
        type: "video",
        regionCode: "KR",
        pageToken: nextPageToken,
        maxResults: 50,
      });
      const videoData = videosResponse.data.items;
      setNextPageToken(videosResponse.data.nextPageToken);

      // 채널 정보 요청
      const channelIds = videoData.map((video) => video.snippet.channelId);
      const channelDataResponse = await YoutubeService.fetchChannels({
        part: "snippet,contentDetails",
        id: channelIds.join(","),
      });
      const channelData = channelDataResponse.data.items;
  
      // 데이터 가공
      const newVideos = videoData.map((video) => {
        const videoId = video.id;
        const channelDetail = channelData.find((channel) => channel.id === video.snippet.channelId);
  
        return {
          videoId: videoId, // 영상 ID
          videoThumbnail: video.snippet.thumbnails.medium.url, // 동영상 썸네일
          videoTitle: video.snippet.title, // 동영상 제목
          channelThumbnail: channelDetail?.snippet.thumbnails.medium.url || null, // 채널 썸네일
          channelId: video.snippet.channelId, //게시자 채널 ID
          channelTitle: video.snippet.channelTitle, // 게시자 이름
          viewCount: video.statistics.viewCount || 0, // 조회수
          publishTime: video.snippet.publishedAt, // 게시일
          duration: video.contentDetails.duration || null, // 영상 길이 (ISO 8601 형식)
        };
      });

      // 중복 제거 및 기존 데이터와 병합
      console.log("서버데이터 로드 성공")
      setVideos((prevVideos) => 
        [...prevVideos, ...newVideos].filter(
          (video, index, self) => self.findIndex((v) => v.videoId === video.videoId) === index
        )
      );
    } catch (error) {
      console.error("fetchVideos:", error);
    } finally {
      setIsLoading(false); // 로딩 상태 해제
    }
  };

  // 동영상 호버시 2초 후 해당 videoId로 세팅
  const handleMouseIn = (videoId) => {
    hoveredTimers.current = setTimeout(() => {
      setHoveredVideoId(videoId);
    }, 2000);
  };
  
  // 동영상 호버아웃시 타이머 및 상태 초기화
  const handleMouseOut = () => {
    clearTimeout(hoveredTimers.current);
    setHoveredVideoId(null);
  };
  
  // 비디오 클릭시 해당 비디오로 이동
  const videoOnClick = (videoId) => {
    // 실제 유튜브 링크 포맷: `https://www.youtube.com/watch?v=${videoId}`
    const videoUrl = `watch?v=${videoId}`;
    if (videoUrl.startsWith("http")) {
      window.open(videoUrl, "_blank");
    } else {
      navigate(videoUrl);
    }
  };

  // 채널 썸네일 클릭시 해당 채널로 이동
  const channelOnClick = (channelId) => {
    // 실제 유튜브 링크 포맷: `https://www.youtube.com/channel/${channelId}`;
    const channelUrl = `channel/${channelId}`;
    if (channelUrl.startsWith("http")) {
      window.open(channelUrl, "_blank");
    } else {
      navigate(channelUrl);
    }
  };

  //페이지 첫 로드시 로컬 데이터 확인 후 없다면 서버로부터 가져와 저장
  useEffect(()=>{
    if(loadCachedData() || videos.length === 0) {
      fetchVideos();
      localStorage.setItem("cachedVideos", JSON.stringify(videos));
    }
  }, []);

  //무한스크롤 지원을 위한 옵저버
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setPage((prevPage) => prevPage + 1);
          fetchVideos();
          localStorage.setItem("cachedVideos", JSON.stringify(videos));
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
  }, [isLoading]);

  return (
    <div>
      <ul className={styles.videoList}>
        {videos.map((video) => (
          <li className={styles.videoItem} key={video.videoId}>
            {/* 동영상 플레이어 박스 */}
            <div 
              className={styles.videoBox}
              onMouseEnter={() => handleMouseIn(video.videoId)}
              onMouseLeave={handleMouseOut}
            >
              {hoveredVideoId === video.videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&autohide=1`}
                  className={styles.videoPlayer}
                  allowFullScreen>  
                </iframe>
              ) : (
                <img
                className={styles.videoThumbnail}
                src={video.videoThumbnail}
                onClick={()=> videoOnClick(video.videoId)}
              />
              )}
              
              <p className={styles.videoDuration}>{formatDuration(video.duration)}</p>
            </div>

            {/* 동영상 정보 박스 */}
            <div className={styles.videoInfo}>
              <img
                className={styles.channelThumbnail}
                src={video.channelThumbnail}
                onClick={() => channelOnClick(video.channelId)}
              />
              <div>
                <p className={styles.videoTitle}>{video.videoTitle}</p>
                <p className={styles.channelTitle}>{video.channelTitle}</p>
                <span className={styles.videoViewCount}>{formatHitCount(video.viewCount)}</span>
                <span>·</span>
                <span className={styles.videoPublishTime}>{formatISO(video.publishTime)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div ref={observerTarget} className={styles.loading}></div>
    </div>
  );
}

export default Videos;
