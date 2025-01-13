import React, { useState, useEffect } from "react";
import styles from "./ChannelVideoSection.module.css";
import YoutubeService from "../../../apis/youtube";
import { formatISO } from "../../../utils/date";
import { formatHitCount } from "../../../utils/hit";
import { formatDuration } from "../../../utils/time";


const ChannelVideoSection = ({channelId}) => {
  console.log(channelId);
  const [videos, setVideos] = useState([]);
  const [activeTab, setActiveTab] = useState("최신순");

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
  const fetchChannelVideos = async (channelId, order) =>{
    try{     
      const response = await YoutubeService.fetchSearch({
        part: "snippet",
        type: "video",
        channelId: channelId,
        regionCode: "KR",
        order: order,
        maxResults: 20,
      });
      const videoIds = response.data.items.map((item) => item.id.videoId);

      const videoDetailsResponse = await YoutubeService.fetchVideos({
        part: "contentDetails,snippet,statistics",
        id: videoIds.join(","),
      });
      const filteredVideos = videoDetailsResponse.data.items.filter((video) => {
        const duration = video.contentDetails.duration;

        // ISO 8601 형식의 재생 시간을 초 단위로 변환
        const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        const hours = parseInt(match[1] || "0", 10);
        const minutes = parseInt(match[2] || "0", 10);
        const seconds = parseInt(match[3] || "0", 10);
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;

        // 쇼츠(1분 이하 영상) 제외
        return totalSeconds > 60;
      });

      console.log(filteredVideos);
      setVideos(filteredVideos);
      
    }catch(error){
      console.log("error: "+ error);
    }
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  
  useEffect(()=> {
    const order = getOrderValue(activeTab);
    fetchChannelVideos(channelId, order);
  },[activeTab, channelId]);

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
              <li className={styles.video_item} key={video.id}>
                <div>
                <img
                  className={styles.video_thumbnail}
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.localized.title}
                />
                <p className={styles.video_duration}>{formatDuration(video.contentDetails.duration)}</p>
                </div>
                <div className={styles.video_description}>
                  <p className={styles.video_title}>{video.snippet.localized.title}</p>
                  <p className={styles.video_sub}>{formatHitCount(video.statistics.viewCount)}﹒{formatISO(video.snippet.publishedAt)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
  );
};

export default ChannelVideoSection;
