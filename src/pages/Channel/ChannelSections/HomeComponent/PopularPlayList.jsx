import React, { useState, useEffect, useCallback } from "react";
import YoutubeService from "../../../../apis/youtube";
import styles from "./PopularPlayList.module.css";
import { formatHitCount } from "../../../../utils/hit";
import { formatDuration } from "../../../../utils/time";
import { formatISO } from "../../../../utils/date";
import { useNavigate } from "react-router-dom";
import { PageEndPoints } from "../../../../constants/api";

const PopularPlayList = ({ section }) => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const fetchPlayList = async (playlistId) => {
    try {
      console.log(playlistId);
      const response = await YoutubeService.fetchSearch({
        part: "snippet",
        type: "video",
        channelId: playlistId,
        regionCode: "KR",
        order: "viewCount",
        maxResults: 12,
      });
      const videoIds = response.data.items.map((item) => item.id.videoId);

      const videoDetailsResponse = await YoutubeService.fetchVideos({
        part: "contentDetails,snippet,statistics",
        id: videoIds.join(","),
      });

      setVideos(videoDetailsResponse.data.items);
    } catch (error) {
      console.log("error: " + error);
    }
  };
  const handleClick = useCallback(
    (id) => {
      navigate(`/watch?v=${id}`);
    },
    [navigate]
  );

  useEffect(() => {
    fetchPlayList(section.snippet.channelId);
  }, []);

  return (
    <div>
      <h1 className={styles.video_header}>인기 동영상</h1>
      <ul className={styles.video_list}>
        {videos.map((video) => (
          <li
            className={styles.video_item}
            key={video.id}
            onClick={() => handleClick(video.id)}
          >
            <div>
              <img
                className={styles.video_thumbnail}
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.localized.title}
              />
              <p className={styles.video_duration}>
                {formatDuration(video.contentDetails.duration)}
              </p>
            </div>
            <div className={styles.video_description}>
              <p className={styles.video_title}>
                {video.snippet.localized.title}
              </p>
              <p className={styles.video_sub}>
                {formatHitCount(video.statistics.viewCount)}﹒
                {formatISO(video.snippet.publishedAt)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularPlayList;
