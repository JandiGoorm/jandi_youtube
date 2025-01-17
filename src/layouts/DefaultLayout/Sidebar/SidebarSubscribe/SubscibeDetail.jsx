import { useCallback } from "react";
import styles from "./SubscribeDetail.module.css";
import { useNavigate } from "react-router-dom";
import { PageEndPoints } from "../../../../constants/api";
import { buildPath } from "../../../../utils/path";

const SubscribeDetail = ({ subscribe }) => {
  const navigate = useNavigate();
  const { snippet } = subscribe;

  const handleClick = useCallback(() => {
    navigate(
      buildPath(PageEndPoints.CHANNEL, {
        channel: snippet.channelId,
      })
    );
  }, [navigate, snippet.channelId]);

  return (
    <div className={styles.container} onClick={handleClick}>
      <img
        src={snippet.thumbnails.default.url}
        alt="thumbnail"
        className={styles.sub_img}
      />
      <span className={styles.subs_title}>{snippet.title}</span>
    </div>
  );
};

export default SubscribeDetail;
