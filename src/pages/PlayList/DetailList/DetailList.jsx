import { useCallback } from "react";
import YoutubeService from "../../../apis/youtube";
import InfiniteScroll from "../../../components/InfiniteScroll/InfiniteScroll";
import { BannerLayout, Content } from "../BannerLayout";
import Banner from "./Banner";
import VideoItem from "./VideoItem";

const DetailList = ({ id }) => {
  const { fetchPlaylistItems, fetchVideos } = YoutubeService;

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

  return (
    <BannerLayout>
      <Banner id={id} />

      <Content>
        <InfiniteScroll fetch={fetchCallback} RenderComponent={VideoItem} />
      </Content>
    </BannerLayout>
  );
};

export default DetailList;
