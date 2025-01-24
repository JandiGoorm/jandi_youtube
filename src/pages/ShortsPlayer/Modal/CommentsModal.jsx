import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import YoutubeService from "../../../apis/youtube";
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

const CommentModal = ({ isOpen, onClose, shortsId }) => {
  if (!isOpen) return null; // 모달이 열리지 않았으면 렌더링하지 않음

  //댓글 로드 및 옵저버 관련
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY; // YouTube Data API 키
  const [comments, setComments] = useState([]);
  const [nextPageToken, setNextPageToken] = useState();

  //옵저버 관련
  const navigate = useNavigate(); //옵저버
  const observerTarget = useRef(null); // 관찰 대상
  const [page, setPage] = useState(1); // 현재 페이지
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [isFirstLoad, setIsFirstLoad] = useState(true); //첫 로딩 여부: 더 이상 불러올 댓글이 없을 때 로드하지 않기 위해 구분

  //드롭다운창 관련
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortedComments, setSortedComments] = useState([]);

  //댓글 로드 함수
  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const apiUrl = new URL("https://www.googleapis.com/youtube/v3/commentThreads");
      apiUrl.searchParams.append("part", "snippet,replies");
      apiUrl.searchParams.append("videoId", shortsId);
      apiUrl.searchParams.append("maxResults", "50");
      if(nextPageToken) apiUrl.searchParams.append("pageToken", nextPageToken);
      apiUrl.searchParams.append("key", API_KEY);
      
      const response = await fetch(apiUrl.toString());
      const data = await response.json();
      
      // 중복 제거 및 기존 데이터와 병합
      setComments((prevComments) => 
        [...prevComments, ...data.items].filter(
          (comment, index, self) => self.findIndex((c) => c.id === comment.id) === index
        )
      );      
      setNextPageToken(data.nextPageToken); //다음 토큰값 저장
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false); // 로딩 상태 해제
    }
  };

  //클릭 이벤트 리스너 함수 - 닫기 및 정렬
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const setSortByPopularity = () => {
    console.log("인기순 정렬 선택");
    if (comments) {
      const sorted = [...comments].sort((a, b) => 
        b.snippet.topLevelComment.snippet.likeCount - a.snippet.topLevelComment.snippet.likeCount);
      setSortedComments(sorted);
    }
    setIsDropdownOpen(false);
  };

  const setSortByLatest = () => {
    console.log("최신순 정렬 선택");
    if (comments) {
      const sorted = [...comments].sort((a, b) => 
        new Date(b.snippet.topLevelComment.snippet.publishedAt) - new Date(a.snippet.topLevelComment.snippet.publishedAt));
      setSortedComments(sorted);
    }
    setIsDropdownOpen(false);
  };

  //페이지 첫 로드시 댓글 불러오기
  useEffect(() => {
    fetchComments();
    setIsFirstLoad(false);
  }, []);

  //댓글이 로드되면 정렬 데이터에도 반영 - 정렬 기본값: 서버에서 받아온 순서대로
  useEffect(() => {
    setSortedComments([...comments]);
    console.log("댓글 데이터: ", comments);
  }, [comments]);

  //옵저버
  useEffect(() => {
    if (!observerTarget.current) return;
  
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && nextPageToken) {
          setPage((prevPage) => prevPage + 1);
          fetchComments();
      }},
      { threshold: 0.5 }
    );
  
    observer.observe(observerTarget.current);
    return () => {
      observer.disconnect();
    };
  }, [isLoading, observerTarget.current]);

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
              <li className={styles.observe} ref={observerTarget}/>
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
