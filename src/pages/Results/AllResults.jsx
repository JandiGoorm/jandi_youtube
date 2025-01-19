import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import YoutubeService from "../../apis/youtube";
import InfiniteScroll from "../../components/InfiniteScroll/InfiniteScroll";
import { isShortVideo } from "../../utils/time";
import styles from "./AllResults.module.css";
import ChannelItem from "./ChannelItem";
import LongVideoItem from "./LongVideoItem";

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
      if(nextPageToken === null) return;
      
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
      <ChannelItem item={channel} />

      <div className={styles.divider} />

      <InfiniteScroll fetch={fetchCallback} RenderComponent={LongVideoItem} />
    </>
  );
};

export default AllResults;
