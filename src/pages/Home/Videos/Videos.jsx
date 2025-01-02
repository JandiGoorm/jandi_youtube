import { useEffect, useState } from "react";
import YoutubeService from "../../../apis/youtube";
import styles from "./Videos.module.css";

function Videos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // const response = await api.get('/search', {
        //     params: {
        //       part: "snippet",
        //       chart: "mostPopular",
        //       type: "video",
        //       regionCode:"KR",
        //       maxResults: 10,
        //     },
        //   });
        const response = await YoutubeService.fetchVideos();
        setVideos(response.data.items);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

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
    </div>
  );
}

export default Videos;
