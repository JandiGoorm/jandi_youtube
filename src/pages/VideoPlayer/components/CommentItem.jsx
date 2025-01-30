import { useCallback, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { formatISO } from "../../../utils/date";
import { formatLikeCount } from "../../../utils/likeCount";
import styles from "./CommentItem.module.css";
import ReplyComment from "./ReplyComment";

const CommentItem = ({ item }) => {
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  const handleClickReply = useCallback((boolean) => {
    setIsReplyOpen(boolean);
  }, []);

  const replyCount = item.snippet.totalReplyCount;
  return (
    <li className={styles.commentItem}>
      <img
        className={styles.profileImage}
        src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
        alt="프로필 이미지"
      />

      {/* 댓글 내용 */}
      <div className={styles.commentContent}>
        <div className={styles.commentHeader}>
          <span className={styles.commentAuthor}>
            {item.snippet.topLevelComment.snippet.authorDisplayName}
          </span>

          <span className={styles.commentTime}>
            {formatISO(item.snippet.topLevelComment.snippet.publishedAt)}
          </span>
        </div>

        {/* 댓글 텍스트 */}
        <p
          className={styles.commentText}
          dangerouslySetInnerHTML={{
            __html: item.snippet.topLevelComment.snippet.textDisplay,
          }}
        ></p>

        <div className={styles.commentActions}>
          <button className={styles.likeButton}>
            <AiOutlineLike size={20} />
            <span className={styles.likeCount}>
              {formatLikeCount(item.snippet.topLevelComment.snippet.likeCount)}
            </span>
          </button>
          <button className={styles.dislikeButton}>
            <BiDislike size={18} />
          </button>
        </div>

        {/* 대댓글 수 */}
        {replyCount > 0 && !isReplyOpen && (
          <button
            className={styles.replyCountButton}
            onClick={() => handleClickReply(true)}
          >
            <IoIosArrowDown size={18} />
            <span>답글 {replyCount}개</span>
          </button>
        )}

        {replyCount > 0 && isReplyOpen && (
          <button
            className={styles.replyCountButton}
            onClick={() => handleClickReply(false)}
          >
            <IoIosArrowUp size={18} />
            <span>답글 {replyCount}개</span>
          </button>
        )}

        {isReplyOpen && (
          <ReplyComment parentId={item.snippet.topLevelComment.id} />
        )}
      </div>
    </li>
  );
};

export default CommentItem;
