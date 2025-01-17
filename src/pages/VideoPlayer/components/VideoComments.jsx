import React from "react";
import styles from "../VideoPlayer.module.css";

const VideoComments = ({ totalCommentCount, comments }) => (
  <div className={styles.commentsSection}>
    <h2>댓글 ({totalCommentCount.toLocaleString()}개)</h2>
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
);

export default VideoComments;
