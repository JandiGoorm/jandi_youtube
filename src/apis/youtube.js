import { apiEndPoints } from "../constants/api";
import youtubeAPI from "./youtubeInstance";

const fetchVideos = async (maxResults = 10) => {
  return await youtubeAPI.get(apiEndPoints.SEARCH, {
    params: {
      part: "snippet",
      chart: "mostPopular",
      type: "video",
      regionCode: "KR",
      maxResults,
    },
  });
};

const fetchPlayLists = async (maxResults = 10) => {
  return await youtubeAPI.get(apiEndPoints.PLAYLISTS, {
    params: {
      part: "snippet",
      lanuage: "ko",
      mine: true,
      maxResults,
    },
  });
};

const fetchChannel = async (channelHandle,maxResults = 10) => {
  console.log(channelHandle);
  return await youtubeAPI.get(apiEndPoints.CHANNEL, {
    params: {
      part: "snippet",
      forHandle: channelHandle,
      maxResults,
    }
  })
}

const YoutubeService = {
  fetchVideos,
  fetchPlayLists,
  fetchChannel,
};

export default YoutubeService;
