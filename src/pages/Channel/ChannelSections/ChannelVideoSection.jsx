import React, { useState, useEffect } from "react";
import styles from "./ChannelVideoSection.module.css";
import YoutubeService from "../../../apis/youtube";
import { formatISO } from "../../../utils/date";
import { formatHitCount } from "../../../utils/hit";
import { formatDuration } from "../../../utils/time";


const ChannelVideoSection = ({channelId}) => {
  console.log(channelId);
  const [videos, setVideos] = useState([]);
  
  const fetchChannelVideos = async (channelId) =>{
    try{
      const response = await YoutubeService.fetchChannelVideos(20, channelId);
      const videoIds = response.data.items.map((item) => item.id.videoId);

      const videoDetailsResponse = await YoutubeService.fetchVideoDetails(videoIds.join(","));
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
  
  useEffect(()=> {
    fetchChannelVideos(channelId);
  },[]);

  return (
    <div>
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