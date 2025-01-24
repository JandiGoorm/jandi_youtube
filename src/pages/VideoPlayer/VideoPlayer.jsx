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
  const [likeStatus, setLikeStatus] = useState("none");

  const fetchComments = async () => {
    try {
      const response = await youtubeAPI.get("commentThreads", {
        params: {
          part: "snippet",
          videoId,
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
    } catch (error) {
      console.error("동영상 또는 채널 정보 불러오기 실패:", error.response?.status || error.message);
    }
  };
  const fetchVideoCategoryAndRecommended = async () => {
    try {
      // 1. 현재 동영상의 카테고리 ID 추출
      const videoResponse = await youtubeAPI.get("videos", {
        params: {
          part: "snippet",
          id: videoId,
        },
      });
      const categoryId = videoResponse.data.items[0]?.snippet?.categoryId;
  
      if (categoryId) {
        // 2. 같은 카테고리의 추천 영상 가져오기
        const recommendedResponse = await youtubeAPI.get("search", {
          params: {
            part: "snippet",
            videoCategoryId: categoryId,
            type: "video",
            maxResults: 10,
            key: import.meta.env.VITE_YOUTUBE_API_KEY, // 수정된 부분
          },
        });
        setRecommendedVideos(recommendedResponse.data.items || []);
      }
    } catch (error) {
      console.error("추천 동영상 불러오기 실패:", error.response?.data || error.message);
    }
  };
  

  const handleLike = async (rating) => {
    try {
      const accessToken = localStorage.getItem("access-token");
      if (!accessToken) {
        throw new Error("액세스 토큰이 없습니다. 로그인 상태를 확인하세요.");
      }

      await youtubeAPI.post("videos/rate", null, {
        params: { id: videoId, rating },
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setLikeStatus(rating);
    } catch (error) {
      console.error("좋아요 상태 변경 실패:", error.response?.status || error.message);
    }
  };

  useEffect(() => {
    if (videoId) {
      fetchComments();
      fetchVideoAndChannelInfo();
      fetchVideoCategoryAndRecommended();  // 카테고리 기반 추천 영상 추가
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
            <div className={styles.channelSection}>
              <img
                className={styles.channelImage}
                src={channelInfo.snippet.thumbnails.default.url}
                alt={channelInfo.snippet.title}
              />
              <div className={styles.channelDetails}>
                <h3 className={styles.channelTitle}>{channelInfo.snippet.title}</h3>
                <p className={styles.subscriberCount}>
                  구독자 수: {parseInt(channelInfo.statistics.subscriberCount).toLocaleString()}명
                </p>
              </div>
              <div className={styles.channelActions}>
                <button
                  className={styles.likeButton}
                  onClick={() => handleLike(likeStatus === "like" ? "none" : "like")}
                >
                  {likeStatus === "like" ? "좋아요 취소 👍" : "좋아요 👍"}
                </button>
                <button
                  className={styles.dislikeButton}
                  onClick={() => handleLike(likeStatus === "dislike" ? "none" : "dislike")}
                >
                  {likeStatus === "dislike" ? "싫어요 취소 👎" : "싫어요 👎"}
                </button>
              </div>
            </div>
          )}
          <VideoDescription
            viewCount={viewCount}
            publishedAt={publishedAt}
            tags={tags}
            videoDescription={videoDescription}
          />
          <VideoComments totalCommentCount={totalCommentCount} comments={comments} />
        </div>
        <div className={styles.sidebar}>
          <RecommendedVideos videos={recommendedVideos} />
        </div>
      </div>
    </DefaultLayout>
  );
}

export default VideoPlayer;
