import { useEffect, useState, useRef } from "react";
import YoutubeService from "../../../apis/youtube";
import styles from "./Videos.module.css";

function Videos() {
  const [videos, setVideos] = useState([]); // 비디오 데이터
  const [page, setPage] = useState(1); // 현재 페이지
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const observerTarget = useRef(null); // 관찰 대상

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      try {
        const response = await YoutubeService.fetchVideos(page);
        setVideos((prevVideos) => [...prevVideos, ...response.data.items]);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideos();
  }, [page]);

  //옵저버 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setPage((prevPage) => prevPage + 1); // 페이지 증가
        }
      },
      { threshold: 0.5 } // 대상이 100% 보일 때 실행
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
      <ul className={styles.video_list}>
        {videos.map((video) => (
          <li className={styles.video_item} key={video.id.videoId}>
            <img
              className={styles.video_thumbnail}
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
            />
            <div className={styles.video_description}>
              <p className={styles.video_title}>{video.snippet.title}</p>
              <p className={styles.video_channeltitle}>
                {video.snippet.channelTitle}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div ref={observerTarget} className={styles.loading}></div>
    </div>
  );
}

export default Videos;
