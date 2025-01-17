import { useEffect, useState, useRef } from "react";
import YoutubeService from "../../../apis/youtube";
import { formatISO } from "../../../utils/date.js";
import styles from "./Videos.module.css";
import { useNavigate } from "react-router-dom";

function Videos() {
  const [videos, setVideos] = useState([]); // 비디오 데이터
  const [page, setPage] = useState(1); // 현재 페이지
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const observerTarget = useRef(null); // 관찰 대상
  const navigate = useNavigate();

  // 로컬 캐싱된 데이터 여부 확인 후 로드
  useEffect(() => {
    const cachedVideos = localStorage.getItem("cachedVideos");
    if (cachedVideos) {
      console.log("로드된 로컬 캐싱된 데이터:", cachedVideos);

      try {
        //객체 형태로 저장된 cachedVideos를 하나의 배열로 전처리
        const parsedVideos = JSON.parse(cachedVideos);
        const preprocessedCachedVideos = Object.values(parsedVideos).flat(); // 전처리

        console.log("전처리된 로컬 캐싱 데이터:", preprocessedCachedVideos);

        //전처리된 로컬 캐싱 데이터를 동영상 리스트에 넣기
        if (Array.isArray(preprocessedCachedVideos)) {
          setVideos(preprocessedCachedVideos);
        } else {
          console.error(
            `로컬 데이터 전처리 경고: 전처리된 배열의 type이 ${typeof preprocessedCachedVideos}임`
          );
        }
      } catch (error) {
        console.error("cachedVideos 파싱 중 오류 발생:", error);
      }
    }
  }, []);

  //서버로부터 동영상 리스트 요청 및 기존 리스트와 병합
  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      try {
        const response = await YoutubeService.fetchVideos({
          part: "snippet",
          chart: "mostPopular",
          type: "video",
          regionCode: "KR",
          maxResults: 50,
        });
        const newVideos = response.data.items; // 새로 가져온 동영상 리스트
        const channelIds = newVideos.map((video) => video.snippet.channelId);
        const channelResponse = await YoutubeService.fetchChannels({
          part: "snippet,statistics,contentDetails",
          id: channelIds.join(","),
        });
        const channels = channelResponse.data.items;

        // 새로운 비디오 리스트에 채널 정보를 병합
        const result = newVideos.map((video) => {
          const channelInfo = channels.find(
            (channel) => channel.id === video.snippet.channelId
          );
          return {
            ...video,
            channelInfo: channelInfo ? channelInfo.snippet : null,
          };
        });

        console.log("서버에서 새로 받아온 동영상 리스트 데이터: ", result);

        //기존 데이터와 새로운 데이터를 병합하고 중복 제거
        setVideos((prevVideos) => {
          const updatedVideos = [...prevVideos, ...result].filter(
            (video, index, self) =>
              index === self.findIndex((v) => v.id === video.id)
          );

          console.log(
            "기존 데이터와 병합된 동영상 리스트 데이터: ",
            updatedVideos
          );

          //업데이트된 비디오 리스트를 로컬 스토리지에 저장
          localStorage.setItem("cachedVideos", JSON.stringify(updatedVideos));
          return updatedVideos; // 병합된 동영상 리스트
        });
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideos();
  }, [page]);

  //Intersection Observer API
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          console.log(`observer: 새 페이지 로드...(${page})`);
          setPage((prevPage) => prevPage + 1);
          console.log(`observer: 새 페이지 로드 완료(${page})`);
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

  return (
    <div>
      <ul className={styles.video_list}>
        {videos.map((video) => (
          <li className={styles.video_item} key={video.id.videoId}>
            <img
              className={styles.video_thumbnail}
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              onClick={() => videoOnClick(video.id.videoId)}
            />
            <div className={styles.video_information}>
              <img
                className={styles.video_channel_img}
                src={video.channelInfo.thumbnails.medium.url}
                onClick={() => channelOnClick(video.snippet.channelId)}
              />
              <div>
                <p className={styles.video_title}>{video.snippet.title}</p>
                <p className={styles.video_channeltitle}>
                  {video.snippet.channelTitle}
                </p>
                <div className={styles.video_statistics}>
                  <p className={styles.video_view_count}></p>
                  <p className={styles.video_published_time}>
                    {formatISO(video.snippet.publishTime)}
                  </p>
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
