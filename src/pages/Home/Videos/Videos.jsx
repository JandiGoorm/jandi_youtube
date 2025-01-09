import { useEffect, useState, useRef } from "react";
import YoutubeService from "../../../apis/youtube";
import {formatISO} from "../../../utils/date.js"
import styles from "./Videos.module.css";
import { useNavigate } from "react-router-dom";


function Videos() {
  const [videos, setVideos] = useState([]); // 비디오 데이터
  const [page, setPage] = useState(1); // 현재 페이지
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const observerTarget = useRef(null); // 관찰 대상
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 캐싱된 데이터를 먼저 로드
    const cachedVideos = localStorage.getItem("cachedVideos");
    if (cachedVideos) {
      try {
        //객체 형태로 저장된 cachedVideos를 하나의 배열로 전처리
        const parsedVideos = JSON.parse(cachedVideos);
        const preprocessedCachedVideos = Object.values(parsedVideos).flat(); // 전처리
        
        //전처리된 로컬 캐싱 데이터를 동영상 리스트에 넣기
        if (Array.isArray(preprocessedCachedVideos)) {
          setVideos(preprocessedCachedVideos);
        } else {
          console.error(`로컬 데이터 전처리 경고: 전처리된 배열의 type이 ${typeof preprocessedCachedVideos}임`);
        }
      } catch (error) {
        console.error("cachedVideos 파싱 중 오류 발생:", error);
      }
    }
  }, []);

  useEffect(() => {
    //동영상+해당 동영상의 채널 정보를 함께 불러옴
    const fetchVideos = async () => {
      setIsLoading(true);
      try {
        const response = await YoutubeService.fetchVideos(50);
        const newVideos = response.data; //새로 가져온 동영상 저장

        setVideos((prevVideos) => {
          // 기존 데이터와 새로운 데이터를 병합하고 중복 제거
          const updatedVideos = [...prevVideos, ...newVideos].filter(
            (video, index, self) =>
              index === self.findIndex((v) => v.id.videoId === video.id.videoId)
          
          );

          // 업데이트된 비디오 리스트를 로컬 스토리지에 저장
          localStorage.setItem("cachedVideos", JSON.stringify(updatedVideos));
          return updatedVideos; // 병합된 데이터를 상태로 업데이트
        });

      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideos();

  }, [page]);

  //옵저버
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setPage((prevPage) => prevPage + 1); 
      }},
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

  // 비디오 클릭시 해당 비디오로 이동
  // 주석 부분은 실제 유튜브 링크로 이동하는 메서드입니다
  // const videoOnClick = (videoId) => {
  //   const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  //   window.location.href = videoUrl;
  // }
  const videoOnClick = (videoId)=>{
    const videoUrl = `/pages/VideoPlayer/VideoPlayer/watch?v=${videoId}`;
    if (videoUrl.startsWith("http")) {
      window.open(videoUrl, "_blank");
    } else {
      navigate(videoUrl);
    }
  }

  // 채널 썸네일 클릭시 해당 채널로 이동
  // 주석 부분은 실제 유튜브 링크로 이동하는 메서드입니다
  // const channelOnClick = (channelId) => {
  //   const channelUrl = `https://www.youtube.com/channel/${channelId}`;
  //   window.location.href = channelUrl;
  // }
  const channelOnClick = (channelId)=>{
    const channelUrl = `/pages/Channel/Channel/${channelId}`;
    if (channelUrl.startsWith("http")) {
      window.open(channelUrl, "_blank");
    } else {
      navigate(channelUrl);
    }
  }

  return (
    <div>
      <ul className={styles.video_list}>
        {videos.map((video) => (
          <li className={styles.video_item} key={video.id.videoId}>
            <img
              className={styles.video_thumbnail}
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              onClick={()=> videoOnClick(video.id.videoId)}
              />
            <div className={styles.video_information}>
              <img
                className={styles.video_channel_img}
                src={video.channelInfo.thumbnails.medium.url}
                onClick={()=> channelOnClick(video.snippet.channelId)}
              />
              <div>
              <p className={styles.video_title}>{video.snippet.title}</p>
              <p className={styles.video_channeltitle}>{video.snippet.channelTitle}</p>
                <div className={styles.video_statistics}>
                  <p className={styles.video_view_count}></p>
                  <p className={styles.video_published_time}>{formatISO(video.snippet.publishTime)}</p>
                </div>
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
