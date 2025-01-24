import { useEffect, useState, useRef } from "react";
import classNames from "classnames";
import YoutubeService from "../../apis/youtube";
import { useParams } from "react-router-dom";
import styles from "./ShortsPlayer.module.css";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";

//util 함수
import { formatISO } from "../../utils/date.js";
import { formatLikeCount } from "../../utils/likeCount.js";
import { formatHitCount } from "../../utils/hit.js";
import { formatCommentCount } from "../../utils/commentCount.js";

//모달 컴포넌트
import DescriptionModal from "./Modal/DescriptionModal";
import CommentsModal from "./Modal/CommentsModal";

//버튼 아이콘
import { IoMdPlay } from "react-icons/io";
import { IoIosPause } from "react-icons/io";
import { IoMdVolumeHigh } from "react-icons/io";
import { IoMdVolumeOff } from "react-icons/io";
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

  const playerRef = useRef(null); // iframe 참조
  const [isPlaying, setIsPlaying] = useState(false); // 재생 상태 관리
  const [isMuted, setIsMuted] = useState(false); //무음 여부
  const [volume, setVolume] = useState(50); // 볼륨 상태 관리

  //TODO: 상태는 추후 구독 정보에서 본인의 좋아요/싫어요/구독 여부를 가져올 예정
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태
  const [isDisliked, setIsDisliked] = useState(false); // 싫어요 상태
  const [isSubscribe, setIsSubscribe] = useState(false); //구독 상태

  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false); //설명모달창 오픈 상태
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false); //설명모달창 오픈 상태

  const fetchShorts = async () => {
    try {
      // 동영상 정보 요청
      const videoResponse = await YoutubeService.fetchVideos({
        part: "snippet,contentDetails,statistics",
        id: shortsId,
      });
      const videoData = videoResponse.data.items[0];

      // 채널 정보 요청
      const channelId = videoData.snippet.channelId;
      const channelDataResponse = await YoutubeService.fetchChannels({
        part: "snippet,contentDetails",
        id: channelId,
      });
      const channelData = channelDataResponse.data.items[0];

      //데이터 가공
      const resultData = () => {
        return {
          videoId: videoData.id,
          videoTitle: videoData.snippet.title,
          videoThumbnail: videoData.snippet.thumbnails.medium.url,
          commentCount: videoData.statistics.commentCount,
          likeCount: videoData.statistics.likeCount,
          viewCount: videoData.statistics.viewCount,
          publishTime: videoData.snippet.publishedAt,
          description: videoData.snippet.description,

          channelId: videoData.snippet.channelId,
          channelTitle: videoData.snippet.channelTitle,
          channelThumbnail: channelData.snippet.thumbnails.medium.url,
        };
      };

      setShortsData(resultData);
    } catch (error) {
      console.error("쇼츠 데이터 로드 실패:", error);
    }
  };

  useEffect(() => {
    if (shortsId) {
      fetchShorts();
    }
  }, [shortsId]);

  if (!shortsData) {
    return <div>Loading...</div>;
  }

  //동영상 상태 제어
  const dealVideoState = () => {
    const player = playerRef.current.contentWindow;
    if (isPlaying) {
      // 동영상 정지
      player.postMessage(
        JSON.stringify({ event: "command", func: "pauseVideo" }),
        "*"
      );
    } else {
      // 동영상 재생
      player.postMessage(
        JSON.stringify({ event: "command", func: "playVideo" }),
        "*"
      );
    }
  };

  //동영상 음량 제어
  const dealVideoVolume = (newVolume) => {
    if (newVolume == 0) setIsMuted(true);
    else setIsMuted(false);

    const player = playerRef.current.contentWindow;
    player.postMessage(
      JSON.stringify({
        event: "command",
        func: "setVolume",
        args: [newVolume],
      }),
      "*"
    );
  };

  // 동영상 재생 버튼 클릭 핸들러
  const handlePlayClick = () => {
    dealVideoState();
    setIsPlaying((prev) => !prev); // 재생 상태 업데이트
  };

  // 동영상 음소거 버튼 클릭 핸들러
  const handleVolumeClick = () => {
    const newVolume = isMuted ? 50 : 0;

    //TODO: 버튼 클릭에 따라 슬라이더 조정
    dealVideoVolume(newVolume); // 볼륨 업데이트
  };

  //동영상 음량 조절 슬라이더 이동 핸들러
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);

    dealVideoVolume(newVolume); // 볼륨 업데이트
  };

  // 좋아요 버튼 클릭 핸들러
  const handleLikeClick = () => {
    setIsLiked((prev) => !prev);
    if (isDisliked) setIsDisliked(false); // 좋아요/싫어요 중 하나만 눌리도록 상태 초기화
  };

  // 싫어요 버튼 클릭 핸들러
  const handleDislikeClick = () => {
    setIsDisliked((prev) => !prev);
    if (isLiked) setIsLiked(false); // 좋아요/싫어요 중 하나만 눌리도록 좋아요 상태 초기화
  };

  // 구독 버튼 클릭 핸들러
  const handleSubscribeClick = () => {
    setIsSubscribe((prev) => !prev);
  };

  // 모달창 열기/닫기 핸들러
  // 설명 모달창
  const handleOpenDescriptionModal = () => {
    setIsDescriptionModalOpen(true);
  };
  const handleCloseDescriptionModal = () => {
    setIsDescriptionModalOpen(false);
  };

  //댓글 모달창
  const handleOpenCommentsModal = () => {
    setIsCommentsModalOpen(true);
  };
  const handleCloseCommentsModal = () => {
    setIsCommentsModalOpen(false);
  };

  return (
    <DefaultLayout>
      <div className={styles.shortsContainer}>
        <div className={styles.player}>
          {/* 플레이어 상단 버튼 */}
          <div className={styles.playerTopActions}>
            <button className={styles.playBtn} onClick={handlePlayClick}>
              {isPlaying ? <IoIosPause /> : <IoMdPlay />}
            </button>
            <div className={styles.volumeContainer}>
              <button className={styles.volumeBtn} onClick={handleVolumeClick}>
                {isMuted ? <IoMdVolumeOff /> : <IoMdVolumeHigh />}
              </button>
              <input
                className={styles.volumeSlider}
                type="range"
                min="0"
                max="100"
                onChange={handleVolumeChange}
              ></input>
            </div>
            <button className={styles.maximizeBtn}>
              <CgMaximize />
            </button>
          </div>

          {/* 플레이어 */}
          <iframe
            ref={playerRef}
            src={`https://www.youtube.com/embed/${shortsId}?enablejsapi=1`}
            title="Shorts Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className={styles.thumbnail}
          ></iframe>

          {/* 영상 설명란 */}
          <div className={styles.videoDetails}>
            <div className={styles.channelInfo}>
              <img src={shortsData.channelThumbnail} />
              <p>{shortsData.channelTitle}</p>
              <button
                className={classNames(styles.subscribeBtn, {
                  [styles.active]: isSubscribe,
                })} // 활성화된 경우 isSubscribe 클래스 추가
                onClick={handleSubscribeClick} // 구독 클릭 이벤트
              >
                {isSubscribe ? "구독중" : "구독"}
              </button>
            </div>
            <p
              onClick={handleOpenDescriptionModal} // 설명란 클릭 시 모달창 띄우기
            >
              {shortsData.videoTitle}
            </p>
          </div>

          {/* 플레이어 사이드 버튼 */}
          <div className={styles.playerSideActions}>
            <div>
              <button
                className={classNames(styles.likeBtn, styles.tooltip, {
                  [styles.active]: isLiked,
                })} // 활성화된 경우 클래스 추가
                data-tooltip="이 동영상이 마음에 듭니다."
                onClick={handleLikeClick} // 좋아요 클릭 이벤트
              >
                <BiSolidLike />
              </button>
              <p id="likeCnt">{formatLikeCount(shortsData.likeCount)}</p>
            </div>
            <div>
              <button
                className={classNames(styles.dislikeBtn, styles.tooltip, {
                  [styles.active]: isDisliked,
                })} // 활성화된 경우 클래스 추가
                data-tooltip="이 동영상이 마음에 들지 않습니다."
                onClick={handleDislikeClick} // 싫어요 클릭 이벤트
              >
                <BiSolidDislike />
              </button>
              <p id="dislike">싫어요</p>
            </div>
            <div>
              <button
                className={classNames(styles.commentBtn, styles.tooltip)}
                onClick={handleOpenCommentsModal} // 댓글 버튼 클릭 시 모달창 띄우기
                data-tooltip="댓글"
              >
                <BiSolidCommentDetail />
              </button>
              <p id="commentCnt">
                {formatCommentCount(shortsData.commentCount)}
              </p>
            </div>
            <div>
              <button
                className={classNames(styles.shareBtn, styles.tooltip)}
                data-tooltip="공유"
              >
                <RiShareForwardFill />
              </button>
              <p id="share">공유</p>
            </div>
            <div>
              <button className={styles.moreBtn}>
                <MdMoreVert />
              </button>
            </div>
            <div>
              <img src={shortsData.channelThumbnail} />
            </div>
          </div>
        </div>

        <div className={styles.mover}>
          <button
            className={classNames(styles.prevBtn, styles.tooltip)}
            data-tooltip="이전 동영상"
          >
            <FaArrowUp />
          </button>
          <button
            className={classNames(styles.nextBtn, styles.tooltip)}
            data-tooltip="다음 동영상"
          >
            <FaArrowDown />
          </button>
        </div>

        {/* 설명 모달창 */}
        <DescriptionModal
          isOpen={isDescriptionModalOpen}
          onClose={handleCloseDescriptionModal}
          shortsData={shortsData}
        />
        
        {/* 댓글 모달창 */}
        <CommentsModal
          isOpen={isCommentsModalOpen}
          onClose={handleCloseCommentsModal}
          shortsId={shortsId}
        />
      </div>
    </DefaultLayout>
  );
};

export default ShortsPlayer;
