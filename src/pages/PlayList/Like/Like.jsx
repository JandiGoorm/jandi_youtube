import React, { useEffect, useState } from "react";
import youtubeAPI from "../../../apis/youtubeInstance";
import styles from "./Like.module.css";

const Like = () => {
  const [videos, setVideos] = useState([]);
  const [channelInfo, setChannelInfo] = useState(null);

  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        const accessToken = localStorage.getItem("access-token");
        if (!accessToken) {
          throw new Error("로그인이 필요합니다. 로그인 후 다시 시도해주세요.");
        }

        const response = await youtubeAPI.get("videos", {
          params: {
            part: "snippet,contentDetails,statistics",
            myRating: "like",
            maxResults: 10,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setVideos(response.data.items || []);
        setChannelInfo({
          title: "좋아요 표시한 동영상",
          description: "좋아요 표시한 모든 동영상",
          thumbnail: response.data.items[0]?.snippet.thumbnails.default.url,
        });
      } catch (error) {
        if (error.response) {
          console.error(
            "좋아요 표시 동영상 가져오기 실패:",
            error.response.status,
            error.response.data
          );
        } else {
          console.error(
            "좋아요 표시 동영상 가져오기 중 네트워크 오류:",
            error.message
          );
        }
      }
    };

    fetchLikedVideos();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        {channelInfo && (
          <div className={styles.channelInfo}>
            <img
              src={channelInfo.thumbnail}
              alt="Channel Thumbnail"
              className={styles.channelThumbnail}
            />
            <h1 className={styles.channelTitle}>{channelInfo.title}</h1>
            <p className={styles.channelDescription}>
              {channelInfo.description}
            </p>
            <button className={styles.playAllButton}>모두 재생</button>
            <button className={styles.shareButton}>공유</button>
          </div>
        )}
      </div>

      <div className={styles.videoList}>
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video.id} className={styles.videoItem}>
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className={styles.videoThumbnail}
              />
              <div className={styles.videoDetails}>
                <h2 className={styles.videoTitle}>{video.snippet.title}</h2>
                <div className={styles.videoStats}>
                  <span>
                    조회수 {video.statistics.viewCount.toLocaleString()}회
                  </span>
                  <span>•</span>
                  <span>
                    {new Date(video.snippet.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                <p className={styles.videoDescription}>
                  {video.snippet.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noVideos}>좋아요 표시한 동영상이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Like;
