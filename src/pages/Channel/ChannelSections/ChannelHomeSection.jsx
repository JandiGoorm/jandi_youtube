import React, { useState, useEffect } from "react";
import styles from "./ChannelHomeSection.module.css";
import SinglePlayList from "./HomeComponent/SinglePlayList";
import RecentPlayList from "./HomeComponent/RecentPlayList";
import YoutubeService from "../../../apis/youtube";

const ChannelHomeSection = ({channelId}) => {
  const [sections, setSections] = useState([]);

  
  const fetchChannelSections = async (channelId) =>{
    try{
      const response = await YoutubeService.fetchChannelSections(channelId);
      
      const filteredSections = response.data.items.filter(
        (item) => item.snippet.type !== "channelsectiontypeundefined"
      );
      setSections(filteredSections); 
      
    }catch(error){
      console.log("error: "+ error);
    }
  }
  
  useEffect(()=> {
    fetchChannelSections(channelId);
  },[channelId]);

  const isSingleOrPopular = (type) => {
    return type === "singleplaylist" || type === "popularuploads";
  };
  const isRecent = (type) => {
    return type === "recentuploads";
  };

  return (
    <div className={styles.container}>
    {sections.map((section, index) => (
      <div key={index}>
         {/* {isSingleOrPopular(section.snippet.type) ? (
          <SinglePlayList section={section} />
        ) : isRecent(section.snippet.type) ?(
          <RecentPlayList section={section} />
        ): null} */}
      </div>
    ))}
  </div>
  );
};

export default ChannelHomeSection;
