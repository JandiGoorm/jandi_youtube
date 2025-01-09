import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./VideoPlayer.module.css";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";

function VideoPlayer() {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [comments, setComments] = useState([]);
  const [channelInfo, setChannelInfo] = useState(null);
  const [videoDescription, setVideoDescription] = useState(""); // 동영상 설명 상태
  const [viewCount, setViewCount] = useState(0); // 조회수
  const [publishedAt, setPublishedAt] = useState(""); // 업로드 시간
  const [tags, setTags] = useState([]); // 태그
  const [totalCommentCount, setTotalCommentCount] = useState(0); // 총 댓글 수 상태
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  // 댓글 불러오기
  const fetchComments = async (videoId) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}`
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setComments(data.items || []);
    } catch (error) {
      console.error("댓글을 불러오는 중 오류 발생:", error);
    }
  };

  // 채널 정보 및 동영상 정보 불러오기
  const fetchVideoAndChannelInfo = async (videoId) => {
    try {
      const videoResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`
      );
      if (!videoResponse.ok) throw new Error(`HTTP error! status: ${videoResponse.status}`);
      const videoData = await videoResponse.json();
      const videoSnippet = videoData.items[0]?.snippet;
      const videoStatistics = videoData.items[0]?.statistics;
      const channelId = videoSnippet?.channelId;

      // 동영상 설명 업데이트
      setVideoDescription(videoSnippet?.description || "설명이 없습니다.");

      // 조회수 및 업로드 시간 업데이트
      setViewCount(parseInt(videoStatistics?.viewCount || 0));
      setPublishedAt(new Date(videoSnippet?.publishedAt).toLocaleString("ko-KR"));

      // 태그 업데이트
      setTags(videoSnippet?.tags || []);

      // 총 댓글 수 업데이트
      setTotalCommentCount(parseInt(videoStatistics?.commentCount || 0));

      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`
      );
      if (!channelResponse.ok) throw new Error(`HTTP error! status: ${channelResponse.status}`);
      const channelData = await channelResponse.json();
      setChannelInfo(channelData.items[0]);
    } catch (error) {
      console.error("채널 정보 또는 동영상 정보를 불러오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (videoId) {
      fetchComments(videoId);
      fetchVideoAndChannelInfo(videoId);
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
        {/* 동영상 플레이어 */}
        <iframe
          className={styles.videoFrame}
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        {/* 채널 정보 및 동영상 액션 */}
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
              <button className={styles.subscribeButton}>구독</button>
              <button className={styles.likeButton}>좋아요 👍</button>
              <button className={styles.shareButton}>공유</button>
              <button className={styles.saveButton}>저장</button>
            </div>
          </div>
        )}

        {/* 동영상 설명 */}
        <div className={styles.descriptionSection}>
          <div className={styles.metaData}>
            <p className={styles.viewCount}>조회수 {viewCount.toLocaleString()}회</p>
            <p className={styles.publishedAt}>{publishedAt}</p>
          </div>
          <div className={styles.tags}>
            {tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                #{tag}
              </span>
            ))}
          </div>
          <p className={styles.descriptionText}>{videoDescription}</p>
        </div>

        {/* 댓글 섹션 */}
        <div className={styles.commentsSection}>
          <h2>
            댓글 ({totalCommentCount.toLocaleString()}개)
          </h2>
          {comments.length > 0 ? (
            <ul className={styles.commentsList}>
              {comments.map((comment) => (
                <li key={comment.id} className={styles.comment}>
                  <p className={styles.author}>
                    {comment.snippet.topLevelComment.snippet.authorDisplayName}:
                  </p>
                  <p className={styles.text}>
                    {comment.snippet.topLevelComment.snippet.textDisplay}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>댓글이 없습니다.</p>
          )}
        </div>

      </div>
    </DefaultLayout>
  );
}

export default VideoPlayer;
