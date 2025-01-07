import { useCallback } from "react";
import styles from "./SubscribeDetail.module.css";
import { useNavigate } from "react-router-dom";
import { pageEndPoints } from "../../../../constants/api";
import { buildPath } from "../../../../utils/path";

const SubscribeDetail = ({ subscribe }) => {
  const navigate = useNavigate();
  const { snippet } = subscribe;

  const handleClick = useCallback(() => {
    navigate(
      buildPath(pageEndPoints.CHANNEL, {
        channel: snippet.customUrl,
      })
    );
  }, [navigate, snippet.customUrl]);

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
