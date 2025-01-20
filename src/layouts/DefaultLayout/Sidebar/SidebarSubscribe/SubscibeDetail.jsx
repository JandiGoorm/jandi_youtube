import { useCallback } from "react";
import styles from "./SubscribeDetail.module.css";
import { useNavigate } from "react-router-dom";
import { PageEndPoints } from "../../../../constants/api";
import { buildPath } from "../../../../utils/path";

const SubscribeDetail = ({ subscribe }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(
      buildPath(PageEndPoints.CHANNEL, {
        channel: subscribe.id,
      })
    );
  }, [navigate, subscribe.id]);

  return (
    <div className={styles.container} onClick={handleClick}>
      <img
        src={subscribe.snippet.thumbnails.default.url}
        alt="thumbnail"
        className={styles.sub_img}
      />
      <span className={styles.subs_title}>{subscribe.snippet.title}</span>
    </div>
  );
};

export default SubscribeDetail;
