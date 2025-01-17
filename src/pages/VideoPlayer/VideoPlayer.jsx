import React, { useState, useEffect } from "react";
import youtubeAPI from "../../apis/youtubeInstance";
import { useSearchParams } from "react-router-dom";
import styles from "./VideoPlayer.module.css";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import VideoFrame from "./components/VideoFrame";
import VideoDescription from "./components/VideoDescription";
import VideoComments from "./components/VideoComments";

function VideoPlayer() {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [comments, setComments] = useState([]);
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
      if (error.response) {
        console.error("댓글 불러오기 실패:", error.response.status, error.response.data);
      } else {
        console.error("댓글 불러오기 중 네트워크 오류:", error.message);
      }
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
      const videoSnippet = videoData?.snippet;
      const videoStatistics = videoData?.statistics;
      const channelId = videoSnippet?.channelId;

      setVideoDescription(videoSnippet?.description || "설명이 없습니다.");
      setViewCount(parseInt(videoStatistics?.viewCount || 0));
      setPublishedAt(new Date(videoSnippet?.publishedAt).toLocaleString("ko-KR"));
      setTags(videoSnippet?.tags || []);
      setTotalCommentCount(parseInt(videoStatistics?.commentCount || 0));

      const channelResponse = await youtubeAPI.get("channels", {
        params: {
          part: "snippet,statistics",
          id: channelId,
        },
      });
      setChannelInfo(channelResponse.data.items[0]);
    } catch (error) {
      if (error.response) {
        console.error("동영상 또는 채널 정보 불러오기 실패:", error.response.status, error.response.data);
      } else {
        console.error("동영상 또는 채널 정보 불러오기 중 네트워크 오류:", error.message);
      }
    }
  };

  const handleLike = async (rating) => {
    try {
      const accessToken = localStorage.getItem("access-token");
      if (!accessToken) {
        throw new Error("액세스 토큰이 없습니다. 로그인 상태를 확인하세요.");
      }
  
      await youtubeAPI.post("videos/rate", null, {
        params: {
          id: videoId,
          rating,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setLikeStatus(rating);
    } catch (error) {
      if (error.response) {
        console.error("좋아요 상태 변경 실패:", error.response.status, error.response.data);
      } else {
        console.error("좋아요 상태 변경 중 네트워크 오류:", error.message);
      }
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

        <VideoComments
          totalCommentCount={totalCommentCount}
          comments={comments}
        />
      </div>
    </DefaultLayout>
  );
}

export default VideoPlayer;
