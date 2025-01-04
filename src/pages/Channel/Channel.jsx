import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import styles from "./Channel.module.css";
import logo from "../../assets/icons/logo.svg"

const ChannelPage = () => {
  const { channelId } = useParams(); // URL에서 채널 ID를 가져옵니다.
  const [channelInfo, setChannelInfo] = useState(null);
  const [videos, setVideos] = useState([]);

  console.log(channelId);

  useEffect (()=> {
    console.log(channelId);


  },[channelId]);

  return (
    <DefaultLayout>
      <div className={styles.channel-page}>
        <div className={styles.channel-header}>
          {/* <img 
            src={logo}
            alt="logo"
          className="channel-avatar"
          /> */}
          <h1>df</h1>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ChannelPage;
