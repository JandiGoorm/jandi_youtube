import React from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./VideoPlayer.module.css";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";

function VideoPlayer() {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v"); // URL의 "v" 파라미터에서 동영상 ID 가져오기

  // 동영상 ID가 없을 경우 메시지 출력
  if (!videoId) {
    return (
      <DefaultLayout>
        <div className={styles.error}>동영상 ID가 없습니다. URL을 확인해주세요.</div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className={styles.container}>
        <iframe
          className={styles.videoFrame}
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </DefaultLayout>
  );
}

export default VideoPlayer;
