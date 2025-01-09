import { useRef } from "react";
import YoutubeService from "../../../apis/youtube";
import DefaultLayout from "../../../layouts/DefaultLayout/DefaultLayout";
import InfiniteScroll from "../../../components/InfiniteScroll/InfiniteScroll";
import styles from "./Subscriptions.module.css";
import SubscriptionItem from "./SubscriptionItem";
import SubscriptionsProvider from "./SubsCriptionsProvider";

const FeedSubscriptionsPage = () => {
  const youtubeServiceRef = useRef(YoutubeService);

  const fetchRecentVideos = async (nextToken = []) => {
    try {
      const allSubs = await youtubeServiceRef.current.fetchAllSubscriptions();
      const uploadChannels = allSubs.map(
        (v) => v.contentDetails.relatedPlaylists.uploads
      );

      const res = await youtubeServiceRef.current
        .fetchSubscritionsRecentVideos(uploadChannels, nextToken)
        .catch((e) => console.log(e));

      const videosId = res
        .map((v) => v.data.items)
        .flat()
        .map((v) => v.snippet.resourceId.videoId);

      const detailVideos =
        await youtubeServiceRef.current.fetchDetailVideos(videosId);

      const flattend = detailVideos
        .map((v) => v.data.items)
        .flat()
        .filter((v) => !isShrots(v.contentDetails.duration));

      return {
        items: flattend.sort(
          (a, b) =>
            new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
        ),
        nextToken: res.map((v) => v.data.nextPageToken),
      };
    } catch (error) {
      console.error("구독채널 최근 동영상 fetch 에러:", error);
      return { items: [], nextToken: null };
    }
  };

  function isShrots(duration) {
    const matches = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = matches[1] ? parseInt(matches[1]) : 0;
    const minutes = matches[2] ? parseInt(matches[2]) : 0;
    const seconds = matches[3] ? parseInt(matches[3]) : 0;

    return hours === 0 && minutes <= 1 && seconds <= 30;
  }

  return (
    <DefaultLayout>
      <SubscriptionsProvider>
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
              fetch={fetchRecentVideos}
              RenderComponent={SubscriptionItem}
            />
          </ul>
        </div>
      </SubscriptionsProvider>
    </DefaultLayout>
  );
};

export default FeedSubscriptionsPage;
