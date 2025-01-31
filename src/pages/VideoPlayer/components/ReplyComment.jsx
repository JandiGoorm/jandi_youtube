import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  HiArrowTurnDownRight,
  HiOutlineHandThumbDown,
  HiOutlineHandThumbUp,
} from "react-icons/hi2";
import YoutubeService from "../../../apis/youtube";
import { formatISO } from "../../../utils/date";
import { formatLikeCount } from "../../../utils/likeCount";
import styles from "./ReplyComment.module.css";

const ReplyComment = ({ parentId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const tokenRef = useRef("");

  const { fetchComments } = YoutubeService;

  const hash = useMemo(() => new Set(), []);

  const fetchReplies = useCallback(async () => {
    if (tokenRef.current === null) return;

    setIsLoading(true);
    try {
      const repliesResponse = await fetchComments({
        part: "snippet",
        parentId,
        pageToken: tokenRef.current,
      });

      const repliesData = repliesResponse.data.items.filter(
        (v) => !hash.has(v.id)
      );

      repliesData.forEach((v) => {
        hash.add(v.id);
      });

      setComments((prev) => {
        return [...prev, ...repliesData];
      });

      tokenRef.current = repliesResponse.data.nextPageToken || null;
    } catch (err) {
      console.error("대댓글 불러오기 실패", err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchComments, hash, parentId]);

  useEffect(() => {
    (async () => {
      await fetchReplies();
    })();
  }, [fetchReplies]);

  return (
    <ul className={styles.reply_container}>
      {comments.map((comment) => (
        <li key={comment.id} className={styles.reply_item}>
          <img
            src={comment.snippet.authorProfileImageUrl}
            alt="프로필 이미지"
            className={styles.profile_img}
          />
          <div className={styles.comment_content}>
            <div className={styles.comment_header}>
              <span className={styles.comment_author}>
                {comment.snippet.authorDisplayName}
              </span>
              <span className={styles.comment_time}>
                {formatISO(comment.snippet.publishedAt)}
              </span>
            </div>
            <p
              dangerouslySetInnerHTML={{
                __html: comment.snippet.textDisplay,
              }}
              className={styles.comment_text}
            />
            <div className={styles.comment_likes}>
              <button>
                <div className={styles.icon_box}>
                  <HiOutlineHandThumbUp size={20} />
                </div>
                <span className={styles.like_count}>
                  {formatLikeCount(comment.snippet.likeCount)}
                </span>
              </button>

              <button className={styles.icon_box}>
                <HiOutlineHandThumbDown size={20} />
              </button>
            </div>
          </div>
        </li>
      ))}

      {isLoading && (
        <li className={styles.loading}>
          <div className={styles.spinner} />
        </li>
      )}
      {tokenRef.current && (
        <button onClick={fetchReplies} className={styles.more_btn}>
          <HiArrowTurnDownRight size={20} />
          <span>답글 더보기</span>
        </button>
      )}
    </ul>
  );
};

export default ReplyComment;
