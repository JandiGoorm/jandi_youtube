import React, { useState, useEffect } from "react";
import styles from "./VideoComments.module.css";

// 유틸리티 함수
import { formatISO } from "../../../utils/date";

const VideoComments = ({ totalCommentCount, comments }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortedComments, setSortedComments] = useState([]);

  useEffect(() => {
    setSortedComments([...comments]); // 초기 댓글 순서 설정
  }, [comments]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const sortByPopularity = () => {
    const sorted = [...comments].sort(
      (a, b) =>
        b.snippet.topLevelComment.snippet.likeCount -
        a.snippet.topLevelComment.snippet.likeCount
    );
    setSortedComments(sorted);
    setIsDropdownOpen(false);
  };

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
      <h2 className={styles.commentsHeader}>
        댓글 {totalCommentCount.toLocaleString()}개
      </h2>
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
                <div className={styles.commentActions}>
                  <button className={styles.likeButton}>👍</button>
                  <span>{comment.snippet.topLevelComment.snippet.likeCount}</span>
                  <button className={styles.dislikeButton}>👎</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noComments}>댓글이 없습니다.</p>
      )}
    </div>
  );
};

export default VideoComments;
