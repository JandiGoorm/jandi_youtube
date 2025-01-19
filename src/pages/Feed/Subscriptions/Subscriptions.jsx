import { useCallback, useRef } from "react";
import YoutubeService from "../../../apis/youtube";
import DefaultLayout from "../../../layouts/DefaultLayout/DefaultLayout";
import InfiniteScroll from "../../../components/InfiniteScroll/InfiniteScroll";
import styles from "./Subscriptions.module.css";
import SubscriptionItem from "./SubscriptionItem";
import { isShortVideo } from "../../../utils/time";

const FeedSubscriptionsPage = () => {
  const youtubeServiceRef = useRef(YoutubeService);

  const fetchDetailVideos = useCallback(async (videosId) => {
    if (!youtubeServiceRef.current) return;
    const { fetchVideos } = youtubeServiceRef.current;
    const temp = [];
    for (let i = 0; i < videosId.length; i += 50) {
      temp.push(videosId.slice(i, i + 50));
    }
    const responses = temp.map((v) => {
      return fetchVideos({
        part: "snippet,contentDetails,statistics",
        id: v.join(","),
      });
    });

    return await Promise.all(responses);
  }, []);

  const fetchRecentVideos = useCallback(
    async (channels, nextPageToken = []) => {
      if (!youtubeServiceRef.current) return;
      const { fetchPlaylistItems } = youtubeServiceRef.current;

      try {
        //채널별 영상 10개 불러오기
        const playlistsRequests = channels.map(async (v, i) => {
          const pageToken = nextPageToken[i] ?? null;
          return fetchPlaylistItems({
            part: "snippet,contentDetails",
            playlistId: v,
            maxResult: 10,
            pageToken,
          });
        });

        //영상의 id만추출
        const playlistResponse = await Promise.all(playlistsRequests);
        const videosId = playlistResponse
          .map((v) => v.data.items)
          .flat()
          .map((v) => v.snippet.resourceId.videoId);

        //shorts 제외
        const detailVideos = await fetchDetailVideos(videosId);

        const flattend = detailVideos.map((v) => v.data.items).flat();
        const filtered = flattend.filter(
          (v) => isShortVideo(v.contentDetails.duration) === false
        );

        return {
          items: filtered.sort(
            (a, b) =>
              new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
          ),
          nextToken: playlistResponse.map((v) => v.data.nextPageToken),
        };
      } catch (error) {
        console.error("구독채널 최근 동영상 fetch 에러:", error);
        return { items: [], nextToken: null };
      }
    },
    [fetchDetailVideos]
  );

  const fetchCallback = async (nextToken = []) => {
    if(nextToken === null) return;
    const allSubs = await youtubeServiceRef.current.fetchAllSubscriptions();
    const uploadChannels = allSubs.map(
      (v) => v.contentDetails.relatedPlaylists.uploads
    );

    const result = await fetchRecentVideos(uploadChannels, nextToken);
    return result;
  };

  return (
    <DefaultLayout>
      <div
        style={{
          flex: 1,
          display: "flex",
          backgroundColor: "white",
          flexDirection: "column",
          padding: "8px 12px",
        }}
      >
        <h3 className={styles.title}>최신순</h3>
        <ul className={styles.grid_box}>
          <InfiniteScroll
            fetch={fetchCallback}
            RenderComponent={SubscriptionItem}
          />
        </ul>
      </div>
    </DefaultLayout>
  );
};

export default FeedSubscriptionsPage;
