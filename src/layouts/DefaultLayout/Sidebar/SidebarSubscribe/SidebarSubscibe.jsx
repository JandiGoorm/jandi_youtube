import { useCallback, useEffect, useState } from "react";
import styles from "./SidebarSubscribe.module.css";
import YoutubeService from "../../../../apis/youtube";
import SubscribeDetail from "./SubscibeDetail";
import { FaListUl } from "react-icons/fa";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { PageEndPoints } from "../../../../constants/api";

const SubscribeMenu = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isMore, setIsMore] = useState(false);
  const [visibleSubscriptions, setVisibleSubscriptions] = useState([]);
  const navigate = useNavigate();

  const { fetchSubscriptions } = YoutubeService;

  const handleClickAllSubs = useCallback(() => {
    navigate(PageEndPoints.FEEDCHANNELS);
  }, [navigate]);

  const handleClickMore = useCallback(() => {
    setIsMore((prev) => !prev);
  }, []);

  useEffect(() => {
    (async () => {
      const {
        data: { items },
      } = await fetchSubscriptions({
        part: "snippet,contentDetails",
        mine: true,
        maxResults: 50,
      });

      setSubscriptions(items);
    })();
  }, [fetchSubscriptions]);

  useEffect(() => {
    if (!subscriptions.length) return;
    if (isMore) {
      setVisibleSubscriptions(subscriptions);
    } else {
      setVisibleSubscriptions(subscriptions.slice(0, 5));
    }
  }, [subscriptions, isMore]);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar_menu}>
        <p className={styles.menu_head}>구독</p>
        {visibleSubscriptions.map((subscription) => {
          return (
            <SubscribeDetail key={subscription.id} subscribe={subscription} />
          );
        })}

        {isMore && (
          <div className={styles.menu_more}>
            <div className={styles.center}>
              <FaListUl size={18} />
            </div>
            <span onClick={handleClickAllSubs}>모든 구독</span>
          </div>
        )}

        {isMore ? (
          <div className={styles.menu_more} onClick={handleClickMore}>
            <div className={styles.center}>
              <MdKeyboardArrowUp size={24} />
            </div>
            <span>간략히 보기</span>
          </div>
        ) : (
          <div className={styles.menu_more} onClick={handleClickMore}>
            <div className={styles.center}>
              <MdKeyboardArrowDown size={24} />
            </div>
            <span>더보기</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscribeMenu;
