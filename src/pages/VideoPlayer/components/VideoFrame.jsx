import React from "react";
import styles from "../VideoPlayer.module.css";

const VideoFrame = ({ videoId }) => (
  <iframe
    className={styles.videoFrame}
    src={`https://www.youtube.com/embed/${videoId}`}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
);

export default VideoFrame;
