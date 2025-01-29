import { useCallback, useEffect, useState } from "react";
import YoutubeService from "../../../apis/youtube";
import { useAuth } from "../../../contexts/AuthContext";
import { Banner as _Banner } from "../BannerLayout";
import styles from "./Banner.module.css";
import { IoMdPlay } from "react-icons/io";
import { IoShuffle } from "react-icons/io5";

const Banner = () => {
  const [channel, setChannel] = useState();

  const { currentUser } = useAuth();
  const { fetchVideos } = YoutubeService;

  const fetchChannelDetail = useCallback(async () => {
    try {
      const response = await fetchVideos({
        part: "snippet,statistics",
        myRating: "like",
      });

      const items = response.data.items || [];

      setChannel({
        title: currentUser.name,
        thumbnail: items[0]?.snippet.thumbnails.medium.url || "",
        itemCount: response.data.pageInfo.totalResults || 0,
      });
    } catch (error) {
      console.error("좋아요 표시 동영상 가져오기 실패:", error.message);
    }
  }, [currentUser.name, fetchVideos]);

  useEffect(() => {
    (async () => {
      await fetchChannelDetail();
    })();
  }, [fetchChannelDetail]);

  return (
    <_Banner>
      {channel && (
        <div className={styles.banner}>
          <div className={styles.responsive_flex}>
            <img
              className={styles.banner_img}
              src={channel.thumbnail}
              alt="channel_thumbnail"
            />
            <div className={styles.flex_column}>
              <span className={styles.banner_title}>좋아요 표시한 동영상</span>
              <div className={styles.banner_meta}>
                <span>{currentUser.name}</span>
                <span className={styles.banner_detail}>
                  동영상 {channel.itemCount}개
                </span>
              </div>
            </div>
          </div>

          <div className={styles.banner_btns}>
            <button className={styles.like_btn}>
              <IoMdPlay />
              <span>모두 재생</span>
            </button>
            <button className={styles.shuffle_btn}>
              <IoShuffle size={24} />
              <span>셔플</span>
            </button>
          </div>
        </div>
      )}
    </_Banner>
  );
};

export default Banner;
