import React, { useEffect, useState } from "react";
import youtubeAPI from "../../../apis/youtubeInstance";
import { IoMdPlay } from "react-icons/io";
import { IoShuffle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../../../layouts/DefaultLayout/DefaultLayout";
import { formatISO } from "../../../utils/date"; // 날짜 포맷 함수
import { formatHitCount } from "../../../utils/hit"; // 조회수 포맷 함수
import styles from "./Like.module.css";

const Like = () => {
  const [videos, setVideos] = useState([]);
  const [channelInfo, setChannelInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        const accessToken = localStorage.getItem("access-token");
        if (!accessToken) {
          throw new Error("로그인이 필요합니다. 로그인 후 다시 시도해주세요.");
        }

        const response = await youtubeAPI.get("videos", {
          params: {
            part: "snippet,contentDetails,statistics",
            myRating: "like",
            maxResults: 100,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const items = response.data.items || [];
        const totalViews = items.reduce(
          (acc, video) => acc + parseInt(video.statistics.viewCount || 0, 10),
          0
        );

        setVideos(items);
        setChannelInfo({
          title: "k05y03j", // 채널 ID (하드코딩 또는 동적으로 가져오기)
          thumbnail: items[0]?.snippet.thumbnails.medium.url || "",
          itemCount: items.length || 0,
          totalViews: formatHitCount(totalViews), // 조회수 총합 포맷
          lastUpdated: new Date().toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }), // 마지막 업데이트 날짜
        });
      } catch (error) {
        console.error("좋아요 표시 동영상 가져오기 실패:", error.message);
      }
    };

    fetchLikedVideos();
  }, []);

  const handleVideoClick = (videoId) => {
    if (!videoId) return;
    navigate(`/watch?v=${videoId}`);
  };

  return (
    <DefaultLayout>
      <div className={styles.likeContainer}>
        {/* 배너 부분 */}
        {channelInfo && (
          <aside className={styles.likeBanner}>
            <div className={styles.likeBannerData}>
              <img
                className={styles.likeBannerMainImg}
                src={channelInfo.thumbnail}
                alt="Channel Thumbnail"
              />
              <div className={styles.likeBannerInfo}>
                <p className={styles.likeBannerTitle}>{channelInfo.title}</p>
                <p className={styles.likeBannerMeta}>
                  동영상 {channelInfo.itemCount}개 조회수 {channelInfo.totalViews} 오늘 업데이트됨
                </p>
              </div>
            </div>
            <div className={styles.likeBannerBtns}>
              <button className={styles.likePlayBtn}>
                <IoMdPlay /> 모두 재생
              </button>
              <button className={styles.likeShuffleBtn}>
                <IoShuffle /> 셔플
              </button>
            </div>
          </aside>
        )}

        {/* 동영상 리스트 */}
        <section className={styles.likePlayListSection}>
          {videos.length > 0 ? (
            <ul className={styles.likePlayList}>
              {videos.map((video) => (
                <li
                  className={styles.likePlayListItem}
                  key={video.id}
                  onClick={() => handleVideoClick(video.id)}
                >
                  <img
                    className={styles.likePlayListItemImg}
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                  />
                  <div className={styles.likePlayListItemInfo}>
                    <p className={styles.likePlayListItemTitle}>
                      {video.snippet.title}
                    </p>
                    <div className={styles.likePlayListItemData}>
                      <span>
                        조회수 {formatHitCount(video.statistics.viewCount)}
                      </span>
                      <span>•</span>
                      <span>{formatISO(video.snippet.publishedAt)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noVideos}>좋아요 표시한 동영상이 없습니다.</p>
          )}
        </section>
      </div>
    </DefaultLayout>
  );
};

export default Like;
