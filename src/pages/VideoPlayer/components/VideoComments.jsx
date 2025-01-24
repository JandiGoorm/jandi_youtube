import React, { useState, useEffect } from "react";
import styles from "./VideoComments.module.css";

// 유틸리티 함수
import { formatISO } from "../../../utils/date";

// 댓글 컴포넌트
const VideoComments = ({ totalCommentCount, comments }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 메뉴 상태
  const [sortedComments, setSortedComments] = useState([]); // 정렬된 댓글 상태

  // 댓글이 변경될 때 초기화
  useEffect(() => {
    setSortedComments([...comments]); // 댓글을 초기 상태로 설정
  }, [comments]);

  // 드롭다운 토글
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // 드롭다운 메뉴 열고 닫기
  };

  // 댓글을 인기순으로 정렬
  const sortByPopularity = () => {
    const sorted = [...comments].sort(
      (a, b) =>
        b.snippet.topLevelComment.snippet.likeCount -
        a.snippet.topLevelComment.snippet.likeCount
    );
    setSortedComments(sorted); // 정렬된 댓글로 상태 업데이트
    setIsDropdownOpen(false); // 드롭다운 메뉴 닫기
  };

  // 댓글을 최신순으로 정렬
  const sortByLatest = () => {
    const sorted = [...comments].sort(
      (a, b) =>
        new Date(b.snippet.topLevelComment.snippet.publishedAt) -
        new Date(a.snippet.topLevelComment.snippet.publishedAt)
    );
    setSortedComments(sorted); // 정렬된 댓글로 상태 업데이트
    setIsDropdownOpen(false); // 드롭다운 메뉴 닫기
  };

  return (
    <div className={styles.commentsSection}>
      {/* 댓글 개수 헤더 */}
      <h2 className={styles.commentsHeader}>
        댓글 {totalCommentCount.toLocaleString()}개
      </h2>

      {/* 정렬 드롭다운 컨트롤 */}
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
              {/* 프로필 이미지 */}
              <img
                className={styles.profileImage}
                src={
                  comment.snippet.topLevelComment.snippet.authorProfileImageUrl
                }
                alt="프로필 이미지"
              />

              {/* 댓글 내용 */}
              <div className={styles.commentContent}>
                <div className={styles.commentHeader}>
                  {/* 작성자 이름 */}
                  <span className={styles.commentAuthor}>
                    {comment.snippet.topLevelComment.snippet.authorDisplayName}
                  </span>
                  {/* 댓글 작성 시간 */}
                  <span className={styles.commentTime}>
                    {formatISO(
                      comment.snippet.topLevelComment.snippet.publishedAt
                    )}
                  </span>
                </div>

                {/* 댓글 텍스트 */}
                <p
                  className={styles.commentText}
                  dangerouslySetInnerHTML={{
                    __html:
                      comment.snippet.topLevelComment.snippet.textDisplay,
                  }}
                ></p>

                {/* 좋아요/싫어요 액션 */}
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
        // 댓글이 없을 경우
        <p className={styles.noComments}>댓글이 없습니다.</p>
      )}
    </div>
  );
};

export default VideoComments;
