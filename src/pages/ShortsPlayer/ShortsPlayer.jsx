import { useEffect, useState } from "react";
import classNames from 'classnames';
import YoutubeService from "../../apis/youtube";
import { useParams } from "react-router-dom";
import styles from "./ShortsPlayer.module.css";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";

//util 함수
import {formatISO} from "../../utils/date.js"
import {formatLikeCount} from "../../utils/likeCount.js"
import {formatHitCount} from "../../utils/hit.js"
import {formatCommentCount} from "../../utils/commentCount.js"

//모달 컴포넌트
import DescriptionModal from "./Modal/DescriptionModal";

//버튼 아이콘
import { IoMdPlay} from "react-icons/io";
import { FaVolumeUp } from "react-icons/fa";
import { CgMaximize } from "react-icons/cg";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { BiSolidCommentDetail } from "react-icons/bi";
import { RiShareForwardFill } from "react-icons/ri";
import { MdMoreVert } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";

const ShortsPlayer = () => {
  const { shortsId } = useParams();
  const [shortsData, setShortsData] = useState(null);
  const [comments, setComments] = useState([]);

  //TODO: 상태는 추후 구독 정보에서 본인의 좋아요/싫어요/구독 여부를 가져올 예정
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태
  const [isDisliked, setIsDisliked] = useState(false); // 싫어요 상태
  const [isSubscribe, setIsSubscribe] = useState(false); //구독 상태

  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false); //설명모달창 오픈 상태

  useEffect(() => {
    const fetchShortsData = async () => {
      try {
        const response = await YoutubeService.fetchShorts(shortsId);
        setShortsData(response.data.items[0]); // Shorts 정보 저장
        console.log(response);
      } catch (error) {
        console.error("Error fetching Shorts data:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${shortsId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
        );
        const data = await response.json();
        setComments(data.items || []); // 댓글 데이터 저장
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (shortsId) {
      fetchShortsData();
      //fetchComments();
    }

    console.log(shortsId);
    console.log(shortsData);

  }, [shortsId]);

  if (!shortsData) {
    return <div>Loading...</div>;
  }

  // 좋아요 버튼 클릭 핸들러
  const handleLikeClick = () => {
    setIsLiked((prev) => !prev);
    if (isDisliked) setIsDisliked(false); // 좋아요/싫어요 중 하나만 눌리도록 상태 초기화
    //TODO: 본인의 좋아요 정보에 반영
  };
  
  // 싫어요 버튼 클릭 핸들러
  const handleDislikeClick = () => {
    setIsDisliked((prev) => !prev);
    if (isLiked) setIsLiked(false); // 좋아요/싫어요 중 하나만 눌리도록 좋아요 상태 초기화
    //TODO: 본인의 싫어요 정보에 반영
  };
  
  // 구독 버튼 클릭 핸들러
  const handleSubscribeClick = () => {
    setIsSubscribe((prev) => !prev);
    //TODO: 본인의 구독 정보에 반영
  };

  // 모달 열기/닫기 핸들러
  const handleOpenDescriptionModal = () => {
    setIsDescriptionModalOpen(true);
  };
  const handleCloseDescriptionModal = () => {
    setIsDescriptionModalOpen(false);
  };

  return (
    <DefaultLayout>
      <div className={styles.shortsContainer}>
        <div className={styles.player}>
          {/* 플레이어 상단 버튼 */}
          <div className={styles.playerTopActions}>
            <button className={styles.playBtn}><IoMdPlay /></button>
            <button className={styles.volumeBtn}><FaVolumeUp /></button>
            <button className={styles.maximizeBtn}><CgMaximize /></button>
          </div>

          {/* 플레이어 */}
          <iframe
          src={`https://www.youtube.com/embed/${shortsId}`} 
          title="Shorts Video" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen
          ></iframe>
          
          {/* 영상 설명란 */}
          <div className={styles.videoDetails}>
            <div className={styles.channelInfo}>
              <img
                src="https://yt3.ggpht.com/IFGGaDpj5cbS5ZvfEm-hpMh4mFQX_wCSReSumZVwXukAJmC4T9Q30BrqU7OAqQL4dHDWUA1_=s88-c-k-c0x00ffffff-no-rj"
              />
              <p>{shortsData.snippet.channelTitle}</p>
              <button className={classNames(styles.subscribeBtn, {
                [styles.active]: isSubscribe, // 활성화된 경우 클래스 추가
                })}
                onClick={handleSubscribeClick} // 구독 클릭 이벤트
                >{isSubscribe? "구독중" : "구독"}
              </button>
            </div>
            <p 
              onClick={handleOpenDescriptionModal} // 설명란 클릭 시 모달창 띄우기
              >{shortsData.snippet.title}
            </p>
          </div>

          {/* 플레이어 사이드 버튼 */}
          <div className={styles.playerSideActions}>
            <div>
              <button
                className={classNames(styles.likeBtn, styles.tooltip, {
                  [styles.active]: isLiked, // 활성화된 경우 클래스 추가
                })}
                data-tooltip="이 동영상이 마음에 듭니다."
                onClick={handleLikeClick} // 좋아요 클릭 이벤트
                ><BiSolidLike />
              </button>
              <p id="likeCnt">{formatLikeCount(shortsData.statistics.likeCount)}</p>
            </div>
            <div>
              <button
                className={classNames(styles.dislikeBtn, styles.tooltip, {
                  [styles.active]: isDisliked, // 활성화된 경우 클래스 추가
                })}
                data-tooltip="이 동영상이 마음에 들지 않습니다."
                onClick={handleDislikeClick} // 싫어요 클릭 이벤트
                ><BiSolidDislike />
              </button>
              <p id="dislike">싫어요</p>
            </div>
            <div>
              <button className={classNames(styles.commentBtn, styles.tooltip)} 
              data-tooltip="댓글"><BiSolidCommentDetail /></button>
              <p id="commentCnt">{formatCommentCount(shortsData.statistics.commentCount)}</p>
            </div>
            <div>
              <button className={classNames(styles.shareBtn, styles.tooltip)} 
              data-tooltip="공유"><RiShareForwardFill /></button>
              <p id="share">공유</p>
            </div>
            <div>
              <button className={styles.moreBtn}><MdMoreVert /></button></div>
            <div>
              <img 
              src="https://yt3.ggpht.com/IFGGaDpj5cbS5ZvfEm-hpMh4mFQX_wCSReSumZVwXukAJmC4T9Q30BrqU7OAqQL4dHDWUA1_=s88-c-k-c0x00ffffff-no-rj"
              />
            </div>
          </div>

        </div>
        
        <div className={styles.mover}>
          <button className={classNames(styles.prevBtn, styles.tooltip)} 
          data-tooltip="이전 동영상"><FaArrowUp /></button>
          <button className={classNames(styles.nextBtn, styles.tooltip)} 
          data-tooltip="다음 동영상"><FaArrowDown /></button>
        </div>

        {/* 설명 모달창 */}
        <DescriptionModal isOpen={isDescriptionModalOpen} onClose={handleCloseDescriptionModal}>
          <main>{shortsData.snippet.title}</main>
          <article>
            <section>
              <p>{formatLikeCount(shortsData.statistics.likeCount)}</p>
              <p>좋아요 수</p>
            </section>
            <section>
              <p>{formatHitCount(shortsData.statistics.viewCount).split(" ", 1)}</p>
              <p>조회수</p>
            </section>
            <section>
              <p>{formatISO(shortsData.snippet.publishedAt).split(" ", 1)}</p>
              <p>전</p>
            </section>
          </article>
          <footer>
            {shortsData.snippet.description}
          </footer>
        </DescriptionModal>

        {/* Shorts 정보 */}
        {/* <div className={styles.videoDetails}>
          <h3>{shortsData.snippet.title}</h3>
          <p>{shortsData.snippet.description}</p>
          <div className={styles.channelInfo}>
            <p>Channel: {shortsData.snippet.channelTitle}</p>
          </div>
        </div> */}
      </div>
    </DefaultLayout>
  );
};

export default ShortsPlayer;
