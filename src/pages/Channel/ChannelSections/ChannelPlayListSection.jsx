import React, { useState, useEffect } from "react";
import styles from "./ChannelPlayListSection.module.css";
import YoutubeService from "../../../apis/youtube";
import { FaPlay } from "react-icons/fa";
import { CgPlayList } from "react-icons/cg"


const ChannelPlayListSection = ({channelId}) => {
  const [lists, setLists] = useState([]);
  
  const fetchChannelVideos = async (channelId) =>{
    try{
      const response = await YoutubeService.fetchPlaylistItems(channelId);
      const data = response.data.items;
      console.log(data);

      setLists(data);
    }catch(error){
      console.log("error: "+ error);
    }
  }
  
  useEffect(()=> {
    fetchChannelVideos(channelId);
  },[]);

  return (
    <div>
         <div class={styles.playList_header}></div>
         <ul className={styles.video_list}>
                     {lists.map((list) => (
                       <li className={styles.video_item} key={list.id}>
                        <div>
                         <img
                           className={styles.video_thumbnail}
                           src={list.snippet.thumbnails.medium.url}
                           alt={list.snippet.localized.title}
                         />
                         <p className={styles.video_duration}><CgPlayList className={styles.duration_icon}/> 동영상{list.contentDetails.itemCount} 개</p>
                         <div className={styles.hover_overlay}><FaPlay /> 모두 재생</div>
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

export default ChannelPlayListSection;
