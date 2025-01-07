import { useEffect, useState, useRef } from "react";
import YoutubeService from "../../../apis/youtube";
import {formatISO} from "../../../utils/date.js"
import styles from "./Videos.module.css";

function Videos() {
  const [videos, setVideos] = useState([]); // 비디오 데이터
  const [page, setPage] = useState(1); // 현재 페이지
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const observerTarget = useRef(null); // 관찰 대상

  useEffect(() => {
    //데이터 로드
    const fetchVideos = async () => {
      setIsLoading(true);
      try {
        const response = await YoutubeService.fetchVideos(page);
        setVideos((prevVideos) =>
          [...prevVideos, ...response.data.items].filter(
            (video, index, self) =>
              index === self.findIndex((v) => v.id.videoId === video.id.videoId)
          )
        );
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideos();
    console.log(videos);
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

  //비디오 클릭시 해당 비디오로 이동
  const videoOnClick = (videoId) => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    window.location.href = videoUrl;
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
                src="https://yt3.ggpht.com/yti/ANjgQV9PAjI-WMfy-zSByztHi-Gw0cX2ORxDdilHqSZCmhaR8w=s108-c-k-c0x00ffffff-no-rj"
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
