import { useCallback, useEffect, useState } from "react";
import YoutubeService from "../../../apis/youtube";
import { Banner as _Banner } from "../BannerLayout";
import styles from "./Banner.module.css";
import BannerBtns from "./BannerBtns";

const Banner = ({ id }) => {
  const [channel, setChannel] = useState();
  const { fetchPlayLists, fetchChannels } = YoutubeService;

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

  useEffect(() => {
    (async () => {
      await fetchPlayListData();
    })();
  }, [fetchPlayListData]);

  return (
    <_Banner>
      {channel && (
        <div className={styles.banner}>
          <div className={styles.responsive_flex}>
            <img
              className={styles.banner_img}
              src={channel.snippet.thumbnails.medium.url}
              alt="Channel Thumbnail"
            />
            <div className={styles.flex_column}>
              <div className={styles.banner_title}>{channel.snippet.title}</div>
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

                {channel.snippet.description && (
                  <div className={styles.channel_video_title}>
                    {channel.snippet.description}
                  </div>
                )}
              </div>
            </div>
          </div>

          <BannerBtns />
        </div>
      )}
    </_Banner>
  );
};

export default Banner;
