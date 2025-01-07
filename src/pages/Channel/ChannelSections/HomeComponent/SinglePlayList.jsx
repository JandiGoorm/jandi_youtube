import React, { useState, useEffect } from "react";
import YoutubeService from "../../../../apis/youtube";

const SinglePlayList = ({section}) => {

    const fetchPlayList = async(playlistId) => {
        try{
            const response = await YoutubeService.fetchPlaylistItems(10,playlistId);
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
        <h1>{section.id}</h1>
  </div>
  );
};

export default SinglePlayList;
