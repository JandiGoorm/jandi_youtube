import React, { useState, useEffect, useCallback } from "react";
import YoutubeService from "../../../../apis/youtube";
import { useNavigate } from "react-router-dom";
import styles from "./SinglePlayList.module.css";
import { formatHitCount } from "../../../../utils/hit";
import { formatDuration } from "../../../../utils/time";
import { formatISO } from "../../../../utils/date";

const SinglePlayList = ({section}) => {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("Playlist");
  const navigate = useNavigate();

  // console.log(section);

    const fetchPlayList = async(playlistId) => {
        try{
            const response = await YoutubeService.fetchPlaylistItems({
              part: "snippet,contentDetails",
              maxResults: 10,
              playlistId: playlistId,
            });
            // console.log(response);
            const videoIds = response.data.items.map((item) => item.snippet.resourceId.videoId);
            const videoDetailsResponse = await YoutubeService.fetchVideos({
              part: "contentDetails,snippet,statistics",
              id: videoIds.join(","),
            });
            setVideos(videoDetailsResponse.data.items);
        }catch(error){
            console.log("error: "+ error);
          }
    }

    useEffect (()=> {
      if (section.snippet.title) {
        setTitle(section.snippet.title);
      }
        fetchPlayList(section.contentDetails.playlists[0]);
      },[]);


  return (
   <div>
         <h1 className={styles.video_header}>{title}</h1>
         <ul className={styles.video_list}>
                     {videos.map((video) => (
                       <li className={styles.video_item} key={video.id} onClick={() => handleClick(video.id)}>
                         <div>
                         <img
                           className={styles.video_thumbnail}
                           src={video.snippet.thumbnails.medium.url}
                           alt={video.snippet.localized.title}
                         />
                         <p className={styles.video_duration}>{formatDuration(video.contentDetails.duration)}</p>
                         </div>
                         <div className={styles.video_description}>
                           <p className={styles.video_title}>{video.snippet.localized.title}</p>
                           <p className={styles.video_sub}>{formatHitCount(video.statistics.viewCount)}﹒{formatISO(video.snippet.publishedAt)}</p>
                         </div>
                       </li>
                     ))}
                   </ul>
     </div>
  );
};

export default SinglePlayList;
