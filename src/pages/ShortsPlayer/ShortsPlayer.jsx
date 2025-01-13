import { useEffect, useState } from "react";
import classNames from 'classnames';
import YoutubeService from "../../apis/youtube";
import { useParams } from "react-router-dom";
import styles from "./ShortsPlayer.module.css";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";


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

  useEffect(() => {
    const fetchShortsData = async () => {
      try {
        const response = await YoutubeService.fetchShorts(shortsId);
        setShortsData(response.data.items[0]); // Shorts 정보 저장
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
  }, [shortsId]);

  if (!shortsData) {
    return <div>Loading...</div>;
  }

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
              <button className={styles.subscribeBtn}>구독</button>
            </div>
            <p>{shortsData.snippet.title}</p>
          </div>

          {/* 플레이어 사이드 버튼 */}
          <div className={styles.playerSideActions}>
            <div>
              <button className={classNames(styles.playBtn, styles.tooltip)} 
              data-tooltip="이 동영상이 마음에 듭니다."><BiSolidLike /></button>
              <p id="likeCnt">5.9천</p>
            </div>
            <div>
              <button className={classNames(styles.volumeBtn, styles.tooltip)} 
              data-tooltip="이 동영상이 마음에 들지 않습니다."><BiSolidDislike /></button>
              <p id="dislike">싫어요</p>
            </div>
            <div>
              <button className={classNames(styles.maximizeBtn, styles.tooltip)} 
              data-tooltip="댓글"><BiSolidCommentDetail /></button>
              <p id="commentCnt">122</p>
            </div>
            <div>
              <button className={classNames(styles.maximizeBtn, styles.tooltip)} 
              data-tooltip="공유"><RiShareForwardFill /></button>
              <p id="share">공유</p>
            </div>
            <div>
              <button className={styles.maximizeBtn}><MdMoreVert /></button></div>
            <div>
              <img 
              src="https://yt3.ggpht.com/IFGGaDpj5cbS5ZvfEm-hpMh4mFQX_wCSReSumZVwXukAJmC4T9Q30BrqU7OAqQL4dHDWUA1_=s88-c-k-c0x00ffffff-no-rj"
              />
            </div>
          </div>

        </div>
        
        <div className={styles.mover}>
          <button className={classNames(styles.playBtn, styles.tooltip)} 
          data-tooltip="이전 동영상"><FaArrowUp /></button>
          <button className={classNames(styles.volumeBtn, styles.tooltip)} 
          data-tooltip="다음 동영상"><FaArrowDown /></button>
        </div>

        

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
