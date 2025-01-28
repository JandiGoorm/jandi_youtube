import { useCallback } from "react";
import YoutubeService from "../../../apis/youtube";
import InfiniteScroll from "../../../components/InfiniteScroll/InfiniteScroll";
import { BannerLayout, Content } from "../BannerLayout";
import Banner from "./Banner";
import VideoItem from "./VideoItem";

const Like = () => {
  const { fetchVideos } = YoutubeService;

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

  return (
    <BannerLayout>
      <Banner />

      <Content>
        <InfiniteScroll fetch={fetchCallback} RenderComponent={VideoItem} />
      </Content>
    </BannerLayout>
  );
};

export default Like;
