import { useCallback, useState } from "react";
import YoutubeService from "../../../apis/youtube";
import CommentItem from "./CommentItem";
import styles from "./VideoComments.module.css";
import InfiniteScroll from "../../../components/InfiniteScroll/InfiniteScroll";
import {
  DropDown,
  DropDownContent,
  DropDownTrigger,
} from "../../../components/DropDown/DropDown";
import { MdOutlineSort } from "react-icons/md";
import { commentOrderOptions } from "./constants";

const VideoComments = ({ videoId, commentCount }) => {
  const [order, setOrder] = useState("관련성순");
  const { fetchCommentThreads } = YoutubeService;

  const fetchCallback = useCallback(
    async (pageToken = "") => {
      try {
        const commentsResponse = await fetchCommentThreads({
          part: "snippet",
          videoId,
          pageToken,
          order: commentOrderOptions[order],
        });

        const commentsData = commentsResponse.data.items || [];

        return {
          items: commentsData,
          nextToken: commentsResponse.data.nextPageToken,
        };
      } catch (error) {
        console.error("댓글 불러오기 실패:", error);
      }
    },
    [fetchCommentThreads, order, videoId]
  );

  return (
    <div className={styles.comment_container}>
      <div className={styles.comment_header}>
        <h2 className={styles.comment_count}>댓글 {commentCount}개</h2>
        <DropDown>
          <DropDownTrigger>
            <button className={styles.comment_order}>
              <MdOutlineSort size={24} />
              <span>정렬</span>
            </button>
          </DropDownTrigger>
          <DropDownContent>
            <ul className={styles.menu_list}>
              {Object.keys(commentOrderOptions).map((option) => (
                <li
                  key={option}
                  className={styles.menu_item}
                  onClick={() => setOrder(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </DropDownContent>
        </DropDown>
      </div>

      <ul className={styles.comments_list}>
        <InfiniteScroll fetch={fetchCallback} RenderComponent={CommentItem} />
      </ul>
    </div>
  );
};

export default VideoComments;
