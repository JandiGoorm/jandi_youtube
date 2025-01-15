import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import YoutubeService from "../../apis/youtube";
import InfiniteScroll from "../../components/InfiniteScroll/InfiniteScroll";
import { formatSubscriberCount } from "../../utils/channel";
import { isShortVideo } from "../../utils/time";
import styles from "./AllResults.module.css";
import LongVideoItem from "./LongVideoItem";
import SkeletonImage from "../../components/SkeletonImage/SkeletonImage";

const AllResults = () => {
  const [channel, setChannel] = useState(null);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search).get("query");

  const { fetchSearch, fetchChannels, fetchVideos } = YoutubeService;

  const fetchSearchChannel = useCallback(async () => {
    const channelResponse = await fetchSearch({
      part: "snippet",
      maxResults: 1,
      q: searchParams,
      type: "channel",
    });

    const channel = channelResponse.data.items[0];
    const channelDetail = await fetchChannels({
      part: "snippet,statistics",
      id: channel.id.channelId,
    });

    setChannel(channelDetail.data.items[0]);
  }, [fetchChannels, fetchSearch, searchParams]);

  const fetchCallback = useCallback(
    async (nextPageToken = "") => {
      const videoResponse = await fetchSearch({
        part: "snippet",
        maxResults: 10,
        q: searchParams,
        type: "video",
        pageToken: nextPageToken,
      });

      const videos = videoResponse.data.items;
      const hash = {};
      videos.forEach((v) => {
        hash[v.id.videoId] = v;
      });

      const videosId = videos.map((video) => video.id.videoId).join(",");
      const videosDetailResponse = await fetchVideos({
        part: "snippet,statistics,contentDetails",
        id: videosId,
      });

      const channelsId = videos
        .map((video) => video.snippet.channelId)
        .join(",");
      const channelsResponse = await fetchChannels({
        part: "snippet,statistics",
        id: channelsId,
      });

      const channels = channelsResponse.data.items;

      const videoDetail = videosDetailResponse.data.items;
      videoDetail.forEach((v) => {
        const channel = channels.find(
          (channel) => channel.id === v.snippet.channelId
        );
        hash[v.id] = {
          ...hash[v.id],
          contentDetails: v.contentDetails,
          statistics: v.statistics,
          channel,
          id: v.id,
        };
      });

      //shorts가 아닌 value만 배열로만듬
      const longData = Object.values(hash).filter(
        (v) => !isShortVideo(v.contentDetails.duration)
      );

      return {
        items: longData,
        nextToken: videoResponse.data.nextPageToken,
      };
    },
    [fetchChannels, fetchSearch, fetchVideos, searchParams]
  );

  useEffect(() => {
    (async () => {
      await fetchSearchChannel();
    })();
  }, [fetchSearchChannel]);

  return (
    <>
      <div className={styles.channel_box}>
        <div className={styles.channel_img_box}>
          <SkeletonImage
            Image={
              <img
                src={channel?.snippet.thumbnails.medium.url}
                alt="channel_thumbnail"
                className={styles.channel_img}
              />
            }
            skeletonStyle={{ minHeight: "200px" }}
          />
        </div>

        <div className={styles.channel_info}>
          <div className={styles.info_text}>
            <span>{channel?.snippet.title}</span>
            <div className={styles.channel_detail}>
              <div className={styles.channel_stats}>
                <span>{channel?.snippet.customUrl}</span>
                <span>•</span>
                <span>
                  구독자
                  {formatSubscriberCount(channel?.statistics.subscriberCount)}
                </span>
              </div>
              <div className={styles.channel_des}>
                {channel?.snippet.description}
              </div>
            </div>
          </div>
          <button className={styles.subs_btn}>구독</button>
        </div>
      </div>

      <div className={styles.divider} />

      <InfiniteScroll fetch={fetchCallback} RenderComponent={LongVideoItem} />
    </>
  );
};

export default AllResults;
