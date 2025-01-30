import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import YoutubeService from "../../../apis/youtube";
import { BiDislike } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";
import { formatLikeCount } from "../../../utils/likeCount";
import styles from "./ReplyComment.module.css";
import { formatISO } from "../../../utils/date";
import { HiArrowTurnDownRight } from "react-icons/hi2";

const ReplyComment = ({ parentId }) => {
  const [comments, setComments] = useState([]);
  const tokenRef = useRef("");

  const { fetchComments } = YoutubeService;

  const hash = useMemo(() => new Set(), []);

  const fetchReplies = useCallback(async () => {
    if (tokenRef.current === null) return;

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
                <AiOutlineLike size={20} />
                <span>{formatLikeCount(comment.snippet.likeCount)}</span>
              </button>
              <button>
                <BiDislike size={18} />
              </button>
            </div>
          </div>
        </li>
      ))}
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
