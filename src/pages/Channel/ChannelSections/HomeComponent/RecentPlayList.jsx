import React, { useState, useEffect } from "react";
import YoutubeService from "../../../../apis/youtube";

const RecentPlayList = ({section}) => {

  const fetchPlayList = async(playlistId) => {
    try{
      console.log(playlistId);
      const response = await YoutubeService.fetchPlaylistItems({
        part: "snippet,contentDetails",
        maxResults: 10,
        playlistId: playlistId,
      });
        console.log(response);
    }catch(error){
        console.log("error: "+ error);
      }
}

useEffect (()=> {
    fetchPlayList(section.id);
  },[]);

  return (
    <div>
        <h3>{section.id}</h3>
  </div>
  );
};

export default RecentPlayList;
