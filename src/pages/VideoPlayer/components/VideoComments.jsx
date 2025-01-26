import React, { useState, useEffect, useRef } from "react";
import styles from "./VideoComments.module.css";
import YoutubeService from "../../../apis/youtube";
import { formatISO } from "../../../utils/date";

const VideoComments = ({ videoId, totalCommentCount }) => {
  const [comments, setComments] = useState([]); // 댓글 상태
  const [nextPageToken, setNextPageToken] = useState(null); // 다음 페이지 토큰
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태
  const [sortedComments, setSortedComments] = useState([]); // 정렬된 댓글 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const observerTarget = useRef(null); // 무한 스크롤 대상

  // 댓글 가져오기
  const fetchComments = async () => {
    if (!videoId || isLoading) return;

    setIsLoading(true);
    try {
      const response = await YoutubeService.fetchComments({
        part: "snippet",
        videoId,
        maxResults: 10,
        pageToken: nextPageToken,
      });

      const newComments = response.data.items || [];
      setComments((prev) => [...prev, ...newComments]);
      setSortedComments((prev) => [...prev, ...newComments]);
      setNextPageToken(response.data.nextPageToken || null);
    } catch (error) {
      console.error("댓글 데이터를 가져오는 중 오류 발생:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 댓글 데이터 로드
  useEffect(() => {
    setComments([]); // 초기화
    setSortedComments([]);
    setNextPageToken(null);
    fetchComments();
  }, [videoId]);

  // 무한 스크롤 옵저버 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextPageToken && !isLoading) {
          fetchComments();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [nextPageToken, isLoading]);

  // 드롭다운 토글
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // 인기순 정렬
  const sortByPopularity = () => {
    const sorted = [...comments].sort(
      (a, b) =>
        b.snippet.topLevelComment.snippet.likeCount -
        a.snippet.topLevelComment.snippet.likeCount
    );
    setSortedComments(sorted);
    setIsDropdownOpen(false);
  };

  // 최신순 정렬
  const sortByLatest = () => {
    const sorted = [...comments].sort(
      (a, b) =>
        new Date(b.snippet.topLevelComment.snippet.publishedAt) -
        new Date(a.snippet.topLevelComment.snippet.publishedAt)
    );
    setSortedComments(sorted);
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.commentsSection}>
      {/* 댓글 개수 표시 */}
      <h2 className={styles.commentsHeader}>
        댓글 {totalCommentCount.toLocaleString()}개
      </h2>

      {/* 정렬 드롭다운 */}
      <div className={styles.sortContainer}>
        <button className={styles.sortButton} onClick={toggleDropdown}>
          정렬 기준
        </button>
        {isDropdownOpen && (
          <div className={styles.dropdownMenu}>
            <button className={styles.dropdownMenuBtn} onClick={sortByPopularity}>
              인기 댓글순
            </button>
            <button className={styles.dropdownMenuBtn} onClick={sortByLatest}>
              최신순
            </button>
          </div>
        )}
      </div>

      {/* 댓글 목록 */}
      {sortedComments.length > 0 ? (
        <ul className={styles.commentsList}>
          {sortedComments.map((comment) => (
            <li className={styles.commentItem} key={comment.id}>
              <img
                className={styles.profileImage}
                src={
                  comment.snippet.topLevelComment.snippet.authorProfileImageUrl
                }
                alt="프로필 이미지"
              />
              <div className={styles.commentContent}>
                <div className={styles.commentHeader}>
                  <span className={styles.commentAuthor}>
                    {comment.snippet.topLevelComment.snippet.authorDisplayName}
                  </span>
                  <span className={styles.commentTime}>
                    {formatISO(
                      comment.snippet.topLevelComment.snippet.publishedAt
                    )}
                  </span>
                </div>
                <p
                  className={styles.commentText}
                  dangerouslySetInnerHTML={{
                    __html:
                      comment.snippet.topLevelComment.snippet.textDisplay,
                  }}
                ></p>
              </div>
            </li>
          ))}
          {isLoading && <li className={styles.loading}>로딩 중...</li>}
          <li ref={observerTarget}></li>
        </ul>
      ) : (
        <p className={styles.noComments}>댓글이 없습니다.</p>
      )}
    </div>
  );
};

export default VideoComments;
