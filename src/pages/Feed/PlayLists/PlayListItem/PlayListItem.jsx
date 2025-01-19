import React, { useEffect, useState } from 'react';
import YoutubeService from "../../../../apis/youtube";
import DefaultLayout from "../../../../layouts/DefaultLayout/DefaultLayout";
import { useLocation } from "react-router-dom";
import styles from './PlayListItem.module.css';
import { IoMdPlay } from "react-icons/io";
import { IoShuffle } from "react-icons/io5";

const Later = () => {
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const playlistId = urlParams.get('list');
    const accessToken = localStorage.getItem("access-token");

    const [data, setData] = useState({}); // 초기값을 빈 객체로 설정
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null);

    const fetchPlayListData = async () => {
        try {
            const response = await YoutubeService.fetchPlayLists({
                part: "snippet,contentDetails",
                //id: LL - 좋아요 표시한 동영상 플레이리스트 ID
                //id: WL - 나중에 볼 동영상 플레이리스트 ID
                //2021년 1월 28일부로 API를 통한 '나중에 볼 동영상' 목록 액세스 지원이 종료됨
                id: playlistId,
                access_token: accessToken, //본인 명의의 playlistId 접근을 위해 추가
            });
            setData(response.data.items[0] || {}); //잘못된 파라미터로 인해 데이터가 없을 경우 빈 객체로 설정
            console.log("Data: ", data);
        } catch (err) {
            console.error("Failed to fetch playlist data:", err);
        }
    };

    const fetchPlayListVideos = async () => {
        try {
            const response = await YoutubeService.fetchPlaylistItems({
                part: "snippet,contentDetails",
                playlistId: playlistId,
                maxResults: 50,
                mine: true,
            });
            setVideos(response.data.items || []); //잘못된 파라미터로 인해 데이터가 없을 경우 빈 객체로 설정
            console.log("Videos: ", videos);

            
        } catch (err) {
            console.error("Failed to fetch playlist videos:", err);
        }
    };

    useEffect(() => {
        if (!accessToken) {
            console.error("로그인이 필요합니다.");
            return (
                <DefaultLayout>
                    <div className={styles.error}>{error}</div>
                </DefaultLayout>
            );
        }

        (async () => {
            await fetchPlayListData();
            await fetchPlayListVideos();
        })();
    }, [accessToken, playlistId]);

    return (
        <DefaultLayout>
            <div className={styles.laterBody}>
                {/* 배너 부분 */}
                {data?.snippet && (
                    <header className={styles.laterBanner}>
                        <div className={styles.laterBannerData}>
                            <img
                                className={styles.laterBannerMainImg}
                                src={data.snippet?.thumbnails?.medium?.url || ''}
                            />
                            <div className={styles.laterBannerInfo}>
                                <p className={styles.laterBannerTitle}>{data.snippet?.title || '플레이리스트 제목'}</p>
                                <p className={styles.laterBannerUserName}>{data.snippet?.channelTitle || '게시자 이름'}</p>
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
                                    src={video.snippet?.thumbnails?.medium?.url || ''}
                                    alt="Video Thumbnail"
                                />
                                <div className={styles.laterPlayListItemInfo}>
                                    <p className={styles.laterPlayListItemTitle}>
                                        {video.snippet?.title || '동영상 제목'}
                                    </p>
                                    <div className={styles.laterPlayListItemData}>
                                        <span>{video.snippet?.videoOwnerChannelTitle || '게시자 이름'}</span>
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