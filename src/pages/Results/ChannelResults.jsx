import { useLocation } from "react-router-dom";
import YoutubeService from "../../apis/youtube";
import { useCallback } from "react";
import InfiniteScroll from "../../components/InfiniteScroll/InfiniteScroll";
import ChannelItem from "./ChannelItem";

const ChannelResults = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search).get("query");

  const { fetchSearch, fetchChannels } = YoutubeService;

  const fetchCallback = useCallback(
    async (nextPageToken = "") => {
      if (nextPageToken === null) return
      const channelResponse = await fetchSearch({
        part: "snippet",
        maxResults: 10,
        q: searchParams,
        type: "channel",
        pageToken: nextPageToken,
      });

      const hash = {};
      channelResponse.data.items.forEach((v) => {
        hash[v.id.channelId] = v;
      });

      const channelsId = channelResponse.data.items.map((v) => {
        return v.snippet.channelId;
      });

      const channelDetail = await fetchChannels({
        part: "snippet,statistics",
        id: channelsId.join(","),
      });

      channelDetail.data.items.forEach((v) => {
        hash[v.id] = v;
      });

      const channelData = Object.values(hash);
      return {
        items: channelData,
        nextToken: channelResponse.data.nextPageToken,
      };
    },
    [fetchChannels, fetchSearch, searchParams]
  );

  return <InfiniteScroll fetch={fetchCallback} RenderComponent={ChannelItem} />;
};

export default ChannelResults;
