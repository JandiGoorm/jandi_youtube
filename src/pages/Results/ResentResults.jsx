import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import YoutubeService from "../../apis/youtube";
import { isShortVideo } from "../../utils/time";
import InfiniteScroll from "../../components/InfiniteScroll/InfiniteScroll";
import LongVideoItem from "./LongVideoItem";

const RecentResults = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search).get("query");

  const { fetchSearch, fetchVideos, fetchChannels } = YoutubeService;

  const fetchCallback = useCallback(
    async (nextPageToken = "") => {
      const videoResponse = await fetchSearch({
        part: "snippet",
        maxResults: 20,
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
      const longData = Object.values(hash)
        .filter((v) => !isShortVideo(v.contentDetails.duration))
        .sort(
          (a, b) =>
            new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
        );

      return {
        items: longData,
        nextToken: videoResponse.data.nextPageToken,
      };
    },
    [fetchChannels, fetchSearch, fetchVideos, searchParams]
  );

  return (
    <InfiniteScroll fetch={fetchCallback} RenderComponent={LongVideoItem} />
  );
};

export default RecentResults;
