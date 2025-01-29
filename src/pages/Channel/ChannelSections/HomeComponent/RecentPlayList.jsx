import React, { useState, useEffect, useRef, useCallback } from "react";
import YoutubeService from "../../../../apis/youtube";
import styles from "./RecentPlayList.module.css";
import { formatHitCount } from "../../../../utils/hit";
import { formatDuration } from "../../../../utils/time";
import { formatISO } from "../../../../utils/date";
import { formatTotalTime } from "../../../../utils/totalTime";
import { useNavigate } from "react-router-dom";

const RecentPlayList = ({ section }) => {
  const [videos, setVideos] = useState([]);
  const [shorts, setShorts] = useState([]);
  const [videoListShowButtons, setVideoListShowButtons] = useState({
    left: false,
    right: false,
  });
  const [shortsListShowButtons, setShortsListShowButtons] = useState({
    left: false,
    right: false,
  });
  const videoListRef = useRef(null);
  const shortsListRef = useRef(null);
  const navigate = useNavigate();

  const fetchPlayList = async (playlistId) => {
    try {
      const response = await YoutubeService.fetchSearch({
        part: "snippet",
        type: "video",
        channelId: playlistId,
        regionCode: "KR",
        order: "date",
        maxResults: 24,
      });
      const videoIds = response.data.items.map((item) => item.id.videoId);

      const videoDetailsResponse = await YoutubeService.fetchVideos({
        part: "contentDetails,snippet,statistics",
        id: videoIds.join(","),
      });
      const filteredVideos = videoDetailsResponse.data.items.filter((video) => {
        const totalSeconds = formatTotalTime(video.contentDetails.duration);
        return totalSeconds > 60;
      });
      setVideos(filteredVideos);

      const filteredShorts = videoDetailsResponse.data.items.filter((video) => {
        const totalSeconds = formatTotalTime(video.contentDetails.duration);
        return totalSeconds <= 60;
      });
      setShorts(filteredShorts);
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

  const handleShortsClick = useCallback(
    (id) => {
      navigate(`/shorts/${id}`);
    },
    [navigate]
  );

  useEffect(() => {
    fetchPlayList(section.snippet.channelId);
  }, []);

  useEffect(() => {
    const checkOverflow = (ref, setShowButtons) => {
      if (ref.current) {
        const { scrollLeft, scrollWidth, clientWidth } = ref.current;
        setShowButtons({
          left: scrollLeft > 0,
          right: scrollLeft + clientWidth < scrollWidth,
        });
      }
    };
  
    const handleScrollVideos = () => checkOverflow(videoListRef, setVideoListShowButtons);
    const handleScrollShorts = () => checkOverflow(shortsListRef, setShortsListShowButtons);
  
    checkOverflow(videoListRef, setVideoListShowButtons);
    checkOverflow(shortsListRef, setShortsListShowButtons);
  
    const videoList = videoListRef.current;
    const shortsList = shortsListRef.current;
  
    if (videoList) {
      videoList.addEventListener("scroll", handleScrollVideos);
    }
    if (shortsList) {
      shortsList.addEventListener("scroll", handleScrollShorts);
    }
  
    const handleResize = () => {
      checkOverflow(videoListRef, setVideoListShowButtons);
      checkOverflow(shortsListRef, setShortsListShowButtons);
    };
  
    window.addEventListener("resize", handleResize);
  
    return () => {
      if (videoList) {
        videoList.removeEventListener("scroll", handleScrollVideos);
      }
      if (shortsList) {
        shortsList.removeEventListener("scroll", handleScrollShorts);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [videos, shorts]);

  const scrollList = (direction, ref) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -244 : 244;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div>
      {videos.length > 0 && (
        <div>
          <h1 className={styles.video_header}>동영상</h1>
          <div className={styles.slider_container}>
            {videoListShowButtons.left && (
              <button
                className={`${styles.scroll_button} ${styles.left}`}
                onClick={() => scrollList("left", videoListRef)}
              >
                ◀
              </button>
            )}
            <div className={styles.slider}>
              <ul className={styles.video_list} ref={videoListRef}>
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
            {videoListShowButtons.right && (
              <button
                className={`${styles.scroll_button} ${styles.right}`}
                onClick={() => scrollList("right", videoListRef)}
              >
                ▶
              </button>
            )}
          </div>
        </div>
      )}

      {shorts.length > 0 && (
        <div>
          <h1 className={styles.video_header}>Shorts</h1>
          <div className={styles.slider_container}>
            {shortsListShowButtons.left && (
              <button
                className={`${styles.scroll_button} ${styles.left}`}
                onClick={() => scrollList("left", shortsListRef)}
              >
                ◀
              </button>
            )}
            <div className={styles.slider}>
              <ul className={styles.video_list} ref={shortsListRef}>
                {shorts.map((video) => (
                  <li
                    className={styles.shorts_item}
                    key={video.id}
                    onClick={() => handleShortsClick(video.id)}
                  >
                    <div>
                      <img
                        className={styles.shorts_thumbnail}
                        src={video.snippet.thumbnails.medium.url}
                        alt={video.snippet.localized.title}
                      />
                      <p className={styles.shorts_duration}>
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
            {shortsListShowButtons.right && (
              <button
                className={`${styles.scroll_button} ${styles.right}`}
                onClick={() => scrollList("right", shortsListRef)}
              >
                ▶
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentPlayList;
