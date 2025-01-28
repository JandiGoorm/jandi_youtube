import { useCallback, useEffect, useState } from "react";
import { BsBookmark } from "react-icons/bs";
import { FiMoreVertical } from "react-icons/fi";
import { IoMdPlay } from "react-icons/io";
import { PiShareFatLight } from "react-icons/pi";
import YoutubeService from "../../../apis/youtube";
import InfiniteScroll from "../../../components/InfiniteScroll/InfiniteScroll";
import { Banner, BannerLayout, Content } from "../BannerLayout";
import styles from "./DetailList.module.css";
import VideoItem from "./VideoItem";

const DetailList = ({ id }) => {
  const [channel, setChannel] = useState();
  const { fetchPlayLists, fetchPlaylistItems, fetchVideos, fetchChannels } =
    YoutubeService;

  /**
   * banner를 위해 초기 데이터를 가져오는 함수입니다.
   */
  const fetchPlayListData = useCallback(async () => {
    try {
      const response = await fetchPlayLists({
        part: "snippet,contentDetails",
        id,
      });

      const items = response.data.items[0];
      const channelId = items.snippet.channelId;

      const channelResponse = await fetchChannels({
        part: "snippet,contentDetails",
        id: channelId,
      });

      const channelDetail = channelResponse.data.items[0];

      setChannel({ ...items, channel: channelDetail });
      return response.data.items[0].id;
    } catch (err) {
      console.error("Failed to fetch playlist data:", err);
    }
  }, [fetchChannels, fetchPlayLists, id]);

  /**
   *  InfiniteScroll 컴포넌트에서 사용하는 콜백 함수입니다.
   */
  const fetchCallback = useCallback(
    async (pageToken = "") => {
      try {
        const playlistsResponse = await fetchPlaylistItems({
          part: "snippet,contentDetails",
          playlistId: id,
          maxResults: 10,
          pageToken,
        });

        const listIds = playlistsResponse.data.items
          .map((v) => v.contentDetails.videoId)
          .join(",");

        const videosResponse = await fetchVideos({
          part: "snippet,contentDetails,statistics",
          id: listIds,
        });

        return {
          items: videosResponse.data.items || [],
          nextToken: playlistsResponse.data.nextPageToken,
        };
      } catch (err) {
        console.error("Failed to fetch playlist data:", err);
      }
    },
    [fetchPlaylistItems, fetchVideos, id]
  );

  useEffect(() => {
    (async () => {
      await fetchPlayListData();
    })();
  }, [fetchPlayListData]);

  return (
    <BannerLayout>
      {channel && (
        <Banner>
          <div className={styles.banner}>
            <div className={styles.responsive_flex}>
              <img
                className={styles.banner_img}
                src={channel.snippet.thumbnails.medium.url}
                alt="Channel Thumbnail"
              />
              <div className={styles.flex_column}>
                <div className={styles.banner_title}>
                  {channel.snippet.title}
                </div>
                <div className={styles.banner_meta}>
                  <div className={styles.channel_info}>
                    <img
                      className={styles.channel_img}
                      src={channel.channel.snippet.thumbnails.default.url}
                      alt="Channel Thumbnail"
                    />
                    <span className={styles.channel_name}>
                      게시자: {channel.channel.snippet.title}
                    </span>
                  </div>

                  <span className={styles.banner_detail}>
                    <p>재생목록</p>
                    <p>•</p>
                    <p>동영상 {channel.contentDetails.itemCount}개</p>
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.banner_btns}>
              <button className={styles.play_btn}>
                <IoMdPlay />
                <span>모두 재생</span>
              </button>
              <div className={styles.icons_box}>
                <button>
                  <BsBookmark size={18} />
                </button>
                <button>
                  <PiShareFatLight size={24} />
                </button>
                <button>
                  <FiMoreVertical size={18} />
                </button>
              </div>
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

export default DetailList;
