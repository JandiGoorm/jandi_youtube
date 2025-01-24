import React, { useState, useEffect,useRef, useCallback } from "react";
import styles from "./ChannelShortsSection.module.css";
import YoutubeService from "../../../apis/youtube";
import { formatISO } from "../../../utils/date";
import { formatHitCount } from "../../../utils/hit";
import { formatDuration } from "../../../utils/time";
import {formatTotalTime} from "../../../utils/totalTime";
import { useNavigate } from "react-router-dom";


const ChannelShortsSection = ({channelId}) => {
  console.log(channelId);
  const [videos, setVideos] = useState([]);
    const [activeTab, setActiveTab] = useState("최신순");
    const [nextPageToken, setNextPageToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const observerRef = useRef(null);
    const navigate = useNavigate();
  
    const tabs = ["최신순", "인기순", "이름순"];

    const getOrderValue = (tab) => {
      switch (tab) {
        case "최신순":
          return "date";
        case "인기순":
          return "viewCount";
        case "이름순":
          return "title";
        default:
          return "date";
      }
    }; 

  const fetchChannelVideos = async (channelId, order, pageToken = null) =>{
    if (isLoading) return; // 이미 로딩 중이면 실행 안 함
    setIsLoading(true);

    try{
      const response = await YoutubeService.fetchSearch({
        part: "snippet",
        type: "video",
        channelId: channelId,
        regionCode: "KR",
        order: order,
        maxResults: 20,
        pageToken: pageToken,
      });
      const videoIds = response.data.items.map((item) => item.id.videoId);

      const videoDetailsResponse = await YoutubeService.fetchVideos({
        part: "contentDetails,snippet,statistics",
        id: videoIds.join(","),
      });
      const filteredVideos = videoDetailsResponse.data.items.filter((video) => {
        const totalSeconds = formatTotalTime(video.contentDetails.duration);

        return totalSeconds <= 60;
      });

      setVideos((prevVideos) => {
        // 중복 제거 후 병합
        const videoIdsSet = new Set(prevVideos.map((v) => v.id));
        return [...prevVideos, ...filteredVideos.filter((v) => !videoIdsSet.has(v.id))];
      });

      setNextPageToken(response.data.nextPageToken || null);
      
    }catch(error){
      console.log("error: "+ error);
    }finally {
      setIsLoading(false);
    }
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setVideos([]);
    setNextPageToken(null);
  };
  
  useEffect(()=> {
    const order = getOrderValue(activeTab);
    fetchChannelVideos(channelId, order);
  },[activeTab, channelId]);

   const handleClick = useCallback((id) => {
      navigate(`/shorts/${id}`);
    }, [navigate]);

  const handleObserver = useCallback(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && nextPageToken && !isLoading) {
          const order = getOrderValue(activeTab);
          fetchChannelVideos(channelId, order, nextPageToken);
        }
      },
      [channelId, activeTab, nextPageToken, isLoading]
    );
  
    useEffect(() => {
      if (observerRef.current) {
        const observer = new IntersectionObserver(handleObserver, {
          root: null,
          threshold: 1.0,
        });
        observer.observe(observerRef.current);
        return () => observer.disconnect();
      }
    }, [handleObserver]);

  return (
    <div>
      <div className={styles.video_header}>
             {tabs.map((tab) => (
                <button
                    key={tab}
                    className={`${styles.header_button} ${activeTab === tab ? styles.active_header_button : ""}`}
                    onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </button>
              ))}
      </div>
          <ul className={styles.video_list}>
            {videos.map((video) => (
              <li className={styles.video_item} key={video.id} onClick={() => handleClick(video.id)}>
                <div className={styles.img_container}>
                <img
                  className={styles.video_thumbnail}
                  src={video.snippet.thumbnails.high.url}
                  alt={video.snippet.localized.title}
                />
                </div>
                <div className={styles.video_description}>
                  <p className={styles.video_title}>{video.snippet.localized.title}</p>
                  <p className={styles.video_sub}>{formatHitCount(video.statistics.viewCount)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div ref={observerRef} className={styles.observer}></div>
                {isLoading && <p>Loading...</p>}
        </div>
  );
};

export default ChannelShortsSection;
