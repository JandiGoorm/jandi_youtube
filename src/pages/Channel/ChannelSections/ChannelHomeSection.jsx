import React, { useState, useEffect } from "react";
import styles from "./ChannelHomeSection.module.css";
import SinglePlayList from "./HomeComponent/SinglePlayList";
import RecentPlayList from "./HomeComponent/RecentPlayList";
import PopularPlayList from "./HomeComponent/PopularPlayList";
import PlayPlayList from "./HomeComponent/PlayPlayList";
import YoutubeService from "../../../apis/youtube";

const ChannelHomeSection = ({channelId}) => {
  const [sections, setSections] = useState([]);

  
  const fetchChannelSections = async (channelId) =>{
    try{
      const response = await YoutubeService.fetchChannelSections({
        part: "contentDetails,id,snippet",
        channelId: channelId,
      });
      
      const filteredSections = response.data.items.filter(
        (item) => item.snippet.type !== "channelsectiontypeundefined"
      );
      console.log(filteredSections);
      setSections(filteredSections); 
    }catch(error){
      console.log("error: "+ error);
    }
  }
  
  useEffect(()=> {
    fetchChannelSections(channelId);
  },[channelId]);

  const isSingle = (type) => {
    return type === "singleplaylist";
  };
  const isPopular = (type) => {
    return type === "popularuploads";
  };
  const isRecent = (type) => {
    return type === "recentuploads";
  };
  const isPlayList = (type) => {
    return type === "allplaylists";
  };

  return (
    <div className={styles.container}>
    {sections.map((section, index) => (
      <div key={index}>
         {isSingle(section.snippet.type) ? (
          <SinglePlayList section={section} />
        ) : isPopular(section.snippet.type) ?(
          <PopularPlayList section={section} />
        ): isRecent(section.snippet.type) ?(
          <RecentPlayList section={section} />
        ): isPlayList(section.snippet.type) ?(
          <PlayPlayList section={section} />
        ): null}
      </div>
    ))}
  </div>
  );
};

export default ChannelHomeSection;
