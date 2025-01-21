import React, { useState, useEffect } from "react";
import styles from "./CommentsModal.module.css";

//util 함수
import {formatISO} from "../../../utils/date.js"
import {formatLikeCount} from "../../../utils/likeCount.js"
import {formatHitCount} from "../../../utils/hit.js"
import {formatCommentCount} from "../../../utils/commentCount.js"

//버튼 아이콘
import { BsFilterLeft } from "react-icons/bs";
import { TfiClose } from "react-icons/tfi";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";

const CommentModal = ({ isOpen, onClose, comments }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortedComments, setSortedComments] = useState([]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

const setSortByPopularity = () => {
    if (comments) {
      const sorted = [...comments].sort((a, b) => 
        b.snippet.topLevelComment.snippet.likeCount - a.snippet.topLevelComment.snippet.likeCount);
      setSortedComments(sorted);
    }
    setIsDropdownOpen(false);
    console.log("인기순 정렬 선택");
  };

  const setSortByLatest = () => {
    if (comments) {
      const sorted = [...comments].sort((a, b) => 
        new Date(b.snippet.topLevelComment.snippet.publishedAt) - new Date(a.snippet.topLevelComment.snippet.publishedAt));
      setSortedComments(sorted);
    }
    setIsDropdownOpen(false);
    console.log("최신순 정렬 선택");
  };

  useEffect(() => {
    setSortedComments([...comments]); //초기 세팅: 불러온 댓글 순서 그대로
  }, [comments]);

  if (!isOpen) return null; // 모달이 열리지 않았으면 렌더링하지 않음

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <header className={styles.modalHeader}>
          <p>댓글</p>
          <div className={styles.filterContainer}>
            <button className={styles.filterBtn} onClick={toggleDropdown}>
              <BsFilterLeft />
            </button>
            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <button className={styles.dropdownMenuBtn} onClick={setSortByPopularity}>
                  인기 댓글순
                </button>
                <button className={styles.dropdownMenuBtn} onClick={setSortByLatest}>
                  최신순
                </button>
              </div>
            )}
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <TfiClose />
          </button>
        </header>
        <main className={styles.commentsModalMain}>
          {sortedComments.length > 0 ? (
            <ul>
              {sortedComments.map((comment) => (
                <li className={styles.commentsItem} key={comment.id}>
                  <img src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="프로필 이미지" />
                  <section className={styles.commentSection}>
                    <div>
                      <p className={styles.commentAuthor}>{comment.snippet.topLevelComment.snippet.authorDisplayName}</p>
                      <p className={styles.commentTime}>{formatISO(comment.snippet.topLevelComment.snippet.publishedAt)}</p>
                    </div>
                    <p
                      className={styles.commentContents}
                      dangerouslySetInnerHTML={{
                        __html: comment.snippet.topLevelComment.snippet.textDisplay,
                      }}
                    ></p>
                    <div>
                      <button><BiLike /></button>
                      <p>{comment.snippet.topLevelComment.snippet.likeCount}</p>
                      <button><BiDislike /></button>
                    </div>
                  </section>
                </li>
              ))}
            </ul>
          ) : (
            <p>댓글이 없습니다.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default CommentModal;
