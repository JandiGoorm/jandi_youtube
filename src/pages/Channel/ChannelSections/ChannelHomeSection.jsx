import React, { useState, useEffect } from "react";
import styles from "./ChannelHomeSection.module.css";
import YoutubeService from "../../../apis/youtube";

const ChannelHomeSection = ({channelId}) => {
  console.log(channelId);
  
  const fetchChannelSections = async (channelId) =>{
    try{
      const response = await YoutubeService.fetchChannelSections(channelId);
      console.log(response.data);
      // const data = response.data.items[0];
      // console.log(data);
      
    }catch(error){
      console.log("error: "+ error);
    }
  }
  
  useEffect(()=> {
    fetchChannelSections(channelId);
  },[]);

  return (
    <div className={styles.container}>
      
    </div>
  );
};

export default ChannelHomeSection;
