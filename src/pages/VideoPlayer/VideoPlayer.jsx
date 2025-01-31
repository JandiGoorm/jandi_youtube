import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import YoutubeService from "../../apis/youtube";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import Header from "../../layouts/DefaultLayout/Header/Header";
import RecommendedVideos from "./RecommendVideos/RecommendedVideos";
import VideoComments from "./VideoComments/VideoComments";
import VideoDescription from "./Video/VideoDescription";
import VideoInfo from "./Video/VideoInfo";
import styles from "./VideoPlayer.module.css";

function VideoPlayer() {
  const [videoDetail, setVideoDetail] = useState();
  const [channelInfo, setChannelInfo] = useState();

  const [searchParams] = useSearchParams();
  const { fetchVideos, fetchChannels } = YoutubeService;

  const videoId = searchParams.get("v");

  // 동영상 및 채널 정보를 가져오는 함수
  const fetchVideoAndChannelInfo = useCallback(async () => {
    try {
      // 동영상 정보 가져오기
      const videoResponse = await fetchVideos({
        part: "snippet,statistics",
        id: videoId,
      });

      const videoData = videoResponse.data.items[0];
      setVideoDetail(videoData);

      // 채널 정보 가져오기
      const channelResponse = await fetchChannels({
        part: "snippet,statistics",
        id: videoData.snippet.channelId,
      });

      setChannelInfo(channelResponse.data.items[0]);
    } catch (error) {
      console.error("동영상 또는 채널 정보 불러오기 실패:", error);
    }
  }, [fetchChannels, fetchVideos, videoId]);

  // 데이터 로드
  useEffect(() => {
    if (!videoId) return;

    fetchVideoAndChannelInfo();
  }, [fetchVideoAndChannelInfo, videoId]);

  if (!videoId) {
    return (
      <DefaultLayout>
        <div className={styles.error}>
          동영상 ID가 없습니다. URL을 확인해주세요.
        </div>
      </DefaultLayout>
    );
  }

  return (
    <div className={styles.center}>
      <Header />
      <div className={styles.container}>
        <div className={styles.content_container}>
          <iframe
            className={styles.video_frame}
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          {videoDetail && (
            <>
              <VideoInfo channelInfo={channelInfo} video={videoDetail} />
              <VideoDescription video={videoDetail} />

              <VideoComments
                videoId={videoId}
                commentCount={videoDetail.statistics.commentCount || 0}
              />
            </>
          )}
        </div>

        <RecommendedVideos />
      </div>
    </div>
  );
}

export default VideoPlayer;
