import React, { useState, useEffect } from "react";
import youtubeAPI from "../../apis/youtubeInstance";
import { useSearchParams } from "react-router-dom";
import styles from "./VideoPlayer.module.css";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import VideoFrame from "./components/VideoFrame";
import VideoDescription from "./components/VideoDescription";
import VideoComments from "./components/VideoComments";
import RecommendedVideos from "./components/RecommendedVideos";
import VideoInfo from "./components/VideoInfo";

function VideoPlayer() {
  // URL의 `v` 파라미터에서 동영상 ID 추출
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  // 상태 관리: 댓글, 추천 동영상, 채널 정보, 동영상 상세 정보 등
  const [comments, setComments] = useState([]); // 댓글 목록
  const [recommendedVideos, setRecommendedVideos] = useState([]); // 추천 동영상 목록
  const [channelInfo, setChannelInfo] = useState(null); // 채널 정보
  const [videoDescription, setVideoDescription] = useState(""); // 동영상 설명
  const [viewCount, setViewCount] = useState(0); // 조회수
  const [publishedAt, setPublishedAt] = useState(""); // 업로드 날짜
  const [tags, setTags] = useState([]); // 태그
  const [totalCommentCount, setTotalCommentCount] = useState(0); // 댓글 총 개수
  const [likeStatus, setLikeStatus] = useState("none"); // 좋아요 상태 (like/dislike/none)

  // 댓글 데이터를 가져오는 함수
  const fetchComments = async () => {
    try {
      const response = await youtubeAPI.get("commentThreads", {
        params: {
          part: "snippet", // 댓글의 세부 정보를 가져옴
          videoId, // 현재 동영상 ID
        },
      });
      setComments(response.data.items || []); // 댓글 데이터를 상태에 저장
    } catch (error) {
      console.error("댓글 불러오기 실패:", error.response?.status || error.message);
    }
  };

  // 동영상 및 채널 정보를 가져오는 함수
  const fetchVideoAndChannelInfo = async () => {
    try {
      // 동영상 정보 가져오기
      const videoResponse = await youtubeAPI.get("videos", {
        params: {
          part: "snippet,statistics", // 동영상의 세부 정보와 통계 정보를 가져옴
          id: videoId, // 현재 동영상 ID
        },
      });
      const videoData = videoResponse.data.items[0];
      const videoSnippet = videoData.snippet;
      const videoStatistics = videoData.statistics;

      // 동영상 정보 상태 업데이트
      setVideoDescription(videoSnippet.description || "설명이 없습니다.");
      setViewCount(parseInt(videoStatistics.viewCount || 0));
      setPublishedAt(new Date(videoSnippet.publishedAt).toLocaleString("ko-KR"));
      setTags(videoSnippet.tags || []);
      setTotalCommentCount(parseInt(videoStatistics.commentCount || 0));

      // 채널 정보 가져오기
      const channelResponse = await youtubeAPI.get("channels", {
        params: {
          part: "snippet,statistics", // 채널의 세부 정보와 통계 정보를 가져옴
          id: videoSnippet.channelId, // 동영상이 속한 채널 ID
        },
      });
      setChannelInfo(channelResponse.data.items[0]); // 채널 정보를 상태에 저장
    } catch (error) {
      console.error("동영상 또는 채널 정보 불러오기 실패:", error.response?.status || error.message);
    }
  };

  // 좋아요 상태를 변경하는 함수
  const handleLike = async (rating) => {
    try {
      const accessToken = localStorage.getItem("access-token"); // 액세스 토큰 가져오기
      if (!accessToken) {
        throw new Error("액세스 토큰이 없습니다. 로그인 상태를 확인하세요.");
      }

      // 좋아요/싫어요 API 호출
      await youtubeAPI.post("videos/rate", null, {
        params: { id: videoId, rating }, // 동영상 ID와 변경할 좋아요 상태
        headers: { Authorization: `Bearer ${accessToken}` }, // 인증 헤더 추가
      });
      setLikeStatus(rating); // 좋아요 상태 업데이트
    } catch (error) {
      console.error("좋아요 상태 변경 실패:", error.response?.status || error.message);
    }
  };

  // 컴포넌트가 마운트되거나 `videoId`가 변경될 때 데이터 가져오기
  useEffect(() => {
    if (videoId) {
      fetchComments(); // 댓글 가져오기
      fetchVideoAndChannelInfo(); // 동영상 및 채널 정보 가져오기
    }
  }, [videoId]);

  // 동영상 ID가 없을 경우 에러 메시지 출력
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
          {/* 동영상 프레임 */}
          <VideoFrame videoId={videoId} />

          {/* 채널 및 동영상 정보 */}
          <VideoInfo
            channelInfo={channelInfo}
            likeStatus={likeStatus}
            handleLike={handleLike} // 좋아요 상태 변경 함수 전달
          />

          {/* 동영상 설명 */}
          <VideoDescription
            viewCount={viewCount}
            publishedAt={publishedAt}
            tags={tags}
            videoDescription={videoDescription}
          />

          {/* 댓글 */}
          <VideoComments totalCommentCount={totalCommentCount} comments={comments} />
        </div>

        {/* 추천 동영상 */}
        <div className={styles.sidebar}>
          <RecommendedVideos videos={recommendedVideos} />
        </div>
      </div>
    </DefaultLayout>
  );
}

export default VideoPlayer;
