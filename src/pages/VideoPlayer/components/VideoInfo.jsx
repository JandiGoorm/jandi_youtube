import styles from "./VideoInfo.module.css";
import { formatSubscriberCount } from "../../../utils/channel";
import { BiLike, BiDislike, BiShare, BiSave } from "react-icons/bi";
import { MdOutlineContentCopy, MdOutlineCloudDownload } from "react-icons/md";

const VideoInfo = ({ channelInfo, videoTitle }) => {
  if (!channelInfo) return null;

  const { snippet, statistics } = channelInfo;
  const { thumbnails, title } = snippet;
  const subscriberCount = statistics.subscriberCount
    ? formatSubscriberCount(parseInt(statistics.subscriberCount))
    : "N/A";

  return (
    <div className={styles.videoInfoContainer}>
      {videoTitle && <h2 className={styles.videoTitle}>{videoTitle}</h2>}

      <div className={styles.channelRow}>
        <div className={styles.channelInfo}>
          <img
            className={styles.channelImage}
            src={thumbnails.default.url}
            alt={title}
          />
          <div className={styles.channelDetails}>
            <span className={styles.channelTitle}>{title}</span>
            <span className={styles.subscriberCount}>
              구독자 {subscriberCount}
            </span>
          </div>
          <button className={styles.subscribeButton}>구독</button>
        </div>

        <div className={styles.actionButtons}>
          <button className={styles.actionButton}>
            <BiLike /> 좋아요
          </button>
          <button className={styles.actionButton}>
            <BiDislike /> 싫어요
          </button>
          <button className={styles.actionButton}>
            <BiShare /> 공유
          </button>
          <button className={styles.actionButton}>
            <MdOutlineCloudDownload /> 오프라인 저장
          </button>
          <button className={styles.actionButton}>
            <MdOutlineContentCopy /> 클립
          </button>
          <button className={styles.actionButton}>
            <BiSave /> 저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;
