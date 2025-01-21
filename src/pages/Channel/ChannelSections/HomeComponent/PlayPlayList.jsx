import React, { useState, useEffect, useCallback } from "react";
import YoutubeService from "../../../../apis/youtube";
import styles from "./PlayPlayList.module.css";
import { formatHitCount } from "../../../../utils/hit";
import { formatDuration } from "../../../../utils/time";
import { formatISO } from "../../../../utils/date";
import { useNavigate } from "react-router-dom";
import { PageEndPoints } from "../../../../constants/api";

const PlayPlayList = ({ section }) => {
  const [lists, setLists] = useState([]);

  const fetchPlayList = async (channelId) =>{
    try{
      const response = await YoutubeService.fetchPlayLists({
        part: "snippet,contentDetails",
        channelId: channelId,
      });
      const data = response.data.items;
      console.log(data);

      setLists(data);
    }catch(error){
      console.log("error: "+ error);
    }
  }

  useEffect (()=> {
    fetchPlayList(section.snippet.channelId);
  },[]);

  return (
    <div>
      <h1 className={styles.video_header}>생성된 재생목록</h1>
      <ul className={styles.video_list}>
        {lists.map((list) => (
          <li className={styles.video_item} key={list.id}>
            <div>
            <img
              className={styles.video_thumbnail}
              src={list.snippet.thumbnails.medium.url}
              alt={list.snippet.localized.title}
            />
            <p className={styles.video_duration}> 동영상{list.contentDetails.itemCount} 개</p>
            </div>
            <div className={styles.video_description}>
              <p className={styles.video_title}>{list.snippet.localized.title}</p>
              <p className={styles.video_sub}>모든 재생목록 보기</p>
            </div>
          </li>
        ))}
       </ul>
    </div>
  );
};

export default PlayPlayList;
