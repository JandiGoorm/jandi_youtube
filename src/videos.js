import React, { useState, useEffect } from 'react';
import api from './api';
import "./videos.css";

function VideoList() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get('/search', {
          params: {
            part: "snippet",
            chart: "mostPopular",
            type: "video",
            regionCode:"KR",
            maxResults: 10,
          },
        });
        setVideos(response.data.items);

      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <ul class="video_list">
        {videos.map((video) => (
          <li class="video_item" key={video.id.videoId}>
            <img class="video_thumbnail"
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
            />
              <div class="video_description">
                <p class="video_title">{video.snippet.title}</p>
                <p class="video_channeltitle">{video.snippet.channelTitle}</p>
              </div>
        </li>
        ))}
      </ul>
    </div>
  );
}

export default VideoList;