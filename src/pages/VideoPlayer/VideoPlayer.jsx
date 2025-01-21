import React, { useState, useEffect } from "react";
import youtubeAPI from "../../apis/youtubeInstance";
import { useSearchParams } from "react-router-dom";
import styles from "./VideoPlayer.module.css";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import VideoFrame from "./components/VideoFrame";
import VideoDescription from "./components/VideoDescription";
import VideoComments from "./components/VideoComments";
import RecommendedVideos from "./components/RecommendedVideos";

function VideoPlayer() {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [comments, setComments] = useState([]);
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [channelInfo, setChannelInfo] = useState(null);
  const [videoDescription, setVideoDescription] = useState("");
  const [viewCount, setViewCount] = useState(0);
  const [publishedAt, setPublishedAt] = useState("");
  const [tags, setTags] = useState([]);
  const [totalCommentCount, setTotalCommentCount] = useState(0);

  const fetchComments = async () => {
    try {
      const response = await youtubeAPI.get("commentThreads", {
        params: {
          part: "snippet",
          videoId,
          maxResults: 20,
        },
      });
      setComments(response.data.items || []);
    } catch (error) {
      console.error("댓글 불러오기 실패:", error.response?.status || error.message);
    }
  };

  const fetchVideoAndChannelInfo = async () => {
    try {
      const videoResponse = await youtubeAPI.get("videos", {
        params: {
          part: "snippet,statistics",
          id: videoId,
        },
      });
      const videoData = videoResponse.data.items[0];
      const videoSnippet = videoData.snippet;
      const videoStatistics = videoData.statistics;

      setVideoDescription(videoSnippet.description || "설명이 없습니다.");
      setViewCount(parseInt(videoStatistics.viewCount || 0));
      setPublishedAt(new Date(videoSnippet.publishedAt).toLocaleString("ko-KR"));
      setTags(videoSnippet.tags || []);
      setTotalCommentCount(parseInt(videoStatistics.commentCount || 0));

      const channelResponse = await youtubeAPI.get("channels", {
        params: {
          part: "snippet,statistics",
          id: videoSnippet.channelId,
        },
      });
      setChannelInfo(channelResponse.data.items[0]);

      const relatedVideosResponse = await youtubeAPI.get("search", {
        params: {
          part: "snippet",
          channelId: videoSnippet.channelId,
          type: "video",
          maxResults: 10,
        },
      });
      setRecommendedVideos(relatedVideosResponse.data.items || []);
    } catch (error) {
      console.error("데이터 불러오기 실패:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (videoId) {
      fetchComments();
      fetchVideoAndChannelInfo();
    }
  }, [videoId]);

  if (!videoId) {
    return (
      <DefaultLayout>
        <div className={styles.error}>동영상 ID가 없습니다. URL을 확인해주세요.</div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <VideoFrame videoId={videoId} />
          {channelInfo && (
            <VideoDescription
              viewCount={viewCount}
              publishedAt={publishedAt}
              tags={tags}
              videoDescription={videoDescription}
            />
          )}
          <VideoComments totalCommentCount={totalCommentCount} comments={comments} />
        </div>
        <aside className={styles.sidebar}>
          <RecommendedVideos videos={recommendedVideos} />
        </aside>
      </div>
    </DefaultLayout>
  );
}

export default VideoPlayer;
