import { useCallback, useEffect, useState } from "react";
import { IoMdPlay } from "react-icons/io";
import { IoShuffle } from "react-icons/io5";
import YoutubeService from "../../../apis/youtube";
import InfiniteScroll from "../../../components/InfiniteScroll/InfiniteScroll";
import { useAuth } from "../../../contexts/AuthContext";
import { Banner, BannerLayout, Content } from "../BannerLayout";
import styles from "./Like.module.css";
import VideoItem from "./VideoItem";

const Like = () => {
  const [channel, setChannel] = useState(null);

  const { currentUser } = useAuth();
  const { fetchVideos } = YoutubeService;

  // InfiniteScroll에서 사용할 fetch함수
  const fetchCallback = useCallback(
    async (pageToken = "") => {
      try {
        const response = await fetchVideos({
          part: "snippet,statistics,contentDetails",
          myRating: "like",
          maxResults: 10,
          pageToken,
        });

        return {
          items: response.data.items || [],
          nextToken: response.data.nextPageToken,
        };
      } catch (error) {
        console.error("좋아요 표시 동영상 가져오기 실패:", error.message);
      }
    },
    [fetchVideos]
  );

  // 채널 배너 생성을 위해 fetchVideos를 한번 떙겨옴
  useEffect(() => {
    (async () => {
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
    })();
  }, [currentUser, fetchVideos]);

  return (
    <BannerLayout>
      {channel && (
        <Banner>
          <div className={styles.banner}>
            <div className={styles.responsive_flex}>
              <img
                className={styles.banner_img}
                src={channel.thumbnail}
                alt="Channel Thumbnail"
              />
              <div className={styles.flex_column}>
                <span className={styles.banner_title}>
                  좋아요 표시한 동영상
                </span>
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
        </Banner>
      )}

      <Content>
        <InfiniteScroll fetch={fetchCallback} RenderComponent={VideoItem} />
      </Content>
    </BannerLayout>
  );
};

export default Like;
