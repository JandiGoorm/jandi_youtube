import React, { useState, useEffect, useRef, useCallback } from "react";
import YoutubeService from "../../../../apis/youtube";
import styles from "./PopularPlayList.module.css";
import { formatHitCount } from "../../../../utils/hit";
import { formatDuration } from "../../../../utils/time";
import { formatISO } from "../../../../utils/date";
import { useNavigate } from "react-router-dom";

const PopularPlayList = ({ section }) => {
  const [videos, setVideos] = useState([]);
  const [showButtons, setShowButtons] = useState({ left: false, right: false });
  const navigate = useNavigate();
  const listRef = useRef(null);

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

  useEffect(() => {
    const checkOverflow = () => {
      if (listRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
        setShowButtons({
          left: scrollLeft > 0,
          right: scrollLeft + clientWidth < scrollWidth,
        });
      }
    };
    checkOverflow(); // 초기화 시 버튼 상태 체크

    const list = listRef.current;
    if (list) {
      list.addEventListener("scroll", checkOverflow);
    }

    window.addEventListener("resize", checkOverflow); 
    return () => {
      if (list) {
        list.removeEventListener("scroll", checkOverflow);
      }
      window.removeEventListener("resize", checkOverflow);
    };
  }, [videos]); 

  const scrollList = (direction) => {
    if (listRef.current) {
      const scrollAmount = direction === "left" ? -244 : 244;
      listRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div>
      <h1 className={styles.video_header}>인기 동영상</h1>
      <div className={styles.slider_container}>
        {showButtons.left && (
          <button
            className={`${styles.scroll_button} ${styles.left}`}
            onClick={() => scrollList("left")}
          >
            ◀
          </button>
        )}
        <div className={styles.slider}>
          <ul className={styles.video_list} ref={listRef}>
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
        {showButtons.right && (
          <button
            className={`${styles.scroll_button} ${styles.right}`}
            onClick={() => scrollList("right")}
          >
            ▶
          </button>
        )}
      </div>
    </div>
  );
};

export default PopularPlayList;
