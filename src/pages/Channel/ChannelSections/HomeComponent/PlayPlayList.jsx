import React, { useState, useEffect, useRef, useCallback } from "react";
import YoutubeService from "../../../../apis/youtube";
import styles from "./PlayPlayList.module.css";

const PlayPlayList = ({ section }) => {
  const [lists, setLists] = useState([]);
  const [showButtons, setShowButtons] = useState({ left: false, right: false });
  const listRef = useRef(null);

  const fetchPlayList = async (channelId) => {
    try {
      const response = await YoutubeService.fetchPlayLists({
        part: "snippet,contentDetails",
        channelId: channelId,
      });
      const data = response.data.items;
      console.log(data);

      setLists(data);
    } catch (error) {
      console.log("error: " + error);
    }
  };

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

    checkOverflow();

    const list = listRef.current;
    if (list) {
      list.addEventListener("scroll", checkOverflow);
    }

    const handleResize = () => {
      checkOverflow();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (list) {
        list.removeEventListener("scroll", checkOverflow);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [lists]);

  const scrollList = (direction) => {
    if (listRef.current) {
      const scrollAmount = direction === "left" ? -244 : 244;
      listRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div>
      <h1 className={styles.video_header}>생성된 재생목록</h1>
      <div className={styles.slider_container}>
        {showButtons.left && (
          <button
            className={`${styles.scroll_button} ${styles.left}`}
            onClick={() => scrollList("left")}
          >
            ◀
          </button>
        )}
        <div className={styles.slider} ref={listRef}>
          <ul className={styles.video_list}>
            {lists.map((list) => (
              <li className={styles.video_item} key={list.id}>
                <div>
                  <img
                    className={styles.video_thumbnail}
                    src={list.snippet.thumbnails.medium.url}
                    alt={list.snippet.localized.title}
                  />
                  <p className={styles.video_duration}>
                    동영상 {list.contentDetails.itemCount} 개
                  </p>
                </div>
                <div className={styles.video_description}>
                  <p className={styles.video_title}>
                    {list.snippet.localized.title}
                  </p>
                  <p className={styles.video_sub}>모든 재생목록 보기</p>
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

export default PlayPlayList;
