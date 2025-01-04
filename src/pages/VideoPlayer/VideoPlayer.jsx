import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./VideoPlayer.module.css";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";

function VideoPlayer() {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v"); // URL의 "v" 파라미터에서 동영상 ID 가져오기
  const [comments, setComments] = useState([]); // 댓글 상태 저장
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY; // YouTube Data API 키

  // 댓글 불러오기 함수
  const fetchComments = async (videoId) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("댓글 API 응답:", data); // 응답 내용 확인
      setComments(data.items || []);
    } catch (error) {
      console.error("댓글을 불러오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (videoId) {
      fetchComments(videoId);
    }
  }, [videoId]);

  // 동영상 ID가 없을 경우 메시지 출력
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
        <iframe
          className={styles.videoFrame}
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className={styles.commentsSection}>
          <h2>댓글</h2>
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
