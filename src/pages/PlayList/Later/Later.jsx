import { useCallback, useEffect, useState } from "react";
import { IoMdPlay } from "react-icons/io";
import { IoShuffle } from "react-icons/io5";
import YoutubeService from "../../../apis/youtube";
import DefaultLayout from "../../../layouts/DefaultLayout/DefaultLayout";
import styles from "./Later.module.css";

const Later = () => {
  const [data, setData] = useState({});
  const [videos, setVideos] = useState([]);

  const fetchPlayListData = useCallback(async () => {
    try {
      const response = await YoutubeService.fetchPlayLists({
        part: "snippet,contentDetails",
        mine: true,
      });
      setData(response.data.items[0] || {});
      return response.data.items[0].id;
    } catch (err) {
      console.error("Failed to fetch playlist data:", err);
    }
  }, []);

  const fetchPlayListVideos = useCallback(async (playlistId) => {
    try {
      const response = await YoutubeService.fetchPlaylistItems({
        part: "snippet,contentDetails",
        playlistId,
        maxResults: 50,
      });

      setVideos(response.data.items || []);
    } catch (err) {
      console.error("Failed to fetch playlist videos:", err);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const playlistId = await fetchPlayListData();
      await fetchPlayListVideos(playlistId);
    })();
  }, [fetchPlayListData, fetchPlayListVideos]);

  return (
    <DefaultLayout>
      <div className={styles.laterBody}>
        {/* 배너 부분 */}
        {data?.snippet && (
          <header className={styles.laterBanner}>
            <div className={styles.laterBannerData}>
              <img
                className={styles.laterBannerMainImg}
                src={data.snippet?.thumbnails?.medium?.url || ""}
              />
              <div className={styles.laterBannerInfo}>
                <p className={styles.laterBannerTitle}>
                  {data.snippet?.title || "플레이리스트 제목"}
                </p>
                <p className={styles.laterBannerUserName}>
                  {data.snippet?.channelTitle || "게시자 이름"}
                </p>
                <div className={styles.laterPlaylistInfo}>
                  <span>동영상</span>
                  <span>{data.contentDetails?.itemCount || 0}</span>
                  <span>개</span>
                </div>
              </div>
            </div>
            <div className={styles.laterBannerBtns}>
              <button className={styles.laterPlayBtn}>
                <IoMdPlay /> 모두 재생
              </button>
              <button className={styles.laterShuffleBtn}>
                <IoShuffle /> 셔플
              </button>
            </div>
          </header>
        )}

        {/* 동영상 리스트 부분 */}
        {videos.length > 0 ? (
          <ul className={styles.laterPlayList}>
            {videos.map((video) => (
              <li className={styles.laterPlayListItem} key={video.id}>
                <img
                  className={styles.laterPlayListItemImg}
                  src={video.snippet?.thumbnails?.medium?.url || ""}
                  alt="Video Thumbnail"
                />
                <div className={styles.laterPlayListItemInfo}>
                  <p className={styles.laterPlayListItemTitle}>
                    {video.snippet?.title || "동영상 제목"}
                  </p>
                  <div className={styles.laterPlayListItemData}>
                    <span>
                      {video.snippet?.videoOwnerChannelTitle || "게시자 이름"}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noVideos}>동영상이 없습니다.</p>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Later;
